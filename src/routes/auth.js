import express from "express";
import { login, register } from "../controllers/auth.js";
import { LoginSchema, RegisterSchema } from "../validation/yup-schemes.js";
import validate from "../middleware/validation.js";

const router = express.Router();

router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);

export default router;
