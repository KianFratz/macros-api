import express from "express";
import { createServings, getAllServings, getServingsById, deleteServing, updateServing } from "../controllers/servingsController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const servingsRoutes = express.Router();

// Public routes
servingsRoutes.get("/servings", getAllServings);
servingsRoutes.get("/servings/:id", getServingsById);

// Protected routes - only authenticated users with specific roles
servingsRoutes.post("/servings", authenticate, authorize("admin", "manager"), createServings);
servingsRoutes.delete("/servings/:id", authenticate, authorize("admin", "manager"), deleteServing);
servingsRoutes.put("/servings/:id", authenticate, authorize("admin", "manager"), updateServing);

export default servingsRoutes;