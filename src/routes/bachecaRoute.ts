import express from "express";
import { bachecaController } from "../controllers/bachecaController.js";

const router = express.Router();

router.get("/", bachecaController);

export default router;
