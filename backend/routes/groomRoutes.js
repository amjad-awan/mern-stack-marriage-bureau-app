import express from "express";
import  formidableMiddleware from 'express-formidable'

import { addGroom, getGrooms, getSingleGroom } from "../controllers/groomController.js";

const route = express.Router();
route.post("/add-groom", formidableMiddleware(),addGroom);
route.get("/get-grooms", getGrooms);
route.get("/get-single-groom/:id", getSingleGroom);




export default route;
