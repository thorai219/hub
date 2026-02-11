import { Response, NextFunction } from "express";
import { AuthRequest } from "@middleware/auth";
import { AppError } from "@middleware/errorHandler";

export function requireStaff(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): void {
  const role = req.user?.role ?? "USER";
  if (role !== "ADMIN" && role !== "SUPPORT") {
    next(new AppError(403, "Access restricted to admin/support"));
    return;
  }
  next();
}
