import express from "express"
import { adminProfile, getAllUsers, getReportees, login, profile, register, reportTo } from "../controllers/user.controller.js"
import { authentication, authorization } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/profile", authentication, profile)
router.get("/admin", authentication, authorization("admin"), adminProfile)
router.get("/all-users", authentication, authorization("admin", "manager", "team-lead"), getAllUsers)
router.put("/report-to", authentication, authorization("admin"), reportTo)
router.get("/reportees", authentication, getReportees)

export default router