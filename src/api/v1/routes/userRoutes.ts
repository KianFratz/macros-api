import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/users", createUser);
userRoutes.get("/users", getAllUsers);
userRoutes.get("/users/:id", getUserById);
userRoutes.delete("/users/:id", deleteUser);
userRoutes.put("/users/:id", updateUser);

export default userRoutes;