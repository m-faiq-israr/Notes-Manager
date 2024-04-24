const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter')
const notesRouter = require('./routes/notesRouter')
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};


app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next();
})

app.use(cors(corsOptions));

app.use('/api/user',userRouter)
app.use('/api/notes',notesRouter)



mongoose
  .connect("mongodb://127.0.0.1:27017/notebook_app")
  .then(() => {
    app.listen("4000", () => {
      console.log("Connected to PORT 4000 and DB successfully");
    });
  })
  .catch((error) => {
    console.log(error);
  });