import {NextFunction, Request, Response} from 'express';

interface ErrorResponse {
    statusCode: number;
    status: string;
    message: string;
}

export const globalErrorHandlerMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error: ErrorResponse = {
        statusCode: err.statusCode || 500,
        status: err.status || 'error',
        message: err.message || 'Internal Server Error',
    };

    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    });
}