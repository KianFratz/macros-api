import type { Request, Response, NextFunction } from "express";
import handleResponse from "../utils/handleResponse.js";

import { findNutritionById } from "../utils/findNutritionById.js";
import {
  createNutritionService,
  deleteNutritionService,
  getAllNutritionService,
  getNutritionByIdService,
  updateNutritionService,
} from "../models/nutritionModel.js";

export const createNutrition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    nutrition_id,
    food_id,
    calories,
    protein,
    carbs,
    fat,
    fiber,
    sugar,
    sodium,
  } = req.body;

  try {
    const existingNutrition = await findNutritionById(nutrition_id);
    if (existingNutrition) return handleResponse(res, 400, "Nutrition already exists");

    const newNutrition = await createNutritionService(
      food_id,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sugar,
      sodium
    );
    handleResponse(res, 201, "Nutrition created successfully", newNutrition);
  } catch (error) {
    next(error);
  }
};

export const getAllNutrition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const nutrition = await getAllNutritionService();
    handleResponse(res, 201, "Nutrition fetched successfully", nutrition);
  } catch (error) {
    next(error);
  }
};

export const getNutritionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const nutrition = await getNutritionByIdService(Number(req.params.id));

    if (!nutrition) return handleResponse(res, 404, "Nutrition not found");
    handleResponse(res, 201, "Nutrition fetched successfully", nutrition);
  } catch (error) {
    next(error);
  }
};

export const updateNutrition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const { food_id, calories, protein, carbs, fat, fiber, sugar, sodium } =
    req.body;

  try {
    const nutritionId = Number(id);

    if (isNaN(nutritionId)) {
        return handleResponse(res, 400, "Invalid nutrition ID must be a number in the URL parameter");
    }

    const updatedNutrition = await updateNutritionService(
      nutritionId,
      food_id,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sugar,
      sodium
    );
    if (!updatedNutrition)
      return handleResponse(res, 404, "Nutrition not found");

    handleResponse(
      res,
      200,
      "Nutrition updated successfully",
      updatedNutrition
    );
  } catch (error) {
    next(error);
  }
};

export const deleteNutrition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const nutritionId = Number(id);

    if (isNaN(nutritionId)) {
        return handleResponse(res, 400, "Invalid nutrition ID must be a number in the URL parameter");
    }

    const nutrition = await deleteNutritionService(nutritionId);

    if (!nutrition) return handleResponse(res, 404, "Nutrition not found");

    handleResponse(res, 200, "Nutrition deleted successfully", nutrition);
  } catch (error) {
    next(error);
  }
};
