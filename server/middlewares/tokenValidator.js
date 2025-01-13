const myError = require("../utils/myError");
const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const id = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = id;
        next();
    } catch (error) {
        if (error instanceof myError) next(error);
        else next(new myError(error.message, 500));
    }
};

module.exports = tokenValidator;
