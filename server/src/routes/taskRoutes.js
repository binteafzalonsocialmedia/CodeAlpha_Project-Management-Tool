const express = require("express");

const router = express.Router();

const {
    createTask, getProjectTasks
} = require("../controllers/taskController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, createTask);
console.log("TaskRoutes are also working");

router.get("/project/:projectId", authMiddleware, getProjectTasks);

module.exports = router;