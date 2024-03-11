import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
  countByCity,
  countByType,
  getHotelRooms,
  updateHotelAvailability,
  getTableHotelRooms,
  getTableHotels,
} from "../controllers/hotel.js";
import { HotelSchema, RoomSchema } from "../validation/yup-schemes.js";
import { createRoom, deleteRoom } from "../controllers/room.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import validate from "../middleware/validation.js";
const router = express.Router();

router.get("/", getHotels);
router.post("/", validate(HotelSchema), verifyUser, verifyAdmin, createHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/hotelData", verifyAdmin, getTableHotels);

router.get("/:id", getHotel);
router.put("/:id", validate(HotelSchema), verifyUser, verifyAdmin, updateHotel);
router.delete("/:id", verifyUser, verifyAdmin, deleteHotel);
router.get("/:id/roomData", verifyAdmin, getTableHotelRooms);
router.put("/:id/availability", updateHotelAvailability);

router.get("/:id/rooms", verifyUser, verifyAdmin, getHotelRooms);
router.post(
  "/:id/rooms",
  validate(RoomSchema),
  verifyUser,
  verifyAdmin,
  createRoom
);
router.delete("/:id/rooms/:roomId", verifyUser, verifyAdmin, deleteRoom);

export default router;
