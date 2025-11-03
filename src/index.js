const express = require("express");
const cors = requrie("cors");
const { FRONTEND_URL } = require("./config");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");

const app = express();
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB().then(() => {
    console.log("db connected");
    app.listen(3333, () => {
        console.log("server running on port 3333");
    })
}).catch((err) => {
    console.log(`db cannot be connected: ${err}`);
})
