import express from "express";
import { addGroom } from "../controllers/groomController.js";
const route = express.Router();
route.post("/add-groom", addGroom);

export default route;
