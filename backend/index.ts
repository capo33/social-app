import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { errorHandler, notFound } from "./middlewares/errorHandler";

// Load env vars
dotenv.config();

import { connectDB } from "./config/db";

// Initialize express
const app: Application = express();

// Set port
const port: string = process.env.PORT || "5000";

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API is running...",
  });
});

// Error handler middleware
app.use(notFound);
app.use(errorHandler);

// Start server
try {
  app.listen(port, (): void => {
    console.log(`Server is running on port ${port} 🚀`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error occured: (${error.message})`);
  }
}
