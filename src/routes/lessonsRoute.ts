import express from "express";
import { lessonsController } from "../controllers/lessonsController.js";

const router = express.Router();

router.post("/", lessonsController);

export default router;
