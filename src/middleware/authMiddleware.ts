import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
    user?: string | null
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token: string = req.header('auth-token')!;
        if (!token) {
            return res.status(500).json({ message: "Please authenticate using valid token" })
        }
        const data: any = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = data.user;
        next();

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
}