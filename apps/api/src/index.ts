import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "@routes/auth";
import { errorHandler, notFoundHandler } from "@middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok", service: "food-costing-api" });
});

app.get("/api/recipes", (_, res) => {
  res.json({ message: "Recipes endpoint - coming soon" });
});

app.get("/api/inventory", (_, res) => {
  res.json({ message: "Inventory endpoint - coming soon" });
});

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});
