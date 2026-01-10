import { Router } from 'express';
import { IngredientController } from '@controllers/ingredient';
import { authMiddleware } from '@middleware/auth';
import { validateRestaurantOwnership } from '@middleware/restaurantOwnership';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Validate restaurant ownership for all routes
router.use('/:restaurantId', validateRestaurantOwnership);

router.post('/:restaurantId/ingredients', IngredientController.create);
router.get('/:restaurantId/ingredients', IngredientController.getAll);
router.get('/:restaurantId/ingredients/:id', IngredientController.getOne);
router.put('/:restaurantId/ingredients/:id', IngredientController.update);
router.delete('/:restaurantId/ingredients/:id', IngredientController.delete);

export default router;
