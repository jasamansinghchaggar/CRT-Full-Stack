import { Router } from "express";
import { assignTask, createTask, getAllTasks, getTasksByUser, updateTaskStatus } from "../controllers/task.controller.js";
import { authentication, authorization } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/", authentication, authorization("admin"), createTask)
router.get("/", authentication, getTasksByUser)
router.get("/all-tasks", authentication, authorization("admin"), getAllTasks)
router.put("/assign-to", authentication, authorization("admin",""), assignTask)
router.put("/update-status", authentication, updateTaskStatus)
export default router