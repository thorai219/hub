import { Response } from "express";
import { RestaurantRequest } from "@middleware/restaurantOwnership";
import { asyncHandler } from "@utils/asyncHandler";
import { AppError } from "@middleware/errorHandler";
import prisma from "@lib/prisma";
import { createRecipeSchema, updateRecipeSchema } from "./recipe.validations";
import { Decimal } from "decimal.js";

export const createRecipe = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const validatedData = createRecipeSchema.parse(req.body);
    const restaurantId = req.restaurantId!;

    // Validate all ingredients belong to this restaurant
    const ingredients = await prisma.ingredient.findMany({
      where: {
        id: { in: validatedData.ingredients.map((item) => item.ingredientId) },
        restaurantId,
      },
    });

    if (ingredients.length !== validatedData.ingredients.length) {
      throw new AppError(
        400,
        "One or more ingredients do not belong to this restaurant",
      );
    }

    // Create recipe with nested ingredients
    const recipe = await prisma.recipe.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        servings: validatedData.servings,
        totalCost: new Decimal(validatedData.totalCost),
        restaurantId,
        ingredients: {
          create: validatedData.ingredients.map((item) => ({
            ingredientId: item.ingredientId,
            quantity: new Decimal(item.quantity),
            cost: new Decimal(item.cost),
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: {
              select: {
                id: true,
                name: true,
                unit: true,
                category: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json(recipe);
  },
);

export const getRecipes = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const restaurantId = req.restaurantId!;

    const recipes = await prisma.recipe.findMany({
      where: { restaurantId },
      include: {
        ingredients: {
          include: {
            ingredient: {
              select: {
                id: true,
                name: true,
                unit: true,
                category: true,
              },
            },
          },
        },
        _count: {
          select: { menuItems: true },
        },
      },
      orderBy: { name: "asc" },
    });

    res.json(recipes);
  },
);

export const getRecipe = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const restaurantId = req.restaurantId!;

    const recipe = await prisma.recipe.findFirst({
      where: { id, restaurantId },
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
        menuItems: {
          select: {
            id: true,
            name: true,
            sellingPrice: true,
            isActive: true,
          },
        },
      },
    });

    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    res.json(recipe);
  },
);

export const updateRecipe = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const validatedData = updateRecipeSchema.parse(req.body);
    const restaurantId = req.restaurantId!;

    const recipe = await prisma.recipe.findFirst({
      where: { id, restaurantId },
    });

    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    const updated = await prisma.recipe.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        servings: validatedData.servings,
        totalCost: validatedData.totalCost
          ? new Decimal(validatedData.totalCost)
          : undefined,
      },
      include: {
        ingredients: {
          include: {
            ingredient: {
              select: {
                id: true,
                name: true,
                unit: true,
                category: true,
              },
            },
          },
        },
      },
    });

    res.json(updated);
  },
);

export const deleteRecipe = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const restaurantId = req.restaurantId!;

    const recipe = await prisma.recipe.findFirst({
      where: { id, restaurantId },
      include: {
        menuItems: { select: { id: true } },
      },
    });

    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    if (recipe.menuItems.length > 0) {
      throw new AppError(
        "Cannot delete recipe that is used by menu items",
        400,
      );
    }

    await prisma.recipe.delete({ where: { id } });

    res.json({ message: "Recipe deleted successfully" });
  },
);
