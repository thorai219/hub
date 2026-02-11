import { Router } from 'express';
import { authMiddleware } from '@middleware/auth';
import { validateRestaurantOwnership } from '@middleware/restaurantOwnership';
import {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "./recipe.controller";

const router = Router();

// All recipe routes require authentication and restaurant ownership
router.use('/:restaurantId', authMiddleware, validateRestaurantOwnership);

router.post('/:restaurantId/recipes', createRecipe);
router.get('/:restaurantId/recipes', getRecipes);
router.get('/:restaurantId/recipes/:id', getRecipe);
router.put('/:restaurantId/recipes/:id', updateRecipe);
router.delete('/:restaurantId/recipes/:id', deleteRecipe);

export default router;
