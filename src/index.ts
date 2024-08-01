import express from 'express';
import dotenv from 'dotenv';
import { logger } from './middlewares/logger.middleware';
import connectDB from "./config/db";
import {errorHandler} from "./middlewares/errorHandler.middleware";

import acl from './middlewares/acl.middleware'

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { authenticate } from "./middlewares/auth.middleware";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// use authenticated middleware
app.use(authenticate);

// configure acl
app.use(acl);

// routes definition
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to nodejs-expressjs-boilerplate</h1>');
});

app.use(errorHandler);

// 404 response
app.use('*', (req, res) => {
    res.status(404)
        .json({
            message: '404 - Not found'
        })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
