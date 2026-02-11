import { Response } from 'express';
import prisma from '@lib/prisma';
import { RestaurantRequest } from '@middleware/restaurantOwnership';
import { AppError } from '@middleware/errorHandler';
import { asyncHandler } from '@utils/asyncHandler';
import {
  createPurchaseSchema,
  updatePurchaseSchema,
} from "./purchase.validations";

export class PurchaseController {
  // POST /restaurants/:restaurantId/purchases
  static create = asyncHandler(async (req: RestaurantRequest, res: Response): Promise<void> => {
    const validatedData = createPurchaseSchema.parse(req.body);

    // Verify all ingredients belong to this restaurant
    const ingredientIds = validatedData.items.map(item => item.ingredientId);
    const ingredients = await prisma.ingredient.findMany({
      where: {
        id: { in: ingredientIds },
        restaurantId: req.restaurantId,
      },
    });

    if (ingredients.length !== ingredientIds.length) {
      throw new AppError(400, 'One or more ingredients do not belong to this restaurant');
    }

    const purchase = await prisma.purchase.create({
      data: {
        supplier: validatedData.supplier,
        invoiceNo: validatedData.invoiceNo,
        totalAmount: validatedData.totalAmount,
        purchasedAt: validatedData.purchasedAt ? new Date(validatedData.purchasedAt) : undefined,
        notes: validatedData.notes,
        restaurantId: req.restaurantId!,
        items: {
          create: validatedData.items.map(item => ({
            ingredientId: item.ingredientId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            ingredient: {
              select: {
                id: true,
                name: true,
                unit: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({ purchase });
  });

  // GET /restaurants/:restaurantId/purchases
  static getAll = asyncHandler(async (req: RestaurantRequest, res: Response): Promise<void> => {
    const purchases = await prisma.purchase.findMany({
      where: { restaurantId: req.restaurantId },
      include: {
        items: {
          include: {
            ingredient: {
              select: {
                id: true,
                name: true,
                unit: true,
              },
            },
          },
        },
      },
      orderBy: { purchasedAt: 'desc' },
    });

    res.json({ purchases });
  });

  // GET /restaurants/:restaurantId/purchases/:id
  static getOne = asyncHandler(async (req: RestaurantRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    const purchase = await prisma.purchase.findFirst({
      where: {
        id,
        restaurantId: req.restaurantId,
      },
      include: {
        items: {
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

    if (!purchase) {
      throw new AppError(404, 'Purchase not found');
    }

    res.json({ purchase });
  });

  // PUT /restaurants/:restaurantId/purchases/:id
  static update = asyncHandler(async (req: RestaurantRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const validatedData = updatePurchaseSchema.parse(req.body);

    // Check purchase exists and belongs to this restaurant
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        id,
        restaurantId: req.restaurantId,
      },
    });

    if (!existingPurchase) {
      throw new AppError(404, 'Purchase not found');
    }

    const purchase = await prisma.purchase.update({
      where: { id },
      data: {
        supplier: validatedData.supplier,
        invoiceNo: validatedData.invoiceNo,
        totalAmount: validatedData.totalAmount,
        purchasedAt: validatedData.purchasedAt ? new Date(validatedData.purchasedAt) : undefined,
        notes: validatedData.notes,
      },
      include: {
        items: {
          include: {
            ingredient: {
              select: {
                id: true,
                name: true,
                unit: true,
              },
            },
          },
        },
      },
    });

    res.json({ purchase });
  });

  // DELETE /restaurants/:restaurantId/purchases/:id
  static delete = asyncHandler(async (req: RestaurantRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    // Check purchase exists and belongs to this restaurant
    const purchase = await prisma.purchase.findFirst({
      where: {
        id,
        restaurantId: req.restaurantId,
      },
    });

    if (!purchase) {
      throw new AppError(404, 'Purchase not found');
    }

    // Delete purchase (items will be cascade deleted)
    await prisma.purchase.delete({
      where: { id },
    });

    res.json({ message: 'Purchase deleted successfully' });
  });
}
