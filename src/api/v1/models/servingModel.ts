import { prisma } from "../../../config/db.js";
import type { Serving } from "../interfaces/types/serving.js";

export const getAllServingsService = async () => {
  const servings = await prisma.serving.findMany();
  return servings;
};

export const getServingsByIdService = async (serving_id: number) => {
  const serving = await prisma.serving.findUnique({
    where: { id: serving_id },
  });
  return serving ?? null;
};

export const createServingService = async (
  food_id: number,
  serving_name: string,
  grams: number
): Promise<Serving> => {
  // Runtime validation
  if (typeof serving_name !== "string" || serving_name.trim() === "") {
    throw new Error("serving_name must be a non-empty string");
  }

  if (typeof food_id !== "number" || typeof grams !== "number") {
    throw new Error("food_id and grams must be numbers");
  }

  // validate food id exists
  const food = await prisma.food.findUnique({
    where: { id: food_id },
  });

  if (!food) {
    throw new Error(`Food with id ${food_id} does not exist`);
  }

  const serving = await prisma.serving.create({
    data: { food_id, serving_name, grams },
  });
  return serving;
};

export const updateServingService = async (
  serving_id: number,
  food_id: number,
  serving_name: string,
  grams: number
): Promise<Serving> => {
  // validate serving exists
  const existingServing = await prisma.serving.findUnique({
    where: { id: serving_id },
  });

  if (!existingServing) {
    throw new Error(`Serving with id ${serving_id} does not exist`);
  }

  // validate food id exists
  const food = await prisma.food.findUnique({
    where: { id: food_id },
  });

  if (!food) {
    throw new Error(`Food with id ${food_id} does not exist`);
  }

  const updatedServing = await prisma.serving.update({
    where: { id: serving_id },
    data: { food_id, serving_name, grams },
  });

  return updatedServing;
};

export const deleteServingService = async (serving_id: number) => {
  const existingServing = await prisma.serving.findUnique({
    where: { id: serving_id },
  });

  if (!existingServing) {
    throw new Error(`Serving with id ${serving_id} does not exist`);
  }

  const deletedServing = await prisma.serving.delete({
    where: { id: serving_id },
  });
  return deletedServing;
};
