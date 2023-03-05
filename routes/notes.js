const express = require('express');
const { requireSignin } = require('../controllers/auth');

const { notes ,allNote, signleNote} = require('../controllers/notes');
const router = express.Router();


router.post("/notes", requireSignin, notes);
router.get("/notes", requireSignin, allNote);
router.get("/note/:noteId", requireSignin, signleNote);






module.exports = router;