require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

module.exports = {
    MONGO_URL,
    JWT_SECRET,
    PORT
}