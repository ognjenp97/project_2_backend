import express from "express";
import Hotel from "../models/Hotel.js";
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
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getHotels);
router.post("/", createHotel);

router.get("/:id", getHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id/roomData", getTableHotelRooms);
router.put("/:id/availability", updateHotelAvailability);

router.get("/:id/rooms", getHotelRooms);
router.post("/:id/rooms", createRoom);
router.delete("/:id/rooms/:roomId", deleteRoom);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/hotelData", verifyAdmin, getTableHotels);

export default router;
