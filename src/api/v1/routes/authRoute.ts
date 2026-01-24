import  express  from "express";
import { login, logout } from "../controllers/authController.js";

const authRoutes = express.Router();

// Public routes
authRoutes.post("/login",  login);
authRoutes.post("/logout", logout)

// Protected routes

export default authRoutes