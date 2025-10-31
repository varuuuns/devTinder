const mongoose = require("mongoose");
const { MONGO_URL } = require("../config");

export const connectDB = async () => {
    await mongoose.connect(MONGO_URL);
}