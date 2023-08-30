import express from "express";
import loginController from "../controllers/loginController";
import jwtFilter from "../filter/jwtFilter";
import settingsController from "../controllers/settingsController";
import userController from "../controllers/userController";

const router = express.Router();

router.post("/auth/login", loginController.login);
router.post("/createuser", userController.createUser);

router.use(jwtFilter.checkToken);

router.get("/user/settings", settingsController.getSettings);

export default router;