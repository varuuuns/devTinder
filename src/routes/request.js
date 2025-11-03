const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const { User } = require("../models/user");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = rq.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ msg: `invalid status type: ${status}` });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) return res.status(400).json({ msg: "user not found" });

        // main thing to write this is to check if A sent a request to B then B should be able to send request to A
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [ // or condition
                { fromUserId, toUserId }, // check in db if there exists something from A to B
                { fromUserId: toUserId, toUserId: fromUserId } // check from B to A
            ]
        })
        if (existingConnectionRequest) {
            return res.status(400).send({ msg: `connection already exists` });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();

        res.json({
            msg: req.user.firstName + "is" + status + "in" + toUser.firstName,
            data
        })
    }
    catch (err) {
        console.log(`error from routes/request :${err}`);
        res.status(400).send(`error ${err}`);
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ msg: `invalid status type: ${status}` });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        if (!connectionRequest) {
            return res.status(404).json({ msg: `connection request not found` });
        }

        connectionRequest.status = status;
        
        const data = await connectionRequest.save();
        res.json({
            msg: `connection request ${data}`,
            data
        })
    }
    catch (err) {
        console.log(`error from routes/request :${err}`);
        res.status(400).send(`error :${err}`);
    } 
})


module.exports = { requestRouter };