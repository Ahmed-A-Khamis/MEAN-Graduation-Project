const express = require("express");
const {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
} = require("../controllers/product.controller");
const { saveProductImage } = require("../config/multer.config");

const router = express.Router();

router.get("/", getProducts);
router.post("/", saveProductImage.single("image"), postProduct);
router.put("/:name", saveProductImage.single("image"), putProduct);
router.delete("/:name", deleteProduct);

module.exports = router;
