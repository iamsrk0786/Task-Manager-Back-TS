import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
  user?: any; // Replace `any` with the appropriate type for your decoded JWT payload
}
const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "Authorization token is missing or invalid" });
    }

    const token = authHeader!.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token is missing" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    req.user = decoded; 

    next(); 
  } catch (error: any) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authMiddleware;
