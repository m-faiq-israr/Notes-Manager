const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const {fetchAllNotes, addNotes, updateNote, deleteNote} = require('../controller/notesController')
const {body, validationResult} = require('express-validator')
const router = express()

//get all notes
router.get('/fetchallnotes', fetchuser, fetchAllNotes)

//add note
router.post('/addnotes',fetchuser,[
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Description must be at least 5 characters').isLength({min:5})
], addNotes);

//update note
router.put('/updatenote/:id', fetchuser, updateNote);

//delete note
router.delete('/deletenote/:id', fetchuser, deleteNote);

module.exports = router;