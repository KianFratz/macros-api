import pool from "../../../config/db.js";

const createNutritionTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS nutrition (
            nutrition_id SERIAL PRIMARY KEY,
            food_id INTEGER NOT NULL,
            calories INTEGER,
            protein FLOAT,
            fat FLOAT,
            fiber FLOAT,
            sugar FLOAT,
            sodium FLOAT,
            carbohydrates FLOAT,
            created_at TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (food_id) REFERENCES food(food_id)
        )
    `;

    try {
        await pool.query(queryText);
        console.log("Nutrition table created if not exists")

    } catch (error) {
        console.log("Error in creating nutrition table: ", error)
    }
};

export default createNutritionTable;