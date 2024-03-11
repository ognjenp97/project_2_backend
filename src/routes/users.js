import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import authorize, { Roles } from "../middleware/authorization-middleware.js";

const router = express.Router();

router.get("/", authorize([Roles.ADMIN]), getUsers);

router.get("/:id", authorize([Roles.USER]), getUser);
router.put("/:id", authorize([Roles.ADMIN]), updateUser);
router.delete("/:id", authorize([Roles.ADMIN]), deleteUser);

export default router;
