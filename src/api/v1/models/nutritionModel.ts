import pool, { prisma } from "../../../config/db.js";
import type { Nutrition } from "../../../generated/prisma/index.js";

export const createNutritionService = async (
  food_id: number,
  calories: number,
  protein: number,
  carbs: number,
  fat: number ,
  fiber: number, 
  sugar: number,
  sodium: number
): Promise<Nutrition> => {

  try {
    // validate food id exists
    const food = await prisma.food.findUnique({
      where: { id: food_id }
    }
    );

    if (!food) {
      throw new Error(`Food with id ${food_id} does not exist`);
    }

    const nutrition = await prisma.nutrition.create({
      data: {
        food_id,
        calories,
        protein,
        carbs,
        fat,
        fiber,
        sugar,
        sodium
      }, 
      select: {
        id: true,
        food_id: true,
        calories: true,
        protein: true,
        carbs: true,
        fat: true,
        fiber: true,
        sugar: true,
        sodium: true,
        createdAt: true
      }
    }
    );

    return nutrition;

  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

export const getAllNutritionService = async () => {
  const nutrition = await prisma.nutrition.findMany();
  return nutrition;
};

export const getNutritionByIdService = async (id: number) => {
  const nutrition = await prisma.nutrition.findUnique({
    where: { id }
    
  });

  if (!nutrition) {
    throw new Error("Nutrition not found");
  }

  return nutrition;
};

export const updateNutritionService = async (
  nutrition_id: number,
  food_id: number,
  calories: number,
  protein: number,
  fat: number,
  fiber: number,
  sugar: number,
  sodium: number,
  carbs: number
) => {
  
  // validate food id exists
  const food = await prisma.food.findUnique({
    where: { id: food_id }
  }
  );

  if (!food) {
    throw new Error(`Food with id ${food_id} does not exist`);
  }

  const updatedNutrition = await prisma.nutrition.update({
    where : { id: nutrition_id },
    data : {
      food_id,
      calories,
      protein,
      fat,
      fiber,
      sugar,
      sodium,
      carbs
    }
  }
    
  );

  if (!updatedNutrition) {
    throw new Error(`Nutrition with id ${nutrition_id} does not exist`)
  }

  return updatedNutrition;
};

export const deleteNutritionService = async (nutrition_id: number) => {
  if (!nutrition_id) {
    throw new Error("Nutrition id is required");
  }

  const isNutritionExist = await prisma.nutrition.findUnique({
    where: { id: nutrition_id },
  });

  if (!isNutritionExist) {
    throw new Error("Nutrition not found");
  }

  const deletedNutrition = await prisma.nutrition.delete({
    where : { id: nutrition_id },
    select : {
      id: true,
      food_id: true,
      calories: true,
      protein: true,
      fat: true,
      fiber: true,
      sugar: true,
      sodium: true,
      carbs: true,
    }
  }
  );

  return deletedNutrition;
};
