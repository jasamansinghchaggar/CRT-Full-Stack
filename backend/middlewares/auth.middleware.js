import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const authentication = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "authentication failed: token required..."
            })
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedToken) {
            return res.status(401).json({
                message: "authentication failed: token invalid..."
            })
        }

        const userId = decodedToken?.id

        const user = await User.findOne({
            _id: userId
        })

        req.user = user

        next()

    } catch (error) {
        res.status(500).json({
            message: "internal server error..."
        })
    }
}

export const authorization = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({
            message: "authorization failed: don't have permission..."
        })
    }

    next()
}