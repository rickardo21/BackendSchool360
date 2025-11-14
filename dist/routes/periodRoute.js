import express from "express";
import { periodController } from "../controllers/periodController.js";
const router = express.Router();
router.get("/", periodController);
export default router;
//# sourceMappingURL=periodRoute.js.map