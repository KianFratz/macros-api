import app from "./server.js";
import dotenv from "dotenv";
import pool, { connectDB } from "./config/db.js"
import userRoutes from "./api/v1/routes/userRoutes.js";
import { errorHandling } from "./api/v1/middlewares/errorHandler.js"
import createUsersTable from "./api/v1/data/createUsersTable.js";
import createCategoryTable from "./api/v1/data/createCategoryTable.js";
import categoryRoutes from "./api/v1/routes/categoryRoute.js";
import foodRoutes from "./api/v1/routes/foodRoute.js";
import createFoodTable from "./api/v1/data/createFoodTable.js";
import createNutritionTable from "./api/v1/data/createNutritionTable.js";
import nutritionRoutes from "./api/v1/routes/nutritionRoute.js";
import servingsRoutes from "./api/v1/routes/servingRoute.js";
import createServingsTable from "./api/v1/data/createServingsTable.js";
import authRoutes from "./api/v1/routes/authRoute.js";

dotenv.config();
const port = process.env.PORT || 3001;

// Connecting to database using PRISMA
connectDB();

// Routes
app.use("/v1/api", userRoutes, categoryRoutes, foodRoutes, nutritionRoutes, servingsRoutes, authRoutes);

// Error handling
app.use(errorHandling);

// Create tables before starting the server
createUsersTable();
createCategoryTable();
createFoodTable();
createNutritionTable();
createServingsTable();

// Test postgres connection
app.get("/", async (req, res) => {
    console.log("star");
    const result = await pool.query("SELECT current_database()");
    console.log("end");
    res.send(`The database name is : ${result.rows[0].current_database}`)
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

