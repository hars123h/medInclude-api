const express = require('express');
const { register, login, sendOtp, verifyOtp, forgotPassword,resetPassword } = require('../controllers/auth');
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);




module.exports = router;