const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const myError = require("../utils/myError.util");
const userModel = require("../models/user.model");
const isUserDataValid = require("../validators/userData.validator");

require("dotenv").config();
const BCRYPT_SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const register = async (req, res, next) => {
    try {
        const { name, email, password: plainPassword } = req.body;
        if (await userModel.findOne({ email }))
            return next(new myError("User already exists", 400));

        const { error } = isUserDataValid(name, email, plainPassword);
        if (error) return next(new myError(error.details[0].message, 400));

        const hashedPassword = bcrypt.hashSync(
            plainPassword,
            BCRYPT_SALT_ROUND
        );
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        if (error instanceof myError) next(error);
        else next(new myError(error.message, 500));
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) throw new myError("Invalid credentials", 400);
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) throw new myError("Invalid credentials", 400);
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY);
        console.log("id:", user._id.toString());

        return res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            token: `Bearer ${token}`,
        });
    } catch (error) {
        if (error instanceof myError) next(error);
        else next(new myError(error.message, 500));
    }
};

module.exports = {
    register,
    login,
};
