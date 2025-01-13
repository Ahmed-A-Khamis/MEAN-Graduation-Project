class myError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 500;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, myError);
        }
    }
}
module.exports = myError;
