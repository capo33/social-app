import { Router } from "express";

import * as UserController from "../controllers/UserController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", protect, UserController.getProfile);
router.put("/update-profile", protect, UserController.updateProfile);
router.put("/follow", protect, UserController.followUser);

export default router;
