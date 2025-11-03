const express = require("express");
const authRouter = express.Router();

const { validatSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
    try {
        validatSignupData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        
        const user = new User.create({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password:passwordHash
        })

        const savedUser = await user.save();
        const token=await savedUser.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        })

        res.json({
            msg: "user saved successfully",
            data:savedUser
        })

    }
    catch (err) {
        console.log(`error from routes/auth : ${err}`);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        
        const user = await User.findOne({ emailId: emailId });
        if (!user) throw new Error("invalid creds");
        
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000)
            });
            res.send(user);
        }
        else throw new Error("invalid creds");
    }
    catch (err) {
        res.status(400).send(`error from routes/auth :${err}`);
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires:new Date(Date.now())
    })
    res.send("logout successful!");
})

modules.exports = authRouter;