import  express  from "express";
import { login } from "../controllers/authController.js";

const authRoutes = express.Router();

// Public routes
authRoutes.post("/login",  login);

// Protected routes

export default authRoutes