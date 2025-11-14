import express from "express";
import { getAllController } from "../controllers/getAllController.js";
const router = express.Router();
router.post("/", getAllController);
export default router;
//# sourceMappingURL=getAllRoute.js.map