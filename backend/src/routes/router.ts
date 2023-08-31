import express from "express";
import loginController from "../controllers/loginController";
import jwtFilter from "../filter/jwtFilter";
import settingsController from "../controllers/settingsController";
import userController from "../controllers/userController";
import todoController from "../controllers/todoController";

const router = express.Router();

router.post("/auth/login", loginController.login);
router.post("/createuser", userController.createUser);

router.use(jwtFilter.checkToken);

router.post("/todo/add", todoController.addTodo);
router.get("/todo/get", todoController.getTodos);
router.patch("/todo/update", todoController.updateTodo);

router.get("/user/settings", settingsController.getSettings);
router.patch("/settings/update", settingsController.updateSettings);

export default router;