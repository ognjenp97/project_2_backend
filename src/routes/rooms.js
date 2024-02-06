import express from "express";
import {
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";

const router = express.Router();

router.get("/", getRooms);

router.put("/:id", updateRoom);
router.get("/:id", getRoom);
router.put("/:id/availability", updateRoomAvailability);

export default router;
