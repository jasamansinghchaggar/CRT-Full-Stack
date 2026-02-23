import { Task } from "../models/task.model.js"

export const createTask = async (req, res) => {
    const { task, assignedTo, status, description } = req.body

    if (!task) {
        return res.status(400).json({
            message: "task name is required..."
        })
    }

    try {

        const newTask = await Task.create({
            task,
            description,
            status,
            assignedTo
        })

        res.status(201).json({
            message: "task created successfully...",
            task: newTask
        })

    } catch (error) {
        console.error("error while creating task: ", error)
        res.status(500).json({
            message: "internal server error..."
        })
    }
}

export const getTasksByUser = async (req, res) => {
    try {

        const tasks = await Task.find({ assignedTo: req.user._id })

        res.status(200).json({
            message: "tasks fetched successfully...",
            tasks
        })

    } catch (error) {
        console.error("error while fetching tasks: ", error)

        res.status(500).json({
            message: "internal server error..."
        })
    }
}

export const getAllTasks = async (req, res) => {
    try {

        const tasks = await Task.find().populate("assignedTo", "name email role")

        res.status(200).json({
            message: "tasks fetched successfully...",
            tasks
        })

    } catch (error) {
        console.error("error while fetching tasks: ", error)

        res.status(500).json({
            message: "internal server error..."
        })
    }
}

export const assignTask = async (req, res) => {
    const { taskId, assignedTo } = req.body

    console.log(taskId, assignedTo);

    if (!taskId || !assignedTo) {
        return res.status(400).json({
            message: "taskId and assignedTo are required..."
        })
    }

    try {

        const task = await Task.findById(taskId)

        if (!task) {
            return res.status(404).json({
                message: "task not found..."
            })
        }

        task.assignedTo = assignedTo
        await task.save()

        res.status(200).json({
            message: "task assigned successfully...",
            task
        })

    } catch (error) {
        console.error("error while assigning task: ", error)

        res.status(500).json({
            message: "internal server error..."
        })
    }
}

export const updateTaskStatus = async (req, res) => {
    const { taskId, status } = req.body

    if (!taskId || !status) {
        return res.status(400).json({
            message: "taskId and status are required..."
        })
    }

    if (!["pending", "in-progress", "completed"].includes(status)) {
        return res.status(400).json({
            message: "invalid status value..."
        })
    }

    try {

        const task = await Task.findById(taskId)

        if (!task) {
            return res.status(404).json({
                message: "task not found..."
            })
        }

        if (task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "you don't have permission to update the status of this task..."
            })
        }

        task.status = status
        await task.save()

        res.status(200).json({
            message: "task status updated successfully...",
            task
        })

    } catch (error) {
        console.error("error while updating task status: ", error)

        res.status(500).json({
            message: "internal server error..."
        })
    }
}