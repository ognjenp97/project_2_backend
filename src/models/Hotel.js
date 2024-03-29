import mongoose from "mongoose";
const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: true,
  },
  unavailableDates: [
    {
      userId: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Hotel", HotelSchema);
