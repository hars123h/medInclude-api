const express = require('express');
const { register, login, requireSignin } = require('../controllers/auth');
const router = express.Router();


router.post("/register", register);
router.post("/login", login);



module.exports = router;