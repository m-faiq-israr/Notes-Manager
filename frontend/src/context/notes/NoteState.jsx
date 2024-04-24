import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost:4000'
  
  const [notes, setnotes] = useState([]);


    const authToken = localStorage.getItem("token");

    //get all notes
    const getNotes = async () => {
      const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            authToken,
        },
      });
      const jsonResponse = await response.json()
      const notesArray = jsonResponse.notes;   //as in data structure of fetched data is like there is an object in which there is notes array in which all data is present so i have to fetch that notes array to pass it to setnotes bc .map works on array
      console.log(notesArray)
      setnotes(notesArray)
    };


  
  const deleteNote =async (id) => {
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            authToken,
        },
      });

      //deleting from the frontend
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setnotes(newNotes)

  };

//edit a note
  const editNote = async(id, title, description, tag) => {
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          authToken,
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    // logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);


  };

  return (
    <NoteContext.Provider value={{ notes, setnotes, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
