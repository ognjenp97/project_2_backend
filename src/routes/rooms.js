import express from "express";
import {
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import validate from "../middleware/validation-middleware.js";
import authorize, { Roles } from "../middleware/authorization-middleware.js";
import { RoomSchema } from "../validation/yup-schemes.js";

const router = express.Router();

router.get("/", authorize([Roles.ADMIN, Roles.USER]), getRooms);

router.put(
  "/:id",
  authorize([Roles.ADMIN, Roles.USER]),
  validate(RoomSchema),
  updateRoom
);
router.get("/:id", authorize([Roles.ADMIN, Roles.USER]), getRoom);
router.put(
  "/:id/availability",
  authorize([Roles.ADMIN, Roles.USER]),
  updateRoomAvailability
);

export default router;
