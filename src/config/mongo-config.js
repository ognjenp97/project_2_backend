import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    mongoose.connection.on("disconnected", () => {
      console.log("mongoDB disconnected!");
    });
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
export default connect;
