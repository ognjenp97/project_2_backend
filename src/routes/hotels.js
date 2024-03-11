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
import validate from "../middleware/validation-middleware.js";
import authorize, { Roles } from "../middleware/authorization-middleware.js";
const router = express.Router();

router.get("/", getHotels);
router.post(
  "/",
  authorize([Roles.ADMIN, Roles.USER]),
  validate(HotelSchema),
  createHotel
);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/hotelData", authorize([Roles.ADMIN, Roles.USER]), getTableHotels);

router.get("/:id", getHotel);
router.put(
  "/:id",
  authorize([Roles.ADMIN, Roles.USER]),
  validate(HotelSchema),
  updateHotel
);
router.delete("/:id", authorize([Roles.ADMIN, Roles.USER]), deleteHotel);
router.get(
  "/:id/roomData",
  authorize([Roles.ADMIN, Roles.USER]),
  getTableHotelRooms
);
router.put("/:id/availability", updateHotelAvailability);

router.get("/:id/rooms", authorize([Roles.ADMIN, Roles.USER]), getHotelRooms);
router.post(
  "/:id/rooms",
  authorize([Roles.ADMIN, Roles.USER]),
  validate(RoomSchema),
  createRoom
);
router.delete(
  "/:id/rooms/:roomId",
  authorize([Roles.ADMIN, Roles.USER]),
  deleteRoom
);

export default router;
