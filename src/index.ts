import app from "./server.js";
import dotenv from "dotenv";
import pool from "./config/db.js"

dotenv.config();
const port = process.env.PORT || 3001;

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