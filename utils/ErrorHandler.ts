// We are making an object-oriented class to make things easier
// We are using similar program so many times. So, instead, we will just use a single class that makes things easier

class ErrorHandler extends Error {
    statusCode: Number;

    constructor(message: string, statusCode: Number) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor);
    }
}

export default ErrorHandler;