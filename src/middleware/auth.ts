import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

// Extend request interface by userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    // "Bearer TOKEN" -> only extract TOKEN part
    const token = authHeader.substring(7);

    // Verify Token
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    // Add userId to request (For Controller/Service)
    req.userId = decoded.userId;

    // continue to the next handler (Controller)
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};
