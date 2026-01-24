import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import { authorize } from "../middlewares/authorize.js";
import { authenticate } from "../middlewares/auth.js";

const userRoutes = express.Router();

// Public route
userRoutes.post("/users", createUser);

// Private route
userRoutes.get("/users",  authenticate, authorize("manager", "admin"), getAllUsers);
userRoutes.get("/users/:id", authenticate, authorize("manager", "admin"), getUserById);
userRoutes.delete("/users/:id", authenticate, authorize("manager", "admin"), deleteUser);
userRoutes.put("/users/:id", authenticate, authorize("manager", "admin"), updateUser);

export default userRoutes;