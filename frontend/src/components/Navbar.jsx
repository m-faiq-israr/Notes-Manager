import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const [isOpen, setisOpen] = useState(false)
  const dropdownRef = useRef(null);

  useEffect(()=>{  // for the drop down menu
    const handleClickOutside=(event)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setisOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return()=>{
      document.removeEventListener('mousedown', handleClickOutside)
    }

  },[dropdownRef])

  const handleItemClick = () =>{  //when clicked on the item of drop down menu close the drop down menu
    setisOpen(false)
  }

  const handleDropDownItem = () =>{
    handleLogout();
    handleItemClick();
  }

  


const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/signin');
  }


  let location = useLocation();  //this is for the navitem to be active when clicked on it
  useEffect(()=>{
    console.log(location.pathname);
  },[location]);

  return (
    <div className=" w-full absolute left-0 top-0 mx-auto max-w-screen-2xl px-4  md:px-8 border-b-1 shadow-md ">
      <header className=" flex items-center justify-between py-4  md:py-8 h-20 font-poppins">
        {/* logo - start */}
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
          aria-label="logo"
        >
          <svg
            width={95}
            height={94}
            viewBox="0 0 95 94"
            className="h-auto w-6 text-indigo-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M96 0V47L48 94H0V47L48 0H96Z" />
          </svg>
          Notes.App
        </Link>
        {/* logo - end */}
        {/* nav - start */}
        <nav className="hidden gap-12 lg:flex">
          <Link
            to="/"
            className={`text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 ${
              location.pathname === "/" ? "text-indigo-700" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/addnote"
            className={`text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 ${
              location.pathname === "/addnote" ? "text-indigo-700" : ""
            }`}
          >
            Add Note
          </Link>
        </nav>

        <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
          {!localStorage.getItem("token") ? (
            <Link
              to="/signin"
              className={`inline-block rounded-lg border bg-gray-100 border-gray-400 px-4 py-3  text-center text-sm font-semibold text-gray-600 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-600 hover:text-white focus-visible:ring  md:text-base ${
                location.pathname === "/signin" ? "bg-gray-600 text-white" : ""
              } `}
            >
              Sign in
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className={`inline-block rounded-lg border bg-gray-100 border-gray-400 px-4 py-3  text-center text-sm font-semibold text-gray-600 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-600 hover:text-white focus-visible:ring  md:text-base ${
                location.pathname === "/signin" ? "bg-gray-600 text-white" : ""
              } `}
            >
              Log out
            </button>
          )}
          <Link
            to="/signup"
            className={`  inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring md:text-base ${
              location.pathname === "/signup" ? "bg-indigo-700" : ""
            } `}
          >
            Sign up
          </Link>
        </div>
        <div ref={dropdownRef} className='lg:hidden'>
          <button
            type="button"
            onClick={() => setisOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Menu
          </button>
          {isOpen && (
            <div className="absolute right-0 z-10 mt-8 w-56 origin-top-right divide-y divide-gray-100 rounded-md lg:hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Link
                  to="/"
                  className={`  block px-4 py-2 text-sm hover:bg-gray-100  ${
                    !localStorage.getItem("token")
                      ? "pointer-events-none  text-gray-400"
                      : "text-gray-700"
                  } `}
                  onClick={handleItemClick}
                >
                  Home
                </Link>
                <Link
                  to="/addnote"
                  className={`  block px-4 py-2 text-sm hover:bg-gray-100  ${
                    !localStorage.getItem("token")
                      ? "pointer-events-none  text-gray-400"
                      : "text-gray-700"
                  } `}
                  onClick={handleItemClick}
                >
                  Add Notes
                </Link>
              </div>
              <div className="py-1">
                {localStorage.getItem("token") ? (
                  <Link
                    to="/signin"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleDropDownItem}
                  >
                    Log Out
                  </Link>
                ) : (
                  <Link
                    to="/signin"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleItemClick}
                  >
                    Sign In
                  </Link>
                )}

                <Link
                  to="/signup"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar