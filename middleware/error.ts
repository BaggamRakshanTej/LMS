import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Wrong mongodb id error
    if (err.name === 'CastError') { // the error name is called cast error for mongodb id
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400);
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    }

    // Wrong JWT Error
    if (err.name === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid, try again';
        err = new ErrorHandler(message, 400);
    }

    // JWT Expired error
    if (err.name === 'TokenExpiredError') {
        const message = 'JSON Web token is expired, try again';
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}