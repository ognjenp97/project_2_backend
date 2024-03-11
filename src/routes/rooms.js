import express from "express";
import {
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import validate from "../middleware/validation.js";
import { RoomSchema } from "../validation/yup-schemes.js";

const router = express.Router();

router.get("/", verifyUser, verifyAdmin, getRooms);

router.put("/:id", validate(RoomSchema), verifyUser, verifyAdmin, updateRoom);
router.get("/:id", verifyUser, verifyAdmin, getRoom);
router.put("/:id/availability", updateRoomAvailability);

export default router;
