import { Roles } from "../middleware/authorization-middleware.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotelAvailability = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const dates = req.body.dates;
    await Hotel.updateOne(
      { _id: req.params.id },
      {
        $push: {
          unavailableDates: dates.map((date) => ({
            userId: userId,
            date: date,
          })),
        },
      }
    );
    res.status(200).json("Hotel status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const cottageCount = await Hotel.countDocuments({ type: "cottage" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const houseCount = await Hotel.countDocuments({ type: "house" });
    const motelCount = await Hotel.countDocuments({ type: "motel" });
    const businessSpaceCount = await Hotel.countDocuments({
      type: "business space",
    });
    const garageCount = await Hotel.countDocuments({ type: "garage" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "villas", count: villaCount },
      { type: "apartments", count: apartmentCount },
      { type: "cottages", count: cottageCount },
      { type: "houses", count: houseCount },
      { type: "motels", count: motelCount },
      { type: "business spaces", count: businessSpaceCount },
      { type: "garages", count: garageCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getTableHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    const columns = [
      {
        field: "id",
        headerName: "",
        width: 30,
        align: "center",
      },
      {
        field: "title",
        headerName: "Title",
        width: 300,
      },
      {
        field: "price",
        headerName: "Price (€)",
        width: 150,
      },
      {
        field: "maxPeople",
        headerName: "Max. people",
        width: 150,
      },
      {
        field: "roomNumbers",
        headerName: "Room numbers",
        width: 400,
      },
    ];

    const rows = list.map((item, index) => ({
      id: index + 1,
      title: item.title,
      maxPeople: item.maxPeople,
      price: item.price,
      roomNumbers: item.roomNumbers.map((room) => room.number),
      _id: item._id,
    }));

    res.status(200).json({ columns: columns, rows: rows, id: hotel._id });
  } catch (err) {
    next(err);
  }
};

export const getTableHotels = async (req, res, next) => {
  try {
    const columns = [
      {
        field: "name",
        headerName: "Name",
        width: 200,
      },
      {
        field: "title",
        headerName: "Title",
        width: 200,
      },
      {
        field: "city",
        headerName: "City",
        width: 200,
      },
      {
        field: "type",
        headerName: "Type",
        width: 140,
      },
    ];

    if (req.user.roles.includes(Roles.ADMIN)) {
      const hotels = await Hotel.find({}).limit(req.query.limit);
      const rows = hotels.map((item) => ({
        name: item.name,
        type: item.type,
        city: item.city,
        title: item.title,
        room: item.rooms,
        _id: item._id,
      }));
      const photo = hotels.map((item, index) => ({
        photo: item.photos[0],
      }));
      res.status(200).json({ column: columns, row: rows, photo: photo });
    } else {
      const hotels = await Hotel.find({
        userId: req.user.id,
      }).limit(req.query.limit);
      const rows = hotels.map((item) => ({
        name: item.name,
        type: item.type,
        city: item.city,
        title: item.title,
        room: item.rooms,
        _id: item._id,
      }));
      const photo = hotels.map((item) => ({
        photo: item.photos[0],
      }));
      res.status(200).json({ column: columns, row: rows, photo: photo });
    }
  } catch (err) {
    next(err);
  }
};
