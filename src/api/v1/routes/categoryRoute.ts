import express from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

const categoryRoutes = express.Router();

// Public route - anyone can view categories
categoryRoutes.get("/categories", getAllCategories);
categoryRoutes.get("/categories/:id", getCategoryById);


// Protected routes - only authenticated users with specific roles
categoryRoutes.post("/categories", authenticate, authorize('admin', 'manager'), createCategory);
categoryRoutes.delete("/categories/:id", authenticate, authorize('admin'), deleteCategory);
categoryRoutes.put("/categories/:id", authenticate, authorize('admin', 'manage'), updateCategory);

export default categoryRoutes;