const express = require("express");
const router = express.Router();

const { Registration, Login, showLogin, showRegistration, ForgotPassword, showForgotPassword, showResetPassword, ResetPassword } = require("../controllers/authController");

console.log(typeof Registeration);
console.log(typeof authMiddleware);

router.get("/registration", showRegistration);
router.get("/login", showLogin);
router.get("/forgotpassword", showForgotPassword);
router.get("/resetpassword/:resetToken", showResetPassword);
//router.get("/logout", authMiddleware, authController.Logout);

router.post("/registration", Registration);
router.post("/login", Login);
router.post("/forgotpassword", ForgotPassword);
router.post("/resetpassword/:resetToken", ResetPassword);
//router.post("/logout", authMiddleware, authController.Logout);

module.exports = router;
console.log("authRoutes file is working");

