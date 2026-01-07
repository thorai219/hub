import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@utils/auth";
import prisma from "@lib/prisma";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  };
  cookies: {
    token?: string;
    [key: string]: any;
  };
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
