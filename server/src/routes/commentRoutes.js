const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getComments, createComment } = require("../controllers/commentController");

router.get("/:taskId/comments", authMiddleware, getComments);

router.post("/:taskId/comments", authMiddleware, createComment);

module.exports = router;
console.log("commentRoutes file is working");
