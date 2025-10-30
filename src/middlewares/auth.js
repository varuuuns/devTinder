const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");

export const userAuth = async (req, res, sent) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).send("please login!");

        const decode = await jwt.verify(token, JWT_SECRET);
        const { _id } = decode;

        const user = await User.findById(_id);
        if (!user) throw new Error("user not found");

        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).send(`errror from auth.js :${err}`);
    }
}