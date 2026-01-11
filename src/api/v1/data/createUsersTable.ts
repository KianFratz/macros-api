import pool from "../../../config/db.js"

const createUsersTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
        )
    `;

    try {
        await pool.query(queryText);
        console.log("Users table created if not exists")
    } catch (error) {
        console.log("Error in creating users table: ", error)
    }
}

export default createUsersTable;