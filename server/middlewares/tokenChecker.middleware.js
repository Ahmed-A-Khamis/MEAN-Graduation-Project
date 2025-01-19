const myError = require("../utils/myError.util");
const jwt = require("jsonwebtoken");

require("dotenv").config("../.env");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const tokenChecker = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const id = jwt.verify(token, JWT_SECRET_KEY);
        req.user = id;
        next();
    } catch (error) {
        if (error instanceof myError) next(error);
        else next(new myError(error.message, 500));
    }
};

module.exports = tokenChecker;
