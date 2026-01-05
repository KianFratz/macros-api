import pool from "../../../config/db.js";
import type { Nutrition } from "../interfaces/types/nutrition.js";

export const createNutritionService = async (
  food_id: number,
  calories: number,
  protein: number,
  carbs: number,
  fat?: number,
  fiber?: number,
  sugar?: number,
  sodium?: number
): Promise<Nutrition> => {
  await pool.query("BEGIN");

  try {
    // validate food id exists
    const food = await pool.query(
      "SELECT food_id FROM food WHERE food_id = $1",
      [food_id]
    );

    if (food.rows.length === 0) {
      throw new Error(`Food with id ${food_id} does not exist`);
    }

    const nutrition = await pool.query(
      "INSERT INTO nutrition (food_id, calories, protein, carbs, fat, fiber, sugar, sodium) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [food_id, calories, protein, carbs, fat, fiber, sugar, sodium]
    );

    await pool.query("COMMIT");
    return food.rows[0];
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

export const getAllNutritionService = async () => {
    const nutritions = await pool.query("SELECT * FROM nutrition");
    return nutritions.rows;
}

export const getNutritionByIdService = async (nutrition_id: number) => {
    const nutrition = await pool.query("SELECT * FROM nutrition WHERE nutrition_id = $1", [nutrition_id]);
    return nutrition.rows[0];
}

export const updateNutritionService = async (
    nutrition_id: number,
    food_id: number,
    calories: number,
    protein: number,
    fat: number,
    fiber: number,
    sugar: number,
    sodium: number,
    carbs: number,
) => {
    const updatedNutrition = await pool.query(
        "UPDATE nutrition SET food_id=$1, calories=$2, protein=$3, fat=$4, fiber=$5, sugar=$6, sodium=$7, carbs=$8 WHERE nutrition_id=$9 RETURNING *",
        [food_id, calories, protein, fat, fiber, sugar, sodium, carbs, nutrition_id]
    )

    return updatedNutrition.rows[0];
}

export const deleteNutritionService = async (nutrition_id: number) => {
    const deletedNutrition = await pool.query(
        "DELETE FROM nutrition WHERE nutrition_id = $1 RETURNING *",
        [nutrition_id]
    ); 

    return deletedNutrition.rows[0];
}