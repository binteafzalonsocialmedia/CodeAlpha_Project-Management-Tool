const JWT = require("jsonwebtoken");
const cookies = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const nodemailer = require("nodemailer");

const User = require("../models/userModel");
const transporter = require("../utils/sendEmail");
const token = require("../utils/generateToken");

exports.showRegistration = async (req, res) => {
    res.render("shared/Registeration")
};

exports.showLogin = (req, res) => {
    res.render("shared/Login")
};

exports.showForgotPassword = (req, res) => {
    res.render("shared/ForgotPassword")
};

exports.showResetPassword = (req, res) => {
    res.render("shared/ResetPassword")
};

exports.Registration = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;
        console.log(req.body);
        const ExistingUser = await User.findOne({ email });

        if (ExistingUser) {
            return res.status(400).json("user already exist");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        console.log("USER CREATED:", user);

        console.log("nothing happens its working")
        // }
        // catch (err) {
        //     res.json("message:", err.message)
        // };

        // try {
        const info = await transporter.sendMail({

            from: process.env.EMAIL_USER,
            to: email,
            subject: "WELCOME TO LMS",
            text: "Nodemailer is working successfully."
        });

        console.log("Email sent!");
        return res.json({ user })
        // console.log(info.response);
        // console.log(info.messageId);
    } catch (err) {
        console.log("error is in email sending");
        console.log(err)
    };
}





exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log("USER:", user);
        console.log("USER PASSWORD:", user?.password);

        if (!user) {
            return res.status(400).json({ user: user, Message: "User don't exist , please register first" })
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(400).json({ Message: "Incorrect Password" })
        };

        token(user._id, res);

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });

    };
    console.log("Login successfull");

};



//forgotpassword

exports.ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        console.log("entered user:", user)
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Generate raw token
        console.log(crypto);
        console.log(typeof crypto.randomBytes);
        const resetToken = crypto.randomBytes(32).toString("hex");
        console.log(crypto);
        console.log(typeof crypto.randomBytes);
        console.log("reset token:", resetToken);
        // Hash token before storing in DB
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Save hashed token and expiry
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();
        console.log("Done 1:", user)
        // Create link with RAW token
        const resetLink =
            `http://localhost:5173/auth/resetpassword/${resetToken}`;

        // Gmail transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        console.log("Done 2")
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Reset Your Password",
            html: ` <div>
                <h2>Password Reset</h2>
                <p>Click the link below:</p>
                <a href="${resetLink}">${resetLink}</a>
            </div>`
        });

        res.send("Reset link sent to your email.");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};

//reset
exports.ResetPassword = async (req, res) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;
        console.log("DONE 3a")

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        console.log("DONE 3b")

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        console.log("DONE 4")
        console.log("TOKEN FROM URL:", resetToken);
        console.log("USER FOUND:", user);
        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("DONE 5")
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        console.log("DONE 6")
        await user.save();
        console.log("DONE 7")
        return res.status(200).json({
            message: "Password reset successfully"
        });
        console.log("DONE 8")
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};



//getloggedin user 
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
};