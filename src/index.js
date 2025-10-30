const express = require("express");
const { default: mongoose } = require("mongoose");
const { MONGO_URL } = require("./config");
const app = express();

const connectDB = async () => {
    await mongoose.connect(MONGO_URL)
        .then(() => console.log(`mongodb connected`))
        .catch((err) => console.log(`error from db: ${err}`));
}
connectDB();

app.post("/signup", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

})

app.use("/", (req, res) => {
    res.send("404 wrong page");
})

app.listen(3000, () => {
    console.log(`server listening on 3333`);
})
