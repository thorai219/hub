import { Router } from 'express';
import { PurchaseController } from "./purchase.controller";
import { authMiddleware } from '@middleware/auth';
import { validateRestaurantOwnership } from '@middleware/restaurantOwnership';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Validate restaurant ownership for all routes
router.use('/:restaurantId', validateRestaurantOwnership);

router.post('/:restaurantId/purchases', PurchaseController.create);
router.get('/:restaurantId/purchases', PurchaseController.getAll);
router.get('/:restaurantId/purchases/:id', PurchaseController.getOne);
router.put('/:restaurantId/purchases/:id', PurchaseController.update);
router.delete('/:restaurantId/purchases/:id', PurchaseController.delete);

export default router;
