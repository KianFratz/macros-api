import pool from "../../../config/db.js";
import type { Serving } from "../interfaces/types/serving.js";

export const getAllServingsService = async () => {
  const servings = await pool.query("SELECT * FROM servings");
  return servings.rows;
};

export const getServingsByIdService = async (serving_id: number) => {
  const serving = await pool.query("SELECT * FROM servings WHERE serving_id = $1", [serving_id]);
  return serving.rows[0];
};

export const createServingService = async (
  food_id: number,
  serving_name: string,
  grams: number,
): Promise<Serving> => {

    // validate food id exists
  const food = await pool.query(
    "SELECT food_id FROM food WHERE food_id = $1",
    [food_id]
  );

  if (food.rows.length === 0) {
    throw new Error(`Food with id ${food_id} does not exist`);
  }

    const serving = await pool.query(
    "INSERT INTO servings (food_id, serving_name, grams) VALUES ($1, $2, $3) RETURNING *",
    [food_id, serving_name, grams]
  );
  return serving.rows[0];
};

export const updateServingService = async (
  serving_id: number,
  food_id: number,
  serving_name: string,
  grams: number
): Promise<Serving> => {

    // validate food id exists
  const food = await pool.query(
    "SELECT food_id FROM food WHERE food_id = $1",
    [food_id]
  );

  if (food.rows.length === 0) {
    throw new Error(`Food with id ${food_id} does not exist`);
  }

  const updatedServing = await pool.query(
    "UPDATE servings SET food_id=$1, serving_name=$2, grams=$3 WHERE serving_id=$4 RETURNING *",
    [food_id, serving_name, grams, serving_id] // id is in the last because id is equals to $3
  );

  if (updatedServing.rowCount === 0) {
    throw new Error(`Serving with id ${serving_id} does not exist`)
  }
  
  return updatedServing.rows[0];
};

export const deleteServingService = async (serving_id: number) => {
  const deletedServing = await pool.query(
    "DELETE FROM servings WHERE serving_id = $1 RETURNING *",
    [serving_id]
  );
  return deletedServing.rows[0];
};
