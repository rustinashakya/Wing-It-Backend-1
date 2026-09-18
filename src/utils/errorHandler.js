const { ZodError } = require("zod");
// const { JsonWebTokenError,  } = require("jsonwebtoken");
const {
    JsonWebTokenError,
    TokenExpiredError,
    NotBeforeError,
} = require("jsonwebtoken");
const ServerError = require("./serverError");

const errorHandler = (err, req, res, next) => {
    console.log("Error:", err);

    // 1. Zod validation error
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues,
        });
    }


    // 2. JWT token expired
    if (err instanceof TokenExpiredError) {
        return res.status(401).json({
            success: false,
            message: "Access token has expired",
        });
    }

    // 3. JWT token not active yet
    if (err instanceof NotBeforeError) {
        return res.status(401).json({
            success: false,
            message: "Access token is not active yet",
        });
    }

    // 4. Invalid JWT
    if (err instanceof JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            message: "Invalid access token",
        });
    }

    // 2. Your custom server/application error
    if (err instanceof ServerError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // 3. Other errors - handle later
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });

    // 
};

module.exports = errorHandler;