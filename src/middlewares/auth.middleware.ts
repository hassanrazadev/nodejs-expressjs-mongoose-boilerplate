import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

interface JwtPayload {
    id: string;
    name: string;
    email: string;
    role: string;
}

/**
 * authenticate middleware
 * @param req
 * @param res
 * @param next
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = getRequestToken(req);

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

/**
 * get token from request
 * @param req
 */
const getRequestToken = (req: Request) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    return token ? token : null;
}

/**
 * check user in request
 * extra middleware for ACL
 * @param req
 * @param res
 * @param next
 */
export const checkRequestUser = (req: Request, res: Response, next: NextFunction): void => {
    const token = getRequestToken(req);
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err, decoded) => {
            if (!err) {
                const jwtPayload = decoded as JwtPayload;
                const user = await User.findById(jwtPayload.id).select('-password');
                if (user) {
                    req.user = user;
                }
            }
            next();
        });
    } else {
        next();
    }
}
