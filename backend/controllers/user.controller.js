import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user?._id,
            email: user?.email,
            role: user?.role,
            name: user?.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )
}

export const register = async (req, res) => {
    const { email, password, name, role } = req.body

    try {
        if (!email || !password || !name) {
            return res.status(400).json({ message: "missing credentials..." })
        }

        const ifExists = await User.findOne({ email }).select("+password")
        if (ifExists) return res.status(400).json({ message: "user already exists..." })

        const newUser = await User.create({ name, email, password, role })

        const userSafe = newUser.toObject()
        delete userSafe.password

        return res.status(201).json({
            token: generateToken(newUser),
            user: userSafe
        })
    } catch (error) {
        console.error("error while register: ", error)
        res.status(500).json({ message: "internal server error..." })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        if (!email || !password) {
            return res.status(400).json({
                message: "missing email or password"
            })
        }

        const userExists = await User.findOne({ email }).select("+password")

        if (!userExists) {
            return res.status(400).json({
                message: "user doesn't exists..."
            })
        }

        if (!await userExists.checkPassword(password)) {
            return res.status(400).json({
                message: "password incorrect..."
            })
        }

        const userSafe = userExists.toObject()
        delete userSafe.password

        return res.status(201).json({
            token: generateToken(userExists),
            user: userSafe
        })

    } catch (error) {
        console.error("error while login: ", error)

        res.status(500).json({
            message: "internal server error..."
        })
    }
}

export const profile = (req, res) => {
    return res.status(200).json({
        user: req.user
    })
}

export const adminProfile = (req, res) => {
    return res.status(200).json({
        user: req.user,
        secretInfo: "this is admin profile, only admin can access this info..."
    })
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("name")

        res.status(200).json({
            message: "users fetched successfully...",
            users
        })
    } catch (error) {
        console.error("error while fetching users: ", error)

        res.status(500).json({
            message: "internal server error..."
        })
    }
}

export const reportTo = async (req, res) => {
    const { userId, reportTo } = req.body

    try {
        if (!userId) {
            return res.status(400).json({
                message: "missing user id..."
            })
        }

        if (!reportTo) {
            return res.status(400).json({
                message: "missing report to id..."
            })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                message: "user doesn't exists..."
            })
        }

        user.reportingTo = reportTo
        await user.save()

        res.status(200).json({
            message: "user reported successfully...",
            user
        })

    } catch (error) {
        console.error("error while reporting user: ", error)

        res.status(500).json({
            message: "internal server error..."
        })
    }
}

export const getReportees = async (req, res) => {
    try {
        const reportees = await User.find({ reportingTo: req.user._id }).select("name email role")

        res.status(200).json({
            message: "reportees fetched successfully...",
            reportees
        })
    } catch (error) {
        console.error("error while fetching reportees: ", error)

        res.status(500).json({
            message: "internal server error..."
        })
    }
}