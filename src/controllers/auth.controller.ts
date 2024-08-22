import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import {AppError} from "../utils/AppError";

/**
 * Register user
 * @param req
 * @param res
 * @param next
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, password, email, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: `User with email ${email} already exists` });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user: IUser = new User({
            name,
            password: hashedPassword,
            email,
            role
        });

        const createdUser = await user.save();
        res.status(201).json(createdUser);
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Log user in and generate tokens
 * @param req
 * @param res
 * @param next
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            next(new AppError("Invalid email or password"))
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            next(new AppError("Invalid email or password"))
            return;
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({
            message: `User ${user.name} logged in successfully!`,
            accessToken,
            refreshToken,
            user
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Generate access token
 * @param user
 * @returns string
 */
const generateAccessToken = (user: IUser): string => {
    return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: '24h',
    });
};

/**
 * Generate refresh token
 * @param user
 * @returns string
 */
const generateRefreshToken = (user: IUser): string => {
    return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: '7d',
    });
};
