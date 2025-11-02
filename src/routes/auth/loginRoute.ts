import express from "express";
import { loginController } from "../../controllers/loginControllers.js";

const router = express.Router();

router.get("/", loginController);

export default router;
