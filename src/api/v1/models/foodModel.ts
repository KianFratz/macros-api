import pool, { prisma } from "../../../config/db.js";
import type { Food } from "../interfaces/types/food.js";

export const getAllFoodsService = async () => {
  const foods = await prisma.food.findMany();
  return foods;
};

export const getFoodByIdService = async (id: number) => {
  const food = await prisma.food.findUnique({
    where : { id }
  });

  if (!food) {
    throw new Error("Food not found");
  }

  return food;
};

export const createFoodService = async (
  name: string,
  description: string,
  category_id: number,
  is_verified?: boolean
): Promise<Food> => {

  try {
    // validate category_id exists
    const category = await prisma.category.findUnique(
      {
        where: { id: category_id },
      }
    );

    if (!category) {
      throw new Error(`Category with id ${category_id} does not exist`);
    }

    const food = await prisma.food.create(
      {
        data: {name, description, category_id, is_verified: is_verified || false},
        select: {
          id: true,
          name: true,
          description: true,
          category_id: true,
          is_verified: true,
          createdAt: true,
        }
      }
);

    return food;

  } catch (error) {
    throw error;
  }
};

export const updateFoodService = async (
  id: number,
  name: string,
  description: string,
  category_id: number,
  is_verified: boolean
): Promise<Food> => {

  // validate food_id exists
  const food = await prisma.food.findUnique(
    {
      where: { id },
    }
  );

  if (!food) {
    throw new Error(`Food with id ${id} does not exist`);
  }

  // validate category_id exists
  const category = await prisma.category.findUnique(
    {
      where: { id: category_id },
    }
  );

  if (!category) {
    throw new Error(`Category with id ${category_id} does not exist`);
  }
  
  const updatedFood = await prisma.food.update({
    where : { id },
    data : {
      name,
      description,
      category_id,
      is_verified
    }
  }
  );

  return updatedFood;
};

export const deleteFoodService = async (id: number) => {

  // validate food_id exists
  const food = await prisma.food.findUnique({
    where: { id },
  });

  if (!food) {
    throw new Error("Food not found");
  }

  const deletedFood = await prisma.food.delete({
    where : { id },
    select: {
      id: true,
      name: true,
      description: true,
      category_id: true,
      is_verified: true,
      createdAt: true
    }
  });


  return deletedFood;
};
