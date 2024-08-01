import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

import { guestRoutes } from "../config/guest.route";

interface JwtPayload {
    id: string;
    name: string;
    email: string;
    role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    // if guest route, don't check anything and next()
    if (guestRoutes.includes(req.path)) {
        next();
        return;
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        const jwtPayload = decoded as JwtPayload;
        const user = await User.findById(jwtPayload.id).select('-password');

        if (!user) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;

        next();
    });
};
