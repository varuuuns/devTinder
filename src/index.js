const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URL, FRONTEND_URL } = require("./config");
const cors = requrie("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
    credentials:true,
}))
app.use(cookieParser());

app.post("/signup", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

})

app.use("/", (req, res) => {
    res.send("404 wrong page");
})

app.listen(3000, () => {
    console.log(`server listening on 3333`);
})
