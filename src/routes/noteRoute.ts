import express from "express";
import { noteController } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", noteController);

export default router;
