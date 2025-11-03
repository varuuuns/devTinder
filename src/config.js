require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

module.exports = {
    MONGO_URL,
    JWT_SECRET,
    FRONTEND_URL
}