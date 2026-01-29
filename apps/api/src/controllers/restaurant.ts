import { Response } from "express";
import type { Restaurant } from "@repo/types";
import prisma from "@lib/prisma";
import { AppError } from "@middleware/errorHandler";
import { AuthRequest } from "@/middleware/auth";
import { RestaurantRequest } from "@/middleware/restaurantOwnership";
import { asyncHandler } from "@utils/asyncHandler";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
} from "@/validation/restaurant";

export class RestaurantController {
  // POST /restaurants
  static create = asyncHandler(
    async (req: AuthRequest, res: Response): Promise<void> => {
      if (!req.user) {
        throw new AppError(401, "Unauthorized");
      }

      const validatedData = createRestaurantSchema.parse(req.body);

      const restaurant = await prisma.restaurant.create({
        data: {
          ...validatedData,
          userId: req.user.id,
        },
      });

      res.status(201).json(restaurant);
    },
  );

  // GET /restaurants
  static getAll = asyncHandler(
    async (req: AuthRequest, res: Response): Promise<void> => {
      if (!req.user) {
        throw new AppError(401, "Unauthorized");
      }

      const restaurants = await prisma.restaurant.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
      });

      res.json(restaurants);
    },
  );

  // GET /restaurants/:restaurantId
  static getOne = asyncHandler(
    async (req: RestaurantRequest, res: Response): Promise<void> => {
      // Middleware already validated ownership and added req.restaurant
      res.json(req.restaurant);
    },
  );

  // PUT /restaurants/:restaurantId
  static update = asyncHandler(
    async (req: RestaurantRequest, res: Response): Promise<void> => {
      // Middleware already validated ownership
      const validatedData = updateRestaurantSchema.parse(req.body);

      const restaurant = await prisma.restaurant.update({
        where: { id: req.restaurantId },
        data: validatedData,
      });

      res.json(restaurant);
    },
  );

  // DELETE /restaurants/:restaurantId
  static delete = asyncHandler(
    async (req: RestaurantRequest, res: Response): Promise<void> => {
      // Middleware already validated ownership
      await prisma.restaurant.delete({
        where: { id: req.restaurantId },
      });

      res.json({ message: "Restaurant deleted successfully" });
    },
  );
}
