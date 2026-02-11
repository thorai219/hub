import { Response } from "express";
import { RestaurantRequest } from "@middleware/restaurantOwnership";
import { asyncHandler } from "@utils/asyncHandler";
import { AppError } from "@middleware/errorHandler";
import prisma from "@lib/prisma";
import {
  createSalesRecordSchema,
  updateSalesRecordSchema,
} from "./salesRecord.validations";
import { Decimal } from "decimal.js";

export const createSalesRecord = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const validatedData = createSalesRecordSchema.parse(req.body);
    const restaurantId = req.restaurantId!;

    // If menuItemId provided, validate it belongs to this restaurant
    if (validatedData.menuItemId) {
      const menuItem = await prisma.menuItem.findFirst({
        where: {
          id: validatedData.menuItemId,
          restaurantId,
        },
      });

      if (!menuItem) {
        throw new AppError(
          "Menu item not found or does not belong to this restaurant",
          404,
        );
      }
    }

    const salesRecord = await prisma.salesRecord.create({
      data: {
        menuItemId: validatedData.menuItemId,
        quantity: validatedData.quantity,
        totalPrice: new Decimal(validatedData.totalPrice),
        soldAt: validatedData.soldAt
          ? new Date(validatedData.soldAt)
          : new Date(),
        restaurantId,
      },
      include: {
        menuItem: {
          select: {
            id: true,
            name: true,
            sellingPrice: true,
            recipe: {
              select: {
                id: true,
                name: true,
                totalCost: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({ salesRecord });
  },
);

export const getSalesRecords = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const restaurantId = req.restaurantId!;
    const { startDate, endDate, menuItemId } = req.query;

    // Build where clause with optional filters
    const where: any = { restaurantId };

    if (startDate || endDate) {
      where.soldAt = {};
      if (startDate) {
        where.soldAt.gte = new Date(startDate as string);
      }
      if (endDate) {
        where.soldAt.lte = new Date(endDate as string);
      }
    }

    if (menuItemId) {
      where.menuItemId = menuItemId as string;
    }

    const salesRecords = await prisma.salesRecord.findMany({
      where,
      include: {
        menuItem: {
          select: {
            id: true,
            name: true,
            sellingPrice: true,
          },
        },
      },
      orderBy: { soldAt: "desc" },
    });

    res.json({ salesRecords });
  },
);

export const getSalesRecord = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const restaurantId = req.restaurantId!;

    const salesRecord = await prisma.salesRecord.findFirst({
      where: { id, restaurantId },
      include: {
        menuItem: {
          select: {
            id: true,
            name: true,
            sellingPrice: true,
            foodCostPercent: true,
            recipe: {
              select: {
                id: true,
                name: true,
                totalCost: true,
                servings: true,
              },
            },
          },
        },
      },
    });

    if (!salesRecord) {
      throw new AppError("Sales record not found", 404);
    }

    res.json({ salesRecord });
  },
);

export const updateSalesRecord = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const validatedData = updateSalesRecordSchema.parse(req.body);
    const restaurantId = req.restaurantId!;

    const salesRecord = await prisma.salesRecord.findFirst({
      where: { id, restaurantId },
    });

    if (!salesRecord) {
      throw new AppError("Sales record not found", 404);
    }

    // If updating menuItemId, validate it belongs to this restaurant
    if (validatedData.menuItemId) {
      const menuItem = await prisma.menuItem.findFirst({
        where: {
          id: validatedData.menuItemId,
          restaurantId,
        },
      });

      if (!menuItem) {
        throw new AppError(
          "Menu item not found or does not belong to this restaurant",
          404,
        );
      }
    }

    const updated = await prisma.salesRecord.update({
      where: { id },
      data: {
        menuItemId: validatedData.menuItemId,
        quantity: validatedData.quantity,
        totalPrice: validatedData.totalPrice
          ? new Decimal(validatedData.totalPrice)
          : undefined,
        soldAt: validatedData.soldAt
          ? new Date(validatedData.soldAt)
          : undefined,
      },
      include: {
        menuItem: {
          select: {
            id: true,
            name: true,
            sellingPrice: true,
            recipe: {
              select: {
                id: true,
                name: true,
                totalCost: true,
              },
            },
          },
        },
      },
    });

    res.json({ salesRecord: updated });
  },
);

export const deleteSalesRecord = asyncHandler(
  async (req: RestaurantRequest, res: Response) => {
    const { id } = req.params;
    const restaurantId = req.restaurantId!;

    const salesRecord = await prisma.salesRecord.findFirst({
      where: { id, restaurantId },
    });

    if (!salesRecord) {
      throw new AppError("Sales record not found", 404);
    }

    await prisma.salesRecord.delete({ where: { id } });

    res.json({ message: "Sales record deleted successfully" });
  },
);
