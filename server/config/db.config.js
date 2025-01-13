const mongoose = require("mongoose");

const connectDB = async (CONNECTION_STRING) => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("🚀 Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;
