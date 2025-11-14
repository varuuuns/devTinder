const mongoose = require("mongoose");
const { MONGO_URL } = require("../config");

const connectDB = async () => {
    await mongoose.connect(MONGO_URL);
};

module.exports = connectDB;