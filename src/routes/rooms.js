import express from "express";
import {
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyUser, verifyAdmin, getRooms);

router.put("/:id", verifyUser, verifyAdmin, updateRoom);
router.get("/:id", verifyUser, verifyAdmin, getRoom);
router.put("/:id/availability", updateRoomAvailability);

export default router;
