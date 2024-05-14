import express from "express";
import { addGroom, getGrooms } from "../controllers/groomController.js";
const route = express.Router();
route.post("/add-groom", addGroom);
route.get("/get-grooms", getGrooms);




export default route;
