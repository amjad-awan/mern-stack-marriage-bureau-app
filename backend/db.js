import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://amjadmalikf53:hFyCiAaO5rKStR6d@cluster0.tbisklz.mongodb.net/marriage-app-fsd?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`Database connected to host: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in DB connection: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
