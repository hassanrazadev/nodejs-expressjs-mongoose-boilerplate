import express, {Router} from 'express';
import dotenv from 'dotenv';
import { logger } from './middlewares/logger.middleware';
import connectDB from "./config/db";
import {errorHandler} from "./middlewares/errorHandler.middleware";

import acl from './middlewares/acl.middleware'

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import {checkRequestUser} from "./middlewares/auth.middleware";
import {globalErrorHandlerMiddleware} from "./middlewares/globalErrorHandler.middleware";
import {AppError} from "./utils/AppError";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// use authenticated middleware
app.use(checkRequestUser);

// apply acl to only defined routes
const applyAclToRoute = (router: Router) => {
    router.use(acl);
    return router;
}

// routes definition
app.use('/api/auth', applyAclToRoute(authRoutes));
app.use('/api/users', applyAclToRoute(userRoutes));


// 404 response
app.use('*', (req, res, next) => {
    console.log(req.originalUrl)
    next(new AppError(`Route ${req.originalUrl} Not Found - 404`, 404));
});

app.use(globalErrorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
