import  express  from "express";
import { createFood, deleteFood, getAllFoods, getFoodById, updateFood } from "../controllers/foodController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const foodRoutes = express.Router();


// Public routes 
foodRoutes.get("/foods", getAllFoods);
foodRoutes.get("/foods/:id", getFoodById);

// Protected routes - only authenticated users with specific roles
foodRoutes.post("/foods", authenticate, authorize("admin", "manager"), createFood);
foodRoutes.delete("/foods/:id", authenticate, authorize("admin", "manager"), deleteFood);
foodRoutes.put("/foods/:id", authenticate, authorize("admin", "manager"), updateFood);

export default foodRoutes;