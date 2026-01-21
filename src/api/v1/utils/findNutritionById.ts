import pool from "../../../config/db.js";

export const findNutritionById = async ( nutrition_id: number
) => {
    const nutrition = await pool.query("SELECT * FROM nutrition where nutrition_id = $1", [nutrition_id]);
    return nutrition.rows[0];
}
  
export default findNutritionById;