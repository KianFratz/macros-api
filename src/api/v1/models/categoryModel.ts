import pool from "../../../config/db.js";

export const createCategoryService = async (name: string) => {
  const category = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name]
  );

  return category.rows[0];
};

export const getAllCategoriesService = async () => {
  const categories = await pool.query("SELECT * FROM categories");
  return categories.rows;
};

export const getCategoryByIdService = async (id: number) => {
  const category = await pool.query("SELECT * FROM categories where id = $1", [
    id,
  ]);
  return category.rows[0];
};

export const deleteCategoryService = async (id: number) => {
  const deleteCategory = await pool.query(
    "DELETE FROM categories where id = $1 RETURNING *",
    [id]
  );
  return deleteCategory.rows[0];
};

export const updateCategoryService = async (id: number, name: string) => {
  const updatedCategory = await pool.query(
    "UPDATE categories SET name=$1 WHERE id=$2 RETURNING *",
    [name, id]
  );
  return updatedCategory.rows[0];
};
