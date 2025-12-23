import express from "express";

const userRoutes = express.Router();

userRoutes.post("/user", createUser);
userRoutes.get("/user", getAllUsers);
userRoutes.get("/user/:id", getUserById);
userRoutes.delete("/user/:id", deleteUser);
userRoutes.put("/user/:id", updateUser);

export default userRoutes;