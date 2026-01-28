import { Router } from "express";
import * as authController from "./auth.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", requireAuth, authController.logout);
router.get("/me", requireAuth, authController.getCurrentUser);

export default router;