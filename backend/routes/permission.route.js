import { Router } from "express"
import { changeRole } from "../controllers/permissions.controller.js"
import { authentication } from "../middlewares/auth.middleware.js"

const router = Router()

router.put("/change-role", authentication, changeRole)

export default router