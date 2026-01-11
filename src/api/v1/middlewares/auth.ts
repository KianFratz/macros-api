import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: {
                users_id: number;
                name: string;
                email: string;
                role: string
            }
        }
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message : 'No authentication token provided'});
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            users_id: number;
            name: string;
            email: string;
            role: string;
        };

        // Attach user info to request object 
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid authentication token' });
    }
}