const myError = require("../utils/myError.util");
const productModel = require("../models/product.model");
const { isProductDataValid } = require("../validators/productData.validator");
const cloudinary = require("../config/cloudinary.config");

const getProducts = async (req, res, next) => {
    try {
        if (req.params["name"]) {
            const product = await productModel.findOne({
                name: req.params["name"],
            });
            if (!product) throw new myError("Product not found", 404);
            const tempProduct = {
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                image: product.image,
            };

            res.status(200).json(tempProduct);
        } else {
            const products = await productModel.find(
                {},
                {
                    _id: 0,
                    name: 1,
                    description: 1,
                    price: 1,
                    quantity: 1,
                    image: 1,
                }
            );
            res.status(200).json(products);
        }
    } catch (error) {
        if (error instanceof myError) next(error);
        else next(new myError(error.message, 500));
    }
};

const postProduct = async (req, res, next) => {
    try {
        const { name, description, price, quantity } = req.body;
        const imageBuffer = req.file?.buffer;

        const { error } = isProductDataValid(
            name,
            description,
            price,
            quantity,
            imageBuffer
        );
        if (error) return next(new myError(error.details[0].message, 400));

        if (await productModel.findOne({ name }))
            return next(new myError("Product already exists", 400));

        const image = await new Promise((resolve) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: "image",
                        folder: "productsImages",
                        public_id: name,
                        overwrite: true,
                    },
                    (error, result) => {
                        if (error) return next(new myError(error.message, 500));
                        resolve(result.secure_url);
                    }
                )
                .end(imageBuffer);
        });
        const product = await productModel.create({
            name,
            description,
            price,
            quantity,
            image,
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
        const { name, description, price, quantity } = req.body;
        const imageBuffer = req.file?.buffer;
        const { error } = isProductDataValid(
            name,
            description,
            price,
            quantity,
            imageBuffer
        );
        if (error) return next(new myError(error.details[0].message, 400));

        if (!(await productModel.findOne({ name })))
            return next(new myError("Product does not exist", 400));
        let product;
        if (imageBuffer) {
            const image = await new Promise((resolve) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            resource_type: "image",
                            folder: "productsImages",
                            public_id: name,
                            overwrite: true,
                        },
                        (error, result) => {
                            if (error)
                                return next(new myError(error.message, 500));
                            resolve(result.secure_url);
                        }
                    )
                    .end(imageBuffer);
            });
            product = await productModel.findOneAndUpdate(
                { name },
                {
                    description,
                    price,
                    quantity,
                    image,
                },
                { new: true }
            );
        } else {
            product = await productModel.findOneAndUpdate(
                { name },
                {
                    description,
                    price,
                    quantity,
                },
                { new: true }
            );
        }
        res.status(201).json({
            message: "Product updated successfully",
            data: product,
        });
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
        const deletedProduct = await product.deleteOne();
        cloudinary.uploader.destroy(product.image);
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
