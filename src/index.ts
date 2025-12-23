import app from "./server.js";
import dotenv from "dotenv";
import pool from "./config/db.js"
import userRoutes from "./api/v1/routes/userRoutes.js";
import { errorHandling } from "./api/v1/middlewares/errorHandler.js"

dotenv.config();
const port = process.env.PORT || 3001;

// Routes
app.use("/v1/api", userRoutes);

// Error handling
app.use(errorHandling);


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