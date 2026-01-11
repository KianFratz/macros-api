import pool from "../../../config/db.js";

const createServingsTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS servings (
            serving_id SERIAL PRIMARY KEY,
            food_id INTEGER NOT NULL,
            serving_name VARCHAR(100) NOT NULL,
            grams FLOAT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (food_id) REFERENCES food(food_id)
            ON DELETE CASCADE
        )
    `;

    try {
        await pool.query(queryText);
        console.log("Servings table created if not exists")

    } catch (error) {
        console.log("Error in creating servings table: ", error)
    }
};

export default createServingsTable;