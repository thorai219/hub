import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error("Error:", err);

  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation error",
      details: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === "P2002") {
      res.status(409).json({
        error: "Resource already exists",
        field: err.meta?.target,
      });
      return;
    }

    // Record not found
    if (err.code === "P2025") {
      res.status(404).json({
        error: "Resource not found",
      });
      return;
    }

    // Foreign key constraint
    if (err.code === "P2003") {
      res.status(400).json({
        error: "Invalid reference",
      });
      return;
    }
  }

  if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      error: "Invalid token",
    });
    return;
  }

  if (err.name === "TokenExpiredError") {
    res.status(401).json({
      error: "Token expired",
    });
    return;
  }

  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
}
