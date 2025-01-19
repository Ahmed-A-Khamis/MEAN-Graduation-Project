const express = require("express");
const {
    register,
    login,
    tokenValidator,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/token-validator", tokenValidator);

module.exports = router;
