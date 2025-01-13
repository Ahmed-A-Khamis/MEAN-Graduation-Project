const myError = require("../utils/myError.util");
const productModel = require("../models/product.model");
const productDataValidator = require("../validators/productData.validator");
const cloudinary = require("cloudinary").v2;

const getProducts = async (req, res, next) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        if (error instanceof myError) next(error);
        else next(new myError(error.message, 500));
    }
};

/**
 * product model:
 * name- unique
 * description
 * price
 * quantity
 * imageUrl
 *
 * you need to upload the image to cloudinary first and then store the image url in db
 *
 * use multer to recieve the image
 * and cloudinary to upload it
 */
const postProduct = async (req, res, next) => {
    try {
        const { error } = productDataValidator.validate(req.body);
        if (error) return next(new myError(error.details[0].message, 400));

        const { name, description, price, quantity } = req.body;
        const imageFile = req.file;

        const product = await productModel.create({
            name,
            description,
            price,
            quantity,
            imageUrl,
        });
        res.status(201).json({
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        if (error instanceof myError) next(error);
        else next(new myError(error.message, 500));
    }
};

const putProduct = async (req, res, next) => {
    try {
    } catch (error) {
        if (error instanceof myError) next(error);
        else next(new myError(error.message, 500));
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { name } = req.params;
        const product = await productModel.findOne({ name });
        if (!product) throw new myError("Product not found", 404);
        await product.deleteOne();
        res.status(200).json({
            message: "Product deleted successfully",
            data: product,
        });
    } catch (error) {
        if (error instanceof myError) next(error);
        else next(new myError(error.message, 500));
    }
};

module.exports = {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
};
