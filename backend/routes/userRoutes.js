import express from "express";
import { userRegister,loginController } from "../controllers/userController.js";

const route = express.Router();
route.post("/register-user", userRegister);
route.post("/login-user", loginController);


export default route;