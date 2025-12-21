import express from "express";
import type { Request, Response } from "express";
import cors from "cors";    

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from server.ts!");
})

export default app;