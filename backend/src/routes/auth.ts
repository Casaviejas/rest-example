import express, { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validate.middleware";

const router: Router = express.Router();

// POST /auth/register
router.post("/register", validateRegister, register);

//POST /auth/login
router.post("/login", validateLogin, login);

export default router;
