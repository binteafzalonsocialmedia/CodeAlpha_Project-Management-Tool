const JWT = require("jsonwebtoken");
const cookies = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");

const Project = require("../models/projectModel");
const token = require("../utils/generateToken");
const User = require("../models/userModel");

exports.showProject = async (req, res) => {
    try {
        console.log("USER ID:", req.user.id);

        const projects = await Project.find({
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        })
            .populate("owner", "username email")
            .populate("members", "username email");

        console.log("PROJECTS:", projects);

        return res.status(200).json(projects);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
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

        console.log("Done newProject:", NewProject)
        res.send(NewProject);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

//join project 
exports.JoinProject = async (req, res, next) => {
    try {
        const { inviteCode } = req.body;
        console.log("inviteCode:", inviteCode)
        const findProject = await Project.findOne({ inviteCode });
        console.log(findProject, "1");
        if (!findProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const isMatched = findProject.members.some(
            member => member.toString() === req.user.id.toString()
        );
        console.log(isMatched);
        if (isMatched) {
            return res.status(400).json({
                message: "Already a member"
            });
        }

        findProject.members.push(req.user.id);

        await findProject.save();
        console.log(findProject);
        return res.status(200).json({
            message: "Joined successfully",
            project: findProject
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};
