const express = require('express');
const { register, login, requireSignin, sendOtp, verifyOtp } = require('../controllers/auth');
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);




module.exports = router;