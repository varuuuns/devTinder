const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({"msg":"please login!"});

        const decode = await jwt.verify(token, JWT_SECRET);
        const { _id } = decode;

        const user = await User.findById(_id);
        if (!user) return res.status(401).json({ msg: "no user found" });

        req.user = user;
        next();
    }
    catch (err) {
        console.log(`error from middlewares/auth.js :${err}`)
        res.status(401).json({"msg":`invalid or expired token`});
    }
}

module.exports = { userAuth };