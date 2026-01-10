import { Response } from 'express';
import prisma from '@lib/prisma';
import { RestaurantRequest } from '@middleware/restaurantOwnership';
import { AppError } from '@middleware/errorHandler';
import { asyncHandler } from '@utils/asyncHandler';
import { createIngredientSchema, updateIngredientSchema } from '@/validation/ingredient';

export class IngredientController {
  // POST /restaurants/:restaurantId/ingredients
  static create = asyncHandler(async (req: RestaurantRequest, res: Response): Promise<void> => {
    const validatedData = createIngredientSchema.parse(req.body);

    const ingredient = await prisma.ingredient.create({
      data: {
        ...validatedData,
        restaurantId: req.restaurantId!,
      },
    });

    res.status(201).json({ ingredient });
  });

  // GET /restaurants/:restaurantId/ingredients
  static getAll = asyncHandler(async (req: RestaurantRequest, res: Response): Promise<void> => {
    const ingredients = await prisma.ingredient.findMany({
      where: { restaurantId: req.restaurantId },
      orderBy: { name: 'asc' },
    });

    res.json({ ingredients });
  });

  // GET /restaurants/:restaurantId/ingredients/:id
  static getOne = asyncHandler(async (req: RestaurantRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    const ingredient = await prisma.ingredient.findFirst({
      where: {
        id,
        restaurantId: req.restaurantId,
      },
    });

    if (!ingredient) {
      throw new AppError(404, 'Ingredient not found');
    }

    res.json({ ingredient });
  });

  // PUT /restaurants/:restaurantId/ingredients/:id
  static update = asyncHandler(async (req: RestaurantRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const validatedData = updateIngredientSchema.parse(req.body);

    // Check ingredient exists and belongs to this restaurant
    const existingIngredient = await prisma.ingredient.findFirst({
      where: {
        id,
        restaurantId: req.restaurantId,
      },
    });

    if (!existingIngredient) {
      throw new AppError(404, 'Ingredient not found');
    }

    const ingredient = await prisma.ingredient.update({
      where: { id },
      data: validatedData,
    });

    res.json({ ingredient });
  });

  // DELETE /restaurants/:restaurantId/ingredients/:id
  static delete = asyncHandler(async (req: RestaurantRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    // Check ingredient exists and belongs to this restaurant
    const ingredient = await prisma.ingredient.findFirst({
      where: {
        id,
        restaurantId: req.restaurantId,
      },
    });

    if (!ingredient) {
      throw new AppError(404, 'Ingredient not found');
    }

    await prisma.ingredient.delete({
      where: { id },
    });

    res.json({ message: 'Ingredient deleted successfully' });
  });
}
