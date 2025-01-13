const myError = require("../utils/myError.util");

const multer = require("multer");

const saveProductImage = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new myError("Only jpeg and png images are allowed", 400), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5,
        files: 1,
    },
});

module.exports = { saveProductImage };
