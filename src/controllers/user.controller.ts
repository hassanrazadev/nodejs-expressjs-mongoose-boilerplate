import {NextFunction, Request, Response} from 'express';
import User, { IUser } from '../models/user.model';

/**
 * return profile data of logged-in user
 * @param req
 * @param res
 */
export const profile = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({
        message: "profile",
        user: req.user
    });
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user;
}