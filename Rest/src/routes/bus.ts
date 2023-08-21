import { Router } from "express";
import { CREATE_ONE } from "../controllers/bus.controller";
import { isAdmin, verifyAccessToken } from "../middlewares/verification";

const router = Router();

router.post("/create-bus", verifyAccessToken, isAdmin, CREATE_ONE);

export default router;
