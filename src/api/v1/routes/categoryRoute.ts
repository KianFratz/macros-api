import express from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.post("/categories", createCategory);
categoryRoutes.get("/categories", getAllCategories);
categoryRoutes.get("/categories/:id", getCategoryById);
categoryRoutes.delete("/categories/:id", deleteCategory);
categoryRoutes.put("/categories/:id", updateCategory);

export default categoryRoutes;