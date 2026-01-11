import pool from "../../../config/db.js";

export const findCategoryByName = async ( name: string
) => {
    const category = await pool.query("SELECT * FROM category where name = $1", [name]);
    return category.rows[0];
}
  
export default findCategoryByName;