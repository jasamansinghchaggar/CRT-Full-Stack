import { Router } from "express"
import { changeRole } from "../controllers/permissions.controller"

const router = Router()

router.get("/change-role", changeRole)

export default router