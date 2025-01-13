const myError = require("../utils/myError.util");

const errorHandler = async (error, req, res, next) => {
    if (error instanceof myError) {
        console.log(
            "-------------------- START ERROR HANDLER --------------------"
        );
        console.error(`Error ${error.status}: ${error.message}`);
        console.error(error.stack);
        console.log(
            "-------------------- END   ERROR HANDLER --------------------"
        );
        res.status(error.status);
        res.json({
            message: `Error: ${error.message}`,
            errorCode: error.status,
        });
    } else {
        console.log(
            "-------------------- START ERROR HANDLER --------------------"
        );
        console.error(`UNEXPECTED ERROR: ${error.message}`);
        console.error(error.stack);
        console.log(
            "-------------------- END   ERROR HANDLER --------------------"
        );
        res.status(500);
        res.json({
            message: `UNEXPECTED Error: ${error.message}`,
            errorCode: 500,
        });
    }
};

module.exports = errorHandler;
