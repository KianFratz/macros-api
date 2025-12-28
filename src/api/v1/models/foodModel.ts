import pool from "../../../config/db.js";
import type { Food } from "../interfaces/types/food.js";

export const getAllFoodsService = async () => {
  const foods = await pool.query("SELECT * FROM food");
  return foods.rows;
};

export const getFoodByIdService = async (food_id: number) => {
  const food = await pool.query("SELECT * FROM food WHERE food_id = $1", [
    food_id,
  ]);
  return food.rows[0];
};

export const createFoodService = async (
  name: string,
  description: string,
  category_id: number,
  is_verified?: boolean
): Promise<Food> => {
  await pool.query("BEGIN");

  try {
    // validate category_id exists
    const category = await pool.query(
      "SELECT category_id FROM category WHERE category_id = $1",
      [category_id]
    );

    if (category.rows.length === 0) {
      throw new Error(`Category with id ${category_id} does not exist`);
    }

    const food = await pool.query(
      "INSERT INTO food (name, description, category_id, is_verified) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, category_id, is_verified]
    );

    await pool.query("COMMIT");
    return food.rows[0];
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

export const updateFoodService = async (
  food_id: number,
  name: string,
  description: string,
  category_id: number,
  is_verified: boolean
): Promise<Food> => {
  const updatedFood = await pool.query(
    "UPDATE food SET name=$1, description=$2, category_id=$3, is_verified=$4 WHERE food_id=$5 RETURNING *",
    [name, description, category_id, is_verified, food_id] // id is in the last because id is equals to $3
  );
  return updatedFood.rows[0];
};

export const deleteFoodService = async (food_id: number) => {
  const deletedFood = await pool.query(
    "DELETE FROM food WHERE food_id = $1 RETURNING *",
    [food_id]
  );
  return deletedFood.rows[0];
};
