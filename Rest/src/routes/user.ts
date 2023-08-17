import { Router } from "express";

import { SIGNUP, SIGNIN } from "../controllers/user.controller";

const router = Router();

router.post("/signup", SIGNUP);

router.post("/signin", SIGNIN);

export default router;
