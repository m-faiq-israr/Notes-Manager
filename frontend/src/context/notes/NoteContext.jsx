import { createContext } from "react";

//when the application gets bigger we have to pass the props down to every component manually to avoid this we use context api by which we can define the prop in it and can use it at any level of the component heirarchy 

const NoteContext = createContext();  //making the context

export default NoteContext;