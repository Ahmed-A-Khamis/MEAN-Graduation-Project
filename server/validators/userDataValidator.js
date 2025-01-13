const joi = require("joi");

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(50).required(),
});

function isUserDataValid(name, email, password) {
    return userSchema.validate({ name, email, password });
}

module.exports = isUserDataValid;
