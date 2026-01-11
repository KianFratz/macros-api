import pool from "../../../config/db.js";

const createCategoryTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS category (
            category_id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
    `;

    try {
        await pool.query(queryText);
        console.log("Category table created if not exists")

    } catch (error) {
        console.log("Error in creating category table: ", error)
    }
};

export default createCategoryTable;