import { Router } from "express";
import { RestaurantController } from "./restaurant.controller";
import { authMiddleware } from "@middleware/auth";
import { validateRestaurantOwnership } from "@middleware/restaurantOwnership";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.post("/", RestaurantController.create);
router.get("/", RestaurantController.getAll);

// verify user owns restaurant
router.use("/:restaurantId", validateRestaurantOwnership);

router.get("/:restaurantId", RestaurantController.getOne);
router.put("/:restaurantId", RestaurantController.update);
router.delete("/:restaurantId", RestaurantController.delete);

export default router;
