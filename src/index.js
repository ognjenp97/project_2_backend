import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/error-middleware.js";
import connect from "./config/mongo-config.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use(globalErrorHandler);

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
