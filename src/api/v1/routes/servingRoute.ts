import express from "express";
import { createServings, getAllServings, getServingsById, deleteServing, updateServing } from "../controllers/servingsController.js";

const servingsRoutes = express.Router();

servingsRoutes.post("/servings", createServings);
servingsRoutes.get("/servings", getAllServings);
servingsRoutes.get("/servings/:id", getServingsById);
servingsRoutes.delete("/servings/:id", deleteServing);
servingsRoutes.put("/servings/:id", updateServing);

export default servingsRoutes;