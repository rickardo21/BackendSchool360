import express from "express";
import { gradeController } from "../controllers/gradeController.js";

const router = express.Router();

router.get("/", gradeController);

export default router;
