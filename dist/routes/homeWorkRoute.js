import express from "express";
import { homeWorkController } from "../controllers/homeWorkController.js";
const router = express.Router();
router.get("/", homeWorkController);
export default router;
//# sourceMappingURL=homeWorkRoute.js.map