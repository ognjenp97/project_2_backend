import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyAdmin, getUsers);

router.get("/:id", verifyUser, getUser);
router.put("/:id", verifyAdmin, updateUser);
router.delete("/:id", verifyAdmin, deleteUser);

export default router;
