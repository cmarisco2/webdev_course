/**
 * Create Custom Error Handling Class and Export it.
 */
class AppError extends Error {
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }
}

module.exports = AppError;