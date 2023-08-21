import { Router } from "express";

import {
  SIGNUP,
  SIGNIN,
  CREATEADMIN,
  GET_USER,
} from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/verification";

const router = Router();

router.post("/signup", SIGNUP);

router.post("/signin", SIGNIN);

router.post("/createadmin", CREATEADMIN);

router.get("/getuser", verifyAccessToken, GET_USER);

export default router;
