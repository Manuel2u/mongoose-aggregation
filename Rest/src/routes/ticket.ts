import { Router } from "express";
import { CREATE_ONE } from "../controllers/ticket.controller";
import {
  isPhoneNumberVerified,
  verifyAccessToken,
} from "../middlewares/verification";

const router = Router();

router.post(
  "/create-ticket",
  verifyAccessToken,
  isPhoneNumberVerified,
  CREATE_ONE
);

export default router;
