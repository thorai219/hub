import { Router } from 'express';
import { authMiddleware } from '@middleware/auth';
import { validateRestaurantOwnership } from '@middleware/restaurantOwnership';
import {
  createInventoryCount,
  getInventoryCounts,
  getInventoryCount,
  getLatestInventory,
  updateInventoryCount,
  deleteInventoryCount,
} from "./inventoryCount.controller";

const router = Router();

// All inventory count routes require authentication and restaurant ownership
router.use('/:restaurantId', authMiddleware, validateRestaurantOwnership);

router.post('/:restaurantId/inventory', createInventoryCount);
router.get('/:restaurantId/inventory', getInventoryCounts);
router.get('/:restaurantId/inventory/latest', getLatestInventory);
router.get('/:restaurantId/inventory/:id', getInventoryCount);
router.put('/:restaurantId/inventory/:id', updateInventoryCount);
router.delete('/:restaurantId/inventory/:id', deleteInventoryCount);

export default router;
