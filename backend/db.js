import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `data base is connected to host ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Error in db ${error}`);
  }
};

export default connectDB;