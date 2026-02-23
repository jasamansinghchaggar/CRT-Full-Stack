import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import { dbConnection } from "./configs/db.js"
import userRouter from "./routes/user.route.js"
import taskRouter from "./routes/task.route.js"

dotenv.config({
    quiet: true
})
const app = express()

// const variables
const PORT = process.env.PORT || "http://localhost:8080"

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173"
}))

// health routes
app.get("/health", (req, res) => {
    res.json({
        message: "server is running..."
    })
})

// api routes
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)

dbConnection()
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})