const { ValidationError } = require("joi")

let { DEBUG_MODE } = process.env

const errorHandler = (err, req, res, next) => {

    //default error
    let statusCode = 500
    let data = {
        message: "Internal Server Error",
        ...(DEBUG_MODE == "true" && { originalMessage: err.message })
    }

    // handling validation error 
    if (err instanceof ValidationError) {
        statusCode = 400
        data = {
            message: err.message
        }
    }

    res.status(statusCode).json(data)

}

module.exports = errorHandler