import { Router } from 'express';
import { authMiddleware } from '@middleware/auth';
import { validateRestaurantOwnership } from '@middleware/restaurantOwnership';
import {
  createSalesRecord,
  getSalesRecords,
  getSalesRecord,
  updateSalesRecord,
  deleteSalesRecord,
} from "./salesRecord.controller";

const router = Router();

// All sales record routes require authentication and restaurant ownership
router.use('/:restaurantId', authMiddleware, validateRestaurantOwnership);

router.post('/:restaurantId/sales', createSalesRecord);
router.get('/:restaurantId/sales', getSalesRecords);
router.get('/:restaurantId/sales/:id', getSalesRecord);
router.put('/:restaurantId/sales/:id', updateSalesRecord);
router.delete('/:restaurantId/sales/:id', deleteSalesRecord);

export default router;
