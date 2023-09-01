import express from "express";
import loginController from "../controllers/loginController";
import jwtFilter from "../filter/jwtFilter";
import settingsController from "../controllers/settingsController";
import userController from "../controllers/userController";
import todoController from "../controllers/todoController";
import { confirmPasswordFilter, usernamePasswordFilter } from "../filter/loginFilter";
import todoFilter from "../filter/todoFilter";
import settingsFilter from "../filter/settingsFilter";

const router = express.Router();

router.post("/auth/login", usernamePasswordFilter, loginController.login);
router.post("/createuser", usernamePasswordFilter, confirmPasswordFilter, userController.createUser);

router.use(jwtFilter.checkToken);

router.post("/todo/add", todoFilter.addFilter, todoController.addTodo);
router.get("/todo/get", todoController.getTodos);
router.patch("/todo/update", todoFilter.updateFilter, todoController.updateTodo);

router.get("/user/settings", settingsController.getSettings);
router.patch("/settings/update", settingsFilter.updateFilter, settingsController.updateSettings);

export default router;