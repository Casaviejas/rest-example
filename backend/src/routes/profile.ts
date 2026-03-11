import { Router } from "express";
import { getProfile, updateProfile, deleteUser } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateProfile);
router.delete("/me", authMiddleware, deleteUser);

export default router;