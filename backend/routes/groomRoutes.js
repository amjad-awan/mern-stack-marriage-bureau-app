import express from "express";
import  formidableMiddleware from 'express-formidable'

import { addGroom, getGrooms, getPhoto, getSingleGroom } from "../controllers/groomController.js";

const route = express.Router();
route.post("/add-groom", formidableMiddleware(),addGroom);
route.get("/get-grooms", getGrooms);
route.get("/get-single-groom/:id", getSingleGroom);
route.get("/get-single-photo/:id",getPhoto)




export default route;
