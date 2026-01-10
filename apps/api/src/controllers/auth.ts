import { Request, Response } from "express";
import prisma from "@lib/prisma";
import { hashPassword, comparePassword, generateToken } from "@utils/auth";
import { signupSchema, loginSchema } from "@/validation/auth";
import { AuthRequest } from "@middleware/auth";
import { AppError } from "@middleware/errorHandler";
import { asyncHandler } from "@utils/asyncHandler";

export class AuthController {
  // POST /auth/signup
  static signup = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const validatedData = signupSchema.parse(req.body);

      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });

      if (existingUser) {
        throw new AppError(400, "Email already registered");
      }

      const hashedPassword = await hashPassword(validatedData.password);

      const user = await prisma.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        },
      });

      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const response = {
        user,
      };

      res.status(201).json(response);
    },
  );

  // POST /auth/login
  static login = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const validatedData = loginSchema.parse(req.body);

      const user = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });

      if (!user) {
        throw new AppError(401, "Invalid email or password");
      }

      const isValidPassword = await comparePassword(
        validatedData.password,
        user.password,
      );

      if (!isValidPassword) {
        throw new AppError(401, "Invalid email or password");
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const response = {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };

      res.json(response);
    },
  );

  // GET /auth/me (protected)
  static getMe = asyncHandler(
    async (req: AuthRequest, res: Response): Promise<void> => {
      if (!req.user) {
        throw new AppError(401, "Unauthorized");
      }

      res.json({ user: req.user });
    },
  );

  // POST /auth/logout
  static logout = asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.json({ message: "Logged out successfully" });
    },
  );
}
