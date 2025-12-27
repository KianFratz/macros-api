import type { Request, Response, NextFunction } from "express";
import handleResponse from "../handler/handleResponse.js";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "../models/categoryModel.js";
import { findCategoryByName } from "../handler/findCategoryByName.js";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const existingCategory = await findCategoryByName(name);
    if (existingCategory) return handleResponse(res, 400, "Category already exists");

    const newCategory = await createCategoryService(name);
    handleResponse(res, 201, "Category created successfully", newCategory);

  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategoriesService();
    handleResponse(res, 201, "Categories fetched successfully", categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await getCategoryByIdService(Number(req.params.id));

    if (!category) return handleResponse(res, 404, "Category not found");
    handleResponse(res, 201, "Category fetched successfully", category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const updateCategory = await updateCategoryService(
      Number(req.params.id),
      name
    );
    if (!updateCategory) return handleResponse(res, 404, "Category not found");

    handleResponse(res, 200, "Category updated successfully", updateCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedCategory = await deleteCategoryService(Number(req.params.id));
    if (!deletedCategory) return handleResponse(res, 404, "Category not found");

    handleResponse(res, 200, "Category deleted successfully", deletedCategory);
  } catch (error) {
    next(error);
  }
};
