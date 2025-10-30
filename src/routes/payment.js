const express = require("express");
const { RAZORPAY_KEY_ID } = require("../config");
const paymentRouter = express.Router();
const razorpayInstance=r
const Payment = require("../models/payment");
const User = require("../models/user");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
    try {
        const { membershipType } = req.body;
        const { firstName, lastName, emailId } = req.user;

        const order = await razorpayInstance.orders.create({
            amount: membershipAmount[membershipType] * 100,
            currency: "INR",
            receipt: "receipt",
            notes: {
                firstName:firstName,
                lastName:lastName,
                emailId:emailId,
                membershipType:membershipType
            }
        })

        const payment = new PaymentAddress({
            userId: req.user._id,
            orderId: order.id,
            status: order.status,
            amount: order.amount,
            currency: order.currency,
            receipt: oder.receipt,
            notes:order.notes
        })

        const savedPayment = await payment.save();
        res.json({
            ...savedPayment.toJSON(),
            keyId: RAZORPAY_KEY_ID
        })
    }
    catch (err) {
        console.log(`error in routes/payments : ${err}`);
        return res.status(500).json({ msg: err.message });
    }
})

paymentRouter.post("/payment/webhook", async (req, res) => {
    try {
        const webhookSignature = req.get("X-Razorpay-Signature");
        
        const isWebhookValid = validWebhookSignature(
            JSON.stringify(req.body),
            webhookSignature,
            RAZORPAY_KEY_ID
        )

        if (!isWebhookValid) return res.status(400).json({ msg: "webhood invalid" });

        const paymentDetails = req.body.payload.payment.entity;

        const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
        payment.status = paymentDetails.status;
        await payment.save();
        
        const user = await User.findOne({ _id: payment.userId });
        user.isPremium = true;
        user.membershipType = payment.notes.membershipType;
        
        await user.save();

        return res.status(200).json({ msg: "webhood received " });
    }
    catch (err) {
        console.log(`error from routes/payment :${err}`);
        return res.status(500).json({ msg: err });
    }
})

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
    const user = req.user.toJSON();
    return res.json({ ...user });
})

module.exports = paymentRouter;