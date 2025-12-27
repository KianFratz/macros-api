import express from 'express';

const categoryRoutes = express.Router();

categoryRoutes.post("/categories", createCategory);
categoryRoutes.get("/categories", getAllCategories);
categoryRoutes.get("/categories/:id", getCategoryById);
categoryRoutes.delete("/categories/:id", deleteCategory);
categoryRoutes.put("/categories/:id", updateCategory);

export default categoryRoutes;