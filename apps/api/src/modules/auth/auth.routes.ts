import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "@middleware/auth";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

// guard
router.get("/me", authMiddleware, AuthController.getMe);

export default router;
