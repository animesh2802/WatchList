import express from "express";
import { loginController, verifyOtpController } from "../controllers/auth.controller.js";

const router = express.Router();

//login route
router.post('/login', loginController);
router.post('/verify', verifyOtpController);

export default router;