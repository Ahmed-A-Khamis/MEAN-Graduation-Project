const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description for this product"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price for this product"],
        min: [0, "Price should be greater than zero"],
    },
    quantity: {
        type: Number,
        required: [true, "Please provide a quantity for this product"],
        min: [0, "Quantity should be greater than zero"],
    },
    image: {
        type: String,
        required: [true, "Please provide an image for this product"],
    },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
