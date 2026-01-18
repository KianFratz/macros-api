import  express  from "express";
import { createNutrition, deleteNutrition, getAllNutrition, getNutritionById, updateNutrition } from "../controllers/nutritionController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const nutritionRoutes = express.Router();

// Public routes
nutritionRoutes.get("/nutrition", getAllNutrition);
nutritionRoutes.get("/nutrition/:id", getNutritionById);


// Protected routes - only authenticated users with specific roles
nutritionRoutes.post("/nutrition", authenticate, authorize("admin", "manager"), createNutrition);
nutritionRoutes.delete("/nutrition/:id", authenticate, authorize("admin", "manager"), deleteNutrition);
nutritionRoutes.put("/nutrition/:id", authenticate, authorize("admin", "manager"), updateNutrition);

export default nutritionRoutes;