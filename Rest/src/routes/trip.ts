import { Router } from "express";
import { CREATE_ONE } from "../controllers/trip.controller";
import {
  isAdmin,
  isPhoneNumberVerified,
  verifyAccessToken,
} from "../middlewares/verification";

const router = Router();

router.post("/create-trip", verifyAccessToken, isAdmin, CREATE_ONE);

export default router;
