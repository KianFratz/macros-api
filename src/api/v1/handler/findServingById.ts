import pool from "../../../config/db.js";

export const findServingById = async ( serving_id: number
) => {
    const serving = await pool.query("SELECT * FROM servings where serving_id = $1", [serving_id]);
    return serving.rows[0];
}
  
export default findServingById;