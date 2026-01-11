import type { NextFunction, Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../models/userModel.js";
import handleResponse from "../handler/handleResponse.js";


export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, role } = req.body;

  try {
    const newUser = await createUserService(name, email, role);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserByIdService(Number(req.params.id));
    if (!user) return handleResponse(res, 404, "User not found");

    handleResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, role } = req.body;

  try {
    const updatedUser = await updateUserService(
      Number(req.params.id),
      name,
      email,
      role
    );
    if (!updatedUser) return handleResponse(res, 404, "User not found");

    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedUser = await deleteUserService(Number(req.params.id));
    if (!deletedUser) return handleResponse(res, 404, "User not found");

    handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (error) {
    next(error);
  }
};
