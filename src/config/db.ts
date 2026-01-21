import pkg from "pg";
import dotenv from "dotenv"
import { prisma } from "../api/v1/lib/prisma";
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

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via PRISMA")
    } catch (error: any) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect();
}

export default pool;
export {connectDB, disconnectDB, prisma}