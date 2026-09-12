const express = require("express");
const router = express.Router();

const { Project, showProject, JoinProject } = require("../controllers/ProjectController");
const authMiddleware = require("../middlewares/authMiddleware");

console.log(typeof showProject);
console.log(typeof authMiddleware);

router.get("/createproject", authMiddleware, showProject);


router.post("/createproject", authMiddleware, Project);

router.post("/joinproject", authMiddleware, JoinProject);

module.exports = router;
console.log("projectRoutes file is working");