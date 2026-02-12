import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/database";
import bookmarkRoutes from "./routes/bookmarkRoutes";
import authRoutes from "./routes/authRoutes";

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

// API routes
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/auth", authRoutes);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    app.listen(PORT, () => {
      console.log(`--- Server running on http://localhost:${PORT} ---`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
