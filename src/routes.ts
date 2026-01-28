import { Router } from "express";
import authRouters from "./modules/auth/auth.routes";

const router = Router();

router.use("/api/auth", authRouters);

export default router;