const express = require('express');
const { requireSignin } = require('../controllers/auth');

const { notes ,allNote, signleNote, createMessage} = require('../controllers/notes');
const router = express.Router();


router.post("/notes", requireSignin, notes);
router.post("/contact", createMessage);

router.get("/notes", requireSignin, allNote);
router.get("/note/:noteId", requireSignin, signleNote);






module.exports = router;