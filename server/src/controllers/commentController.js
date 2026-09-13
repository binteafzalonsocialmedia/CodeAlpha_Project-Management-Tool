const Comment = require("../models/commentModel");
const Task = require("../models/taskModel");
const Project = require("../models/projectModel");
const User = require("../models/userModel");


exports.createComment = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { text } = req.body;

        // 1. Check comment text
        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Comment cannot be empty"
            });
        }

        // 2. Find task
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // 3. Find project
        const project = await Project.findById(task.project);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // 4. Check whether user is owner
        const isOwner =
            project.owner.toString() === req.user.id.toString();

        // 5. Check whether user is assigned to this task
        const isAssigned =
            task.assignedTo.toString() === req.user.id.toString();

        // 6. Only owner or assigned member can comment
        if (!isOwner && !isAssigned) {
            return res.status(403).json({
                message: "You are not allowed to comment on this task"
            });
        }

        // 7. Create comment
        const comment = await Comment.create({
            task: taskId,
            user: req.user.id,
            text: text.trim()
        });

        // 8. Populate username before sending response
        await comment.populate("user", "username email");

        return res.status(201).json({
            message: "Comment added successfully",
            comment
        });

    } catch (err) {
        console.error("CREATE COMMENT ERROR:", err);

        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};




exports.getComments = async (req, res) => {
    try {
        const { taskId } = req.params;

        // 1. Find task
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // 2. Find project
        const project = await Project.findById(task.project);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // 3. Check permissions
        const isOwner =
            project.owner.toString() === req.user.id.toString();

        const isAssigned =
            task.assignedTo.toString() === req.user.id.toString();

        if (!isOwner && !isAssigned) {
            return res.status(403).json({
                message: "You are not allowed to view comments"
            });
        }

        // 4. Get comments
        const comments = await Comment.find({
            task: taskId
        })
            .populate("user", "username email")
            .sort({ createdAt: 1 });

        return res.status(200).json({
            message: "Comments fetched successfully",
            comments
        });

    } catch (err) {
        console.error("GET COMMENTS ERROR:", err);

        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};