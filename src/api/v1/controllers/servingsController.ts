import type { Request, Response, NextFunction } from "express";
import handleResponse from "../handler/handleResponse.js";
import findServingById from "../handler/findServingById.js";
import { createServingService, deleteServingService, getAllServingsService, getServingsByIdService, updateServingService } from "../models/servingModel.js";



export const createServings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    food_id,
    serving_name,
    grams,
  } = req.body;

  try {
    const existingServing = await findServingById(Number(req.params.serving_id));
    if (existingServing) return handleResponse(res, 400, "Serving already exists");

    const newServing = await createServingService(
      food_id,
      serving_name,
      grams,
    );

    handleResponse(res, 201, "Serving created successfully", newServing);
  } catch (error) {
    next(error);
  }
};

export const getAllServings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const servings = await getAllServingsService();
    handleResponse(res, 201, "Servings fetched successfully", servings);
  } catch (error) {
    next(error);
  }
};

export const getServingsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const serving = await getServingsByIdService(Number(req.params.id));

    if (!serving) return handleResponse(res, 404, "Nutrition not found");
    handleResponse(res, 201, "Serving fetched successfully", serving);
  } catch (error) {
    next(error);
  }
};

export const updateServing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const { food_id, serving_name, grams} = req.body;

  try {
    const servingId = Number(id);

    if (isNaN(servingId)) {
        return handleResponse(res, 400, "Invalid serving ID must be a number in the URL parameter");
    }

    const updatedServing = await updateServingService(
      servingId,
      food_id,
      serving_name,
      grams
    );

    if (!updatedServing) return handleResponse(res, 404, "Serving not found");

    handleResponse(
      res,
      200,
      "Serving updated successfully",
      updatedServing
    );
  } catch (error) {
    next(error);
  }
};

export const deleteServing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const servingId = Number(id);

    if (isNaN(servingId)) {
        return handleResponse(res, 400, "Invalid serving ID must be a number in the URL parameter");
    }

    const serving = await deleteServingService(servingId);

    if (!serving) return handleResponse(res, 404, "Serving not found");

    handleResponse(res, 200, "Serving deleted successfully", serving);
  } catch (error) {
    next(error);
  }
};
