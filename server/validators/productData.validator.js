const joi = require("joi");

const productSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().min(0).required(),
    quantity: joi.number().min(0).required(),
    image: joi.binary().required(),
});

function isProductDataValid(name, description, price, quantity, image) {
    return productSchema.validate({
        name,
        description,
        price,
        quantity,
        image,
    });
}

module.exports = { isProductDataValid };
