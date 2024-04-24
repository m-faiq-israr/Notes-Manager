import React, { useContext } from 'react'
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import ContextValue from '../context/notes/NoteContext'

function NoteCard({note, setshowModal, updateNote}) {

  const context = useContext(ContextValue)
  const {deleteNote} = context

  const handleEdit = ()=>{
    setshowModal(true)
    updateNote(note)
  }


  return (
    <div className="flex flex-col bg-white border-2  shadow-md rounded-t-xl rounded-b-2xl  font-poppins ">
      <div className="p-4 md:p-5 text-left">
        <h3 className="text-xl font-bold text-gray-600">{note.title}</h3>
        <p className="mt-2 text-gray-500 font-medium">{note.description}</p>
        <p
          className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-indigo-600 "
          href="#"
        >
          {note.tag}
        </p>
      </div>
      <div className="bg-indigo-600 border-t rounded-b-2xl py-3 px-4 md:py-4 md:px-5 flex items-center justify-between">
        <span onClick={()=>{deleteNote(note._id)}}>

        <MdDelete
       
        style={{color:"white", }}
          
          className=" hover:cursor-pointer"
        />
        </span>
        <p className="mt-1 text-sm text-white font-medium">
          Last updated 5 mins ago
        </p>
        <span >
        <BiSolidEdit
          color="white"
          onClick={handleEdit}
          className=" hover:cursor-pointer"
          strokeWidth="2"
        />

        </span>
      </div>
    </div>
  );
}

export default NoteCard