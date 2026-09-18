class ServerError extends Error {
    constructor(message, statusCode = 500) {
        super(message);

        this.name = "ServerError";
        this.statusCode = statusCode;
    }
}

module.exports = ServerError;