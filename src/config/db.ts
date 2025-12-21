import pkg from "pg";
import dotenv from "dotenv"
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
})

pool.on("connect", () => {
    console.log("Connection pool established with database");
})

export default pool;