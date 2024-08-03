import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ErrorHandler from './utils/ErrorHandler';
import {ErrorMiddleware} from './middleware/error'; 

// configure dotenv for use
require('dotenv').config();

// Creating express object
export const app = express();

// body parser (important for using cloudinary)
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors = cross origin resource sharing
// give the location from where the application can be accessed
app.use(cors({
    origin: process.env.ORIGIN,
}));




// testing route
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        mesasge: "API is working great"
    });
});

// unknown route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found `) as any;
    err.statusCode = 404;
    next(err);
})

app.use(ErrorMiddleware);