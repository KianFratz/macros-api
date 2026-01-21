import handleResponse from "../utils/handleResponse.js";
import type { Request, Response, NextFunction } from "express";
import { createFoodService, deleteFoodService, getAllFoodsService, getFoodByIdService, updateFoodService } from "../models/foodModel.js";


export const createFood = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, description, category_id, is_verified } = req.body;

    try {
        const newFood = await createFoodService(name, description, category_id, is_verified);
        handleResponse(res, 201, "Food created successfully", newFood)
    } catch (error) {
        next(error);
    }
}

export const getAllFoods = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const foods = await getAllFoodsService();
        handleResponse(res, 200, "Foods fetched successfully", foods);
    } catch (error) {
        next(error);
    }
}

export const getFoodById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const food = await getFoodByIdService(Number(req.params.id));
        if (!food) return handleResponse(res, 404, "Food not found");

        handleResponse(res, 200, "Food fetched successfully", food);
    } catch (error) {
        next(error);
    }
}

export const deleteFood = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const deletedFood = await deleteFoodService(Number(req.params.id));
        if (!deleteFood) return handleResponse(res, 404, "Food not found");
        
        handleResponse(res, 200, "Food deleted successfully", deletedFood);
    } catch (error) {
        next(error);
    }
}

export const updateFood = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, description, category_id, is_verified } = req.body;

    try {
        const updateFood = await updateFoodService(Number(req.params.id), name, description, category_id, is_verified);
        if (!updateFood) return handleResponse(res, 404, "Food not found");
        
        handleResponse(res, 200, "Food updated successfully", updateFood);
    } catch (error) {
        next(error);
    }
}