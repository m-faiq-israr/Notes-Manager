import React,{useContext} from 'react'
import ContextValue from "../context/notes/NoteContext";

function UpdateModal({setshowModal, note, setnote}) {

    const context = useContext(ContextValue);
    const { editNote } = context;

    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }

    const handleUpdate = (e) =>{
        e.preventDefault();
        editNote(note.id, note.title,  note.description, note.tag)
        setshowModal(false)
    }
  return (
    <>
      <div className="fixed inset-0 bg-opacity-30 bg-black backdrop-blur-sm flex justify-center items-center">
        <div className="relative p-4 w-full max-w-md max-h-full ">
          <div class="relative bg-white rounded-lg  shadow-lg">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h1 className="text-2xl font-bold text-gray-700 ">
                Update the Note
              </h1>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={() => {
                  setshowModal(false);
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only ">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-md  font-bold text-gray-600 text-start"
                  >
                    Enter Title
                  </label>
                  <input
                    type="title"
                    name="title"
                    id="title"
                    value={note.title}
                    onChange={onChange}
                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg    w-full p-2.5 "
                    placeholder="Title"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="tag"
                    className="block mb-2 text-md  font-bold text-gray-600 text-start"
                  >
                    Enter Tag
                  </label>
                  <input
                    type="tag"
                    name="tag"
                    id="tag"
                    value={note.tag}
                    onChange={onChange}
                    placeholder="Tag"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="tag"
                    className="block mb-2 text-md  font-bold text-gray-600 text-start"
                  >
                    Enter Description
                  </label>
                  <textarea
                    type="description"
                    name="description"
                    id="description"
                    value={note.description}
                    onChange={onChange}
                    placeholder="Description"
                    className=" h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleUpdate}
                  className="w-full  text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateModal