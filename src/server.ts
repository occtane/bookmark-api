import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // JSON Body-Parser

// Test Route
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "Server is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`--- Server running on http://localhost:${PORT} ---`);
});
