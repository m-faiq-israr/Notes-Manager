import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NoteState from './context/notes/NoteState'
import NoteForm from './components/NoteForm'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'


function App() {

  return (
    <NoteState>

    <BrowserRouter>
    <Navbar/>
    <Routes>

      <Route exact path='/' element={<Home/>} />

      <Route exact path='/addnote' element={<NoteForm/>}/>

      <Route exact path='/signin' element={<SignIn/>}/>

      <Route exact path='/signup' element={<SignUp/>}/>



    </Routes>
  
    </BrowserRouter>
    </NoteState>
  )
}

export default App
