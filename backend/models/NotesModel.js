const mongoose = require('mongoose')

const schema = mongoose.Schema

const NotesSchema = new schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,  
        ref:'user'    //this field will store the objectId of a document in user collection. This allows to establish relationship between documents in different collection.
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }


})

module.exports = mongoose.model('Notes', NotesSchema)