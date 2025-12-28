import pool from "../../../config/db.js";

export const createCategoryService = async (name: string) => {
  const category = await pool.query(
    "INSERT INTO category (name) VALUES ($1) RETURNING *",
    [name]
  );

  return category.rows[0];
};

export const getAllCategoriesService = async () => {
  const categories = await pool.query("SELECT * FROM category");
  return categories.rows;
};

export const getCategoryByIdService = async (category_id: number) => {
  const category = await pool.query("SELECT * FROM category where category_id = $1", 
    [category_id,]
  );
  return category.rows[0];
};

export const deleteCategoryService = async (category_id: number) => {
  const deleteCategory = await pool.query(
    "DELETE FROM category where category_id = $1 RETURNING *",
    [category_id]
  );
  return deleteCategory.rows[0];
};

export const updateCategoryService = async (category_id: number, name: string) => {
  const updatedCategory = await pool.query(
    "UPDATE category SET name=$1 WHERE category_id=$2 RETURNING *",
    [name, category_id]
  );
  return updatedCategory.rows[0];
};
