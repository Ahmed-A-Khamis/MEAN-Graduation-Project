const express = require("express");
const {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.post("/", postProduct);
router.put("/:name", putProduct);
router.delete("/:name", deleteProduct);

module.exports = router;
