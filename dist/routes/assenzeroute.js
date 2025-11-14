import express from "express";
import { assenzeController } from "../controllers/aseenzeController.js";
const router = express.Router();
router.get("/", assenzeController);
export default router;
//# sourceMappingURL=assenzeRoute.js.map