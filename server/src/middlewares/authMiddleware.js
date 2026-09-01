const cookies = require("cookie-parser");
const JWT = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json("Login to continue");
        }

        const data = JWT.verify(token, process.env.JWT_SECRET)
        if (!data) {
            return res.status(401).json("Login to continue");
        }
        req.user = data;
    } catch (err) {
        console.log("err message:", err.message)
    };
    next();

};
module.exports = authMiddleware;