const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookies = require("cookie-parser");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


const db = require("./db/database");
const authController = require('./controllers/authController');
const authRoutes = require("./routes/authRoutes");
const token = require("./utils/generateToken");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/comment", commentRoutes);
app.use("/task", taskRoutes);
app.use("/auth", authRoutes);
app.use("/project", projectRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port `${PORT}`")
})