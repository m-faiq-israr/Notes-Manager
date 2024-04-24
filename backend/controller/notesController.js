const express = require('express')
const Notes = require('../models/NotesModel')
const { body, validationResult } = require("express-validator");

//fetching notes
const fetchAllNotes = async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})   //here we are fetching all the notes of the user using the req.user which contains the token in which user id is stored of every user
        res.json({notes})
        
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
}

//adding notes
const addNotes = async (req, res) =>{
    try{
    const {title, description, tag} = req.body;

    //validating the entry of notes
     const errors = validationResult(req);
     if(errors.isEmpty()){
         const note = await Notes.create({title, description, tag, user:req.user.id});
         res.json(note);

     }
     if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
     }

    }catch(error){
        res.status(500).json({error:"Internal server error"});
    }

}

//updating an existing note
const updateNote = async (req, res) =>{
    try {
        const {title, description, tag}= req.body;

        //create a new note
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};


        //find the note to be updated
        let note = await Notes.findById(req.params.id);  //id provided in the endpoint
        if(!note){res.status(404).send("Not Found")};


        //checking if the user who is updating the note is same as one who created the note
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Not Allowed");
        }


        //updating the note
        if (note.user.toString() === req.user.id) {
            note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
            res.json({note})
        }
    
    } catch (error) {
        res.status(500).send("Internal server error occured");
    }
}


//delete note
const deleteNote = async (req, res)=>{
    try {
      //find the note to be deleted
      let note = await Notes.findById(req.params.id);
      if (!note) {
        res.status(404).send("Not found");
      }

      //checking the user who is deleting the note is the one who created it
      if (note.user.toString() !== req.user.id) {
        res.status(401).send("Not Allowed");
      }

      //deleting the note
      if (note.user.toString() === req.user.id) {
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ Success: "Note has been deleted" });
      }
    } catch (error) {
        res.status(500).send("Internal server error occured");
    }
    
}


module.exports = {fetchAllNotes, addNotes, updateNote, deleteNote}