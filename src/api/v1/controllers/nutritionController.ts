import type { Request, Response, NextFunction } from "express";
import handleResponse from "../handler/handleResponse.js";

import { findNutritionById } from "../handler/findNutritionById.js";
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
    if (existingNutrition)
      return handleResponse(res, 400, "Nutrition already exists");

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
    const updatedNutrition = await updateNutritionService(
      Number(nutrition_id),
      food_id,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sugar,
      sodium
    );
    if (!updatedNutrition) return handleResponse(res, 404, "Nutrition not found");

    handleResponse(res, 200, "Nutrition updated successfully", updatedNutrition);
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
    const nutrition = await deleteNutritionService(Number(req.params.nutrition_id));
    if (!nutrition) return handleResponse(res, 404, "Nutrition not found");

    handleResponse(res, 200, "Nutrition deleted successfully", nutrition);
  } catch (error) {
    next(error);
  }
};
