const joi = require("joi");

const productSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().min(0).required(),
    quantity: joi.number().min(0).required(),
    imageUrl: joi.string().uri().required(),
});

module.exports = productSchema;
