import { Response } from "express";
import { RestaurantRequest } from "@middleware/restaurantOwnership";
import { asyncHandler } from "@utils/asyncHandler";
import { AppError } from "@middleware/errorHandler";
import prisma from "@lib/prisma";
import {
  createMenuItemSchema,
  updateMenuItemSchema,
} from "./menuItem.validations";
import { Decimal } from "decimal.js";

export const createMenuItem = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const validatedData = createMenuItemSchema.parse(req.body);
    const restaurantId = req.restaurantId!;

    // Validate recipe belongs to this restaurant
    const recipe = await prisma.recipe.findFirst({
      where: {
        id: validatedData.recipeId,
        restaurantId,
      },
    });

    if (!recipe) {
      throw new AppError(
        404,
        "Recipe not found or does not belong to this restaurant",
      );
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        recipeId: validatedData.recipeId,
        sellingPrice: new Decimal(validatedData.sellingPrice),
        foodCostPercent: new Decimal(validatedData.foodCostPercent),
        isActive: validatedData.isActive,
        restaurantId,
      },
      include: {
        recipe: {
          select: {
            id: true,
            name: true,
            totalCost: true,
            servings: true,
          },
        },
      },
    });

    res.status(201).json(menuItem);
  },
);

export const getMenuItems = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const restaurantId = req.restaurantId!;

    const menuItems = await prisma.menuItem.findMany({
      where: { restaurantId },
      include: {
        recipe: {
          select: {
            id: true,
            name: true,
            totalCost: true,
            servings: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    res.json(menuItems);
  },
);

export const getMenuItem = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const restaurantId = req.restaurantId!;

    const menuItem = await prisma.menuItem.findFirst({
      where: { id, restaurantId },
      include: {
        recipe: {
          include: {
            ingredients: {
              include: {
                ingredient: {
                  select: {
                    id: true,
                    name: true,
                    unit: true,
                    pricePerUnit: true,
                    category: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!menuItem) {
      throw new AppError(404, "Menu item not found");
    }

    res.json(menuItem);
  },
);

export const updateMenuItem = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const validatedData = updateMenuItemSchema.parse(req.body);
    const restaurantId = req.restaurantId!;

    const menuItem = await prisma.menuItem.findFirst({
      where: { id, restaurantId },
    });

    if (!menuItem) {
      throw new AppError(404, "Menu item not found");
    }

    // If updating recipe, validate it belongs to this restaurant
    if (validatedData.recipeId) {
      const recipe = await prisma.recipe.findFirst({
        where: {
          id: validatedData.recipeId,
          restaurantId,
        },
      });

      if (!recipe) {
        throw new AppError(
          404,
          "Recipe not found or does not belong to this restaurant",
        );
      }
    }

    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        recipeId: validatedData.recipeId,
        sellingPrice: validatedData.sellingPrice
          ? new Decimal(validatedData.sellingPrice)
          : undefined,
        foodCostPercent: validatedData.foodCostPercent
          ? new Decimal(validatedData.foodCostPercent)
          : undefined,
        isActive: validatedData.isActive,
      },
      include: {
        recipe: {
          select: {
            id: true,
            name: true,
            totalCost: true,
            servings: true,
          },
        },
      },
    });

    res.json(updated);
  },
);

export const deleteMenuItem = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const restaurantId = req.restaurantId!;

    const menuItem = await prisma.menuItem.findFirst({
      where: { id, restaurantId },
    });

    if (!menuItem) {
      throw new AppError(404, "Menu item not found");
    }

    await prisma.menuItem.delete({ where: { id } });

    res.json({ message: "Menu item deleted successfully" });
  },
);
