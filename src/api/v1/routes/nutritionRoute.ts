import  express  from "express";
import { createNutrition, deleteNutrition, getAllNutrition, getNutritionById, updateNutrition } from "../controllers/nutritionController.js";
import { get } from "node:http";
import type { deleteNutritionService } from "../models/nutritionModel.js";

const nutritionRoutes = express.Router();

nutritionRoutes.post("/nutrition", createNutrition);
nutritionRoutes.get("/nutrition", getAllNutrition);
nutritionRoutes.get("/nutrition/:id", getNutritionById);
nutritionRoutes.delete("/nutrition/:id", deleteNutrition);
nutritionRoutes.put("/nutrition/:id", updateNutrition);

export default nutritionRoutes;