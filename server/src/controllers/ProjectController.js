const JWT = require("jsonwebtoken");
const cookies = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");

const Project = require("../models/projectModel");
const token = require("../utils/generateToken");
const User = require("../models/userModel");

exports.showProject = async (req, res) => {
    res.render("Users/Dashboard")
};

exports.Project = async (req, res, next) => {

    try {

        const { projectname, projectdetails } = req.body;
        console.log(req.body);
        console.log("Done 2")

        console.log("user:", req.user);
        console.log("user._id:", req.user?._id);
        const NewProject = await Project.create({
            projectname,
            projectdetails,
            inviteCode: `${Math.floor(Math.random() * 10000).toString(36).padStart(4, "0")}-${Math.floor(Math.random() * 10000).toString(36).padStart(4, "0")}`,
            owner: req.user.id,
            members: [req.user.id]
        });
        console.log("Done 3")
        console.log("Done newProject:", NewProject)
        res.send(NewProject);
        console.log("Done 4")
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    console.log("Done 5")
};