import { Router } from "express";
import { CREATE_ONE } from "../controllers/booking.controller";
import {
  isPhoneNumberVerified,
  verifyAccessToken,
} from "../middlewares/verification";

const router = Router();

router.post(
  "/create-booking",
  verifyAccessToken,
  isPhoneNumberVerified,
  CREATE_ONE
);

export default router;
