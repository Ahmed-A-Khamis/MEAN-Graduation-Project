const express = require("express");
require("dotenv").config();
const connectDB = require("./config/dbConfig");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const errorHandler = require("./middlewares/errorHandler");

const tokenValidator = require("./middlewares/tokenValidator");

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(CONNECTION_STRING);

app.use("/api/auth", authRoutes);

app.use(tokenValidator);

app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`✅ SUCCESSFUL: Server is running on http://localhost:${PORT}`);
});
