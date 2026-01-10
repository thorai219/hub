import { Response, NextFunction } from "express";
import prisma from "@lib/prisma";
import { AuthRequest } from "@middleware/auth";
import { AppError } from "@middleware/errorHandler";

export interface RestaurantRequest extends AuthRequest {
  restaurantId?: string;
  restaurant?: {
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    cuisineType: string | null;
  };
}

export async function validateRestaurantOwnership(
  req: RestaurantRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.user) {
      throw new AppError(401, "Unauthorized");
    }

    const restaurantId = req.params.restaurantId;

    if (!restaurantId) {
      throw new AppError(400, "Restaurant ID is required");
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: restaurantId,
        userId: req.user.id,
      },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        cuisineType: true,
      },
    });

    if (!restaurant) {
      throw new AppError(404, "Restaurant not found or access denied");
    }

    req.restaurantId = restaurant.id;
    req.restaurant = restaurant;

    next();
  } catch (error) {
    next(error);
  }
}
