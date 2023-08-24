import express, { Application } from "express";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middlewares/errorHandler";


// Load env vars
dotenv.config();

// Initialize express
const app: Application = express();

// Set port
const port: string = process.env.PORT || "5000";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
