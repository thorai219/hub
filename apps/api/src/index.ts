import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "@routes/auth";
import restaurantRoutes from "@routes/restaurant";
import ingredientRoutes from "@routes/ingredient";
import purchaseRoutes from "@routes/purchase";
import recipeRoutes from "@routes/recipe";
import menuItemRoutes from "@routes/menuItem";
import salesRecordRoutes from "@routes/salesRecord";
import inventoryCountRoutes from "@routes/inventoryCount";
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
app.use("/restaurants", restaurantRoutes);
app.use("/restaurants", ingredientRoutes);
app.use("/restaurants", purchaseRoutes);
app.use("/restaurants", recipeRoutes);
app.use("/restaurants", menuItemRoutes);
app.use("/restaurants", salesRecordRoutes);
app.use("/restaurants", inventoryCountRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok", service: "food-costing-api" });
});

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});
