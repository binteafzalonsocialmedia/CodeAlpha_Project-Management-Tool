const Task = require("../models/taskModel");
const Project = require("../models/projectModel");





exports.createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            project,
            assignedTo,
            priority,
            deadline
        } = req.body;

        // 1. Find project
        const findProject = await Project.findById(project);
        console.log("everything going good here 1");
        if (!findProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        console.log("MEMBERS:", findProject.members);
        console.log("REQ.USER:", req.user);
        // 2. Check whether current user belongs to project
        // 2. Check whether current user is PROJECT OWNER
        const isOwner =
            findProject.owner.toString() === req.user.id.toString();

        console.log("PROJECT OWNER:", findProject.owner);
        console.log("CURRENT USER:", req.user.id);
        console.log("IS OWNER:", isOwner);

        if (!isOwner) {
            return res.status(403).json({
                message: "Only the project owner can create tasks"
            });
        }

        // 3. Check whether assigned user belongs to project
        const assignedMember = findProject.members.some(
            member => member.toString() === assignedTo.toString()
        );

        if (!assignedMember) {
            return res.status(400).json({
                message: "Assigned user is not a member of this project"
            });
        }
        // 4. Create task
        const newTask = await Task.create({
            title,
            description,
            project,
            assignedTo,
            createdBy: req.user.id,
            priority,
            deadline
        });
        console.log("task created 4")
        // 5. Return created task
        return res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};





//get 
exports.getProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.params;

        // 1. Find project
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // 2. Check whether user belongs to project
        const isMember = project.members.some(
            member => member.toString() === req.user.id.toString()
        );

        const isOwner =
            project.owner.toString() === req.user.id.toString();

        if (!isMember && !isOwner) {
            return res.status(403).json({
                message: "You are not a member of this project"
            });
        }

        // 3. Owner sees ALL tasks
        if (isOwner) {
            const tasks = await Task.find({
                project: projectId
            })
                .populate("assignedTo", "name email")
                .populate("createdBy", "name email")
                .sort({ createdAt: -1 });

            return res.status(200).json({
                message: "Tasks fetched successfully",
                tasks
            });
        }

        // 4. Member sees only assigned tasks
        const tasks = await Task.find({
            project: projectId,
            assignedTo: req.user.id
        })
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Tasks fetched successfully",
            tasks
        });

    } catch (err) {
        console.error("GET PROJECT TASKS ERROR:", err);

        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};
console.log("Task Controller is working");