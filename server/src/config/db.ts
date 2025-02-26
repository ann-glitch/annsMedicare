import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const conn = await mongoose.connect(process.env.MONGO_URI as string);
  
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

export default connectDB;
