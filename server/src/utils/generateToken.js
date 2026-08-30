const JWT = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();
app.use(cookieParser());

const generateToken = (userId, res) => {

    const token = JWT.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    console.log("Token generated:", token);

    return token;

};
console.log("Token File Working");

module.exports = generateToken;