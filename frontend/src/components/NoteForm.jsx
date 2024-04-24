import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import {useNavigate} from 'react-router-dom'

function NoteForm() {
  
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [tag, settag] = useState('')
  const [error, seterror] = useState(null)

  const navigate = useNavigate();  //for redirecting to home page on adding the note
  const routeChange = () =>{
    let path = '/'
    navigate(path);
  }


  //add a note
  const addNote = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("token");
    const values = {title, description, tag}
    const response = await fetch("http://localhost:4000/api/notes/addnotes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
      body: JSON.stringify(values),
    });
    
    const json = await response.json();
     console.log("Response status:", response.status);
     console.log("Auth token:", authToken);

    if(response.ok){
      settitle('')
      setdescription('')
      settag('')
      seterror(null)
      routeChange()
      console.log("note added");
    }

    if(!response.ok){
      seterror(json.error)
      console.log(error)
      console.log('hllooo')


    }

  };


 



  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12 ">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8 mt-6 font-poppins">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-600 md:mb-6 lg:text-3xl ">
            Add a Note
          </h2>

          <form onSubmit={addNote} className=" border-2 rounded-lg shadow-md px-6 py-6 mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2 text-left  ">
            <div className="sm:col-span-2 ">
              <label
                htmlFor="company"
                className="mb-2 inline-block  font-bold  text-gray-600 sm:text-base"
              >
                Title:
              </label>
              <input
                name="title"
                onChange={(e) => {
                  settitle(e.target.value);
                }}
                value={title}
                className="w-full rounded border-2 bg-gray-50 px-3 py-2 text-gray-600 font-medium outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="tag"
                className="mb-2 inline-block text-sm font-bold text-gray-600  sm:text-base"
              >
                Tag
              </label>
              <input
                name="tag"
                onChange={(e) => {
                  settag(e.target.value);
                }}
                value={tag}
                className="w-full rounded border-2 bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring "
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 inline-block text-sm font-bold text-gray-600 sm:text-base"
              >
                Description
              </label>
              <textarea
                name="description"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                value={description}
                className=" h-28 w-full rounded border-2 bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            
              />
            </div>
            <div className="sm:col-span-2">
              <button
                
                className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              >
                Add
              </button>
          
            </div>
          </form>
          {/* form - end */}
        </div>
      </div>
    </div>
  );
}

export default NoteForm