import  express  from "express";
import { createFood, deleteFood, getAllFoods, getFoodById, updateFood } from "../controllers/foodController.js";

const foodRoutes = express.Router();

foodRoutes.post("/foods", createFood);
foodRoutes.get("/foods", getAllFoods);
foodRoutes.get("/foods/:id", getFoodById);
foodRoutes.delete("/foods/:id", deleteFood);
foodRoutes.put("/foods/:id", updateFood);

export default foodRoutes;