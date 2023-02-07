const express = require('express');
const { requireSignin } = require('../controllers/auth');
const { notes ,allNote} = require('../controllers/notes');
const router = express.Router();


router.post("/notes", requireSignin, notes);
router.get("/notes", requireSignin, allNote);





module.exports = router;