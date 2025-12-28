import pool from "../../../config/db.js";

const createFoodTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS food (
        food_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        category_id INTEGER NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (category_id) REFERENCES category(category_id)
    )
    `;

    try {
        await pool.query(queryText);
        console.log("Food table created if not exists");
    } catch (error) {
        console.error("Error creating food table:", error);
    }
}

export default createFoodTable;