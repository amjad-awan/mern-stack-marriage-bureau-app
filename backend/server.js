import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import groomRoute from "./routes/groomRoutes.js";
import connectDB from "./db.js";
// Load environment variables from .env file
dotenv.config();
// Connect to the database
connectDB();

// Initialize Express app
const app = express();
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
// Set up middleware
app.use(cors({
  origin: 'https://zubair-marriage-center.netlify.app', // use your actual domain name (or localhost), using * is not recommended
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true
}))
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false, limit:false, }));
app.use(bodyParser.json());


// Define routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/groom", groomRoute);

// Define a default route
app.get("/", (req, res) => {
  res.send("Express API is running");
});

// Set the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
