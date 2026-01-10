import { Response } from "express";
import { RestaurantRequest } from "@middleware/restaurantOwnership";
import { asyncHandler } from "@utils/asyncHandler";
import { AppError } from "@middleware/errorHandler";
import prisma from "@lib/prisma";
import {
  createInventoryCountSchema,
  updateInventoryCountSchema,
} from "@/validation/inventoryCount";
import { Decimal } from "decimal.js";

export const createInventoryCount = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const validatedData = createInventoryCountSchema.parse(req.body);
    const restaurantId = req.restaurantId!;

    // Validate ingredient belongs to this restaurant
    const ingredient = await prisma.ingredient.findFirst({
      where: {
        id: validatedData.ingredientId,
        restaurantId,
      },
    });

    if (!ingredient) {
      throw new AppError(
        404,
        "Ingredient not found or does not belong to this restaurant",
      );
    }

    const inventoryCount = await prisma.inventoryCount.create({
      data: {
        ingredientId: validatedData.ingredientId,
        quantity: new Decimal(validatedData.quantity),
        value: new Decimal(validatedData.value),
        countedAt: validatedData.countedAt
          ? new Date(validatedData.countedAt)
          : new Date(),
        countedBy: validatedData.countedBy,
        notes: validatedData.notes,
        restaurantId,
      },
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
    });

    res.status(201).json(inventoryCount);
  },
);

export const getInventoryCounts = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const restaurantId = req.restaurantId!;
    const { startDate, endDate, ingredientId } = req.query;

    // Build where clause with optional filters
    const where: any = { restaurantId };

    if (startDate || endDate) {
      where.countedAt = {};
      if (startDate) {
        where.countedAt.gte = new Date(startDate as string);
      }
      if (endDate) {
        where.countedAt.lte = new Date(endDate as string);
      }
    }

    if (ingredientId) {
      where.ingredientId = ingredientId as string;
    }

    const inventoryCounts = await prisma.inventoryCount.findMany({
      where,
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
      orderBy: { countedAt: "desc" },
    });

    res.json(inventoryCounts);
  },
);

export const getInventoryCount = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const restaurantId = req.restaurantId!;

    const inventoryCount = await prisma.inventoryCount.findFirst({
      where: { id, restaurantId },
      include: {
        ingredient: {
          select: {
            id: true,
            name: true,
            unit: true,
            pricePerUnit: true,
            category: true,
            supplier: true,
          },
        },
      },
    });

    if (!inventoryCount) {
      throw new AppError(404, "Inventory count not found");
    }

    res.json(inventoryCount);
  },
);

export const getLatestInventory = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const restaurantId = req.restaurantId!;

    // Get the most recent count for each ingredient
    const latestCounts = await prisma.$queryRaw<any[]>`
    SELECT DISTINCT ON (ingredient_id) *
    FROM inventory_counts
    WHERE restaurant_id = ${restaurantId}
    ORDER BY ingredient_id, counted_at DESC
  `;

    // Enrich with ingredient details
    const ingredientIds = latestCounts.map((count) => count.ingredient_id);

    if (ingredientIds.length === 0) {
      return res.json([]);
    }

    const ingredients = await prisma.ingredient.findMany({
      where: { id: { in: ingredientIds } },
      select: {
        id: true,
        name: true,
        unit: true,
        pricePerUnit: true,
        category: true,
      },
    });

    const ingredientMap = new Map(ingredients.map((ing) => [ing.id, ing]));

    const enrichedCounts = latestCounts.map((count) => ({
      id: count.id,
      quantity: count.quantity,
      value: count.value,
      countedAt: count.counted_at,
      countedBy: count.counted_by,
      notes: count.notes,
      ingredientId: count.ingredient_id,
      ingredient: ingredientMap.get(count.ingredient_id),
    }));

    res.json(enrichedCounts);
  },
);

export const updateInventoryCount = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const validatedData = updateInventoryCountSchema.parse(req.body);
    const restaurantId = req.restaurantId!;

    const inventoryCount = await prisma.inventoryCount.findFirst({
      where: { id, restaurantId },
    });

    if (!inventoryCount) {
      throw new AppError(404, "Inventory count not found");
    }

    // If updating ingredientId, validate it belongs to this restaurant
    if (validatedData.ingredientId) {
      const ingredient = await prisma.ingredient.findFirst({
        where: {
          id: validatedData.ingredientId,
          restaurantId,
        },
      });

      if (!ingredient) {
        throw new AppError(
          404,
          "Ingredient not found or does not belong to this restaurant",
        );
      }
    }

    const updated = await prisma.inventoryCount.update({
      where: { id },
      data: {
        ingredientId: validatedData.ingredientId,
        quantity: validatedData.quantity
          ? new Decimal(validatedData.quantity)
          : undefined,
        value: validatedData.value
          ? new Decimal(validatedData.value)
          : undefined,
        countedAt: validatedData.countedAt
          ? new Date(validatedData.countedAt)
          : undefined,
        countedBy: validatedData.countedBy,
        notes: validatedData.notes,
      },
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
    });

    res.json(updated);
  },
);

export const deleteInventoryCount = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const restaurantId = req.restaurantId!;

    const inventoryCount = await prisma.inventoryCount.findFirst({
      where: { id, restaurantId },
    });

    if (!inventoryCount) {
      throw new AppError(404, "Inventory count not found");
    }

    await prisma.inventoryCount.delete({ where: { id } });

    res.json({ message: "Inventory count deleted successfully" });
  },
);
