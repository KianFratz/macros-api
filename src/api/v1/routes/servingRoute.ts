import express from "express";

const servingsRoutes = express.Router();

servingsRoutes.post("/servings", createServings);
servingsRoutes.get("/servings", getAllServings);
servingsRoutes.get("/servings/:id", getServingsById);
servingsRoutes.delete("/servings/:id", deleteServings);
servingsRoutes.put("/servings/:id", updateServings);

export default servingsRoutes;