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
import { createRoom, deleteRoom } from "../controllers/room.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getHotels);
router.post("/", verifyAdmin, verifyUser, createHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/hotelData", verifyAdmin, getTableHotels);

router.get("/:id", getHotel);
router.put("/:id", verifyUser, verifyAdmin, updateHotel);
router.delete("/:id", verifyUser, verifyAdmin, deleteHotel);
router.get("/:id/roomData", verifyAdmin, getTableHotelRooms);
router.put("/:id/availability", updateHotelAvailability);

router.get("/:id/rooms", verifyUser, verifyAdmin, getHotelRooms);
router.post("/:id/rooms", verifyUser, verifyAdmin, createRoom);
router.delete("/:id/rooms/:roomId", verifyUser, verifyAdmin, deleteRoom);

export default router;
