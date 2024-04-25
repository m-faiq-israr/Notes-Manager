import React, { useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import ContextValue from '../context/notes/NoteContext'

import NoteCard from '../components/NoteCard';
import UpdateModal from '../components/UpdateModal';


function Home() {
   const context = useContext(ContextValue);
   const {notes, getNotes} = context;

   const navigate = useNavigate();
   useEffect(() => {
     const authToken = localStorage.getItem("token");
     if (!authToken) {
       // If user is not logged in, redirect to sign-in screen
       navigate("/signin");
     } else {
       // If user is logged in, fetch notes
       getNotes();
      }
      
      

   }, [navigate,]);  // it means that whenever the user entity in the getNotes changes the page will be refereshed


   const [showModal, setshowModal] = useState(false)
   const [note, setnote] = useState({id:"", title:"", description:"", tag:""})
   


   const updateNote = (currentNote)=>{  //when clicked on edit button of particular note it shows the details of that note in note editing form
    setnote({id:currentNote._id, title:currentNote.title, tag:currentNote.tag, description:currentNote.description})
   
   }



 

  return (
    <div className="mt-16">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-600 md:mb-6 lg:text-3xl ">
        Your Notes
      </h1>
      <div className="  grid grid-cols-2 gap-4 w-full md:grid-cols-3 lg:grid-cols-4">
        {notes &&
          notes.map((note) => {
            return (
              <div className="pb-6 " key={note._id}>
                <NoteCard
                  key={note._id}
                  note={note}
                  setshowModal={setshowModal}
                  updateNote={updateNote}
                />
              </div>
            );
          })}
      </div>
      {showModal && (
        <UpdateModal
          setshowModal={setshowModal}
          note={note}
          setnote={setnote}
        />
      )}
    </div>
  );
}

export default Home