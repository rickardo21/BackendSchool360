import express from "express";
import { lessonsController } from "../controllers/lessonsController.js";
const router = express.Router();
router.get("/", lessonsController);
export default router;
//# sourceMappingURL=lessonsRoute.js.map