import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "@modules/auth/auth.routes";
import restaurantRoutes from "@modules/restaurant/restaurant.routes";
import ingredientRoutes from "@modules/ingredient/ingredient.routes";
import purchaseRoutes from "@modules/purchase/purchase.routes";
import recipeRoutes from "@modules/recipe/recipe.routes";
import menuItemRoutes from "@modules/menuItem/menuItem.routes";
import salesRecordRoutes from "@modules/salesRecord/salesRecord.routes";
import inventoryCountRoutes from "@modules/inventoryCount/inventoryCount.routes";
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
