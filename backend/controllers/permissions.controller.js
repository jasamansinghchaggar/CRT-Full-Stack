import { User } from "../models/user.model.js"

const roleHeirarchy = {
    "admin": 4,
    "manager": 3,
    "team-lead": 2,
    "employee": 1
}

export const changeRole = async (req, res) => {
    const { userId, newRole } = req.body

    if (!userId || !newRole) {
        return res.status(400).json({
            message: "userId and newRole are required..."
        })
    }

    if (!["admin", "manager", "team-lead", "employee"].includes(newRole)) {
        return res.status(400).json({
            message: "invalid role provided..."
        })
    }

    const requesterRole = req.user.role

    if (requesterRole === "employee") {
        return res.status(403).json({
            message: "you do not have permission to change user roles..."
        })
    }

    if (roleHeirarchy[requesterRole] < roleHeirarchy[newRole]) {
        return res.status(403).json({
            message: "you do not have permission to change user roles to a higher hierarchy..."
        })
    }

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "user not found..."
            })
        }

        user.role = newRole
        await user.save()

        res.status(200).json({
            message: "user role updated successfully...",
            user
        })

    } catch (error) {
        console.error("error while changing user role: ", error)
        res.status(500).json({
            message: "internal server error..."
        })
    }
}