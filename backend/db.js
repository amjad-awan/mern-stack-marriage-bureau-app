import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://amjadmalikf53:hFyCiAaO5rKStR6d@cluster0.tbisklz.mongodb.net/marriage-app-fsd?retryWrites=true&w=majority&appName=Cluster0");

    console.log(
      `data base is connected to host ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Error in db ${error}`);
  }
};

export default connectDB;