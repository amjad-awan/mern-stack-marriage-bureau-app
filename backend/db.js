import mongoose from "mongoose";

// mongodb+srv://amjadmalikf53:hFyCiAaO5rKStR6d@cluster0.tbisklz.mongodb.net/marriage-app-fsd?retryWrites=true&w=majority&appName=Cluster0
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://amjadmalikf53:hFyCiAaO5rKStR6d@cluster0.tbisklz.mongodb.net/marriage-app-fsd?retryWrites=true&w=majority&appName=Cluster0",{
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Unified Topology engine
      serverSelectionTimeoutMS: 50000,
    });
    console.log(
      `data base is connected to host ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Error in db ${error}`);
  }
};

export default connectDB;