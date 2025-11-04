import express from "express";
import { loginController } from "../../controllers/loginControllers.js";
import { testHttp1LoginController } from "../../controllers/testController.js";

const router = express.Router();

router.post("/", loginController);

router.post("/test-http1-login", testHttp1LoginController);

export default router;
