import { Router } from 'express';
import { authMiddleware } from '@middleware/auth';
import { validateRestaurantOwnership } from '@middleware/restaurantOwnership';
import {
  createMenuItem,
  getMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '@controllers/menuItem';

const router = Router();

// All menu item routes require authentication and restaurant ownership
router.use('/:restaurantId', authMiddleware, validateRestaurantOwnership);

router.post('/:restaurantId/menu-items', createMenuItem);
router.get('/:restaurantId/menu-items', getMenuItems);
router.get('/:restaurantId/menu-items/:id', getMenuItem);
router.put('/:restaurantId/menu-items/:id', updateMenuItem);
router.delete('/:restaurantId/menu-items/:id', deleteMenuItem);

export default router;
