const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this user"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email for this user"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password for this user"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
