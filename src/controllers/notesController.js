const asyncHandler = require('express-async-handler');
const Note = require('../models/notesModel');

const getNotes = asyncHandler (async (req,res) => {
    const notes = await Note.find({user:loggedUser._id});
    res.json(notes)
})

const createNote = asyncHandler ( async(req,res) => {
    const {title, content, category} = req.body;

    if(!title || !content || !category){
        res.status(400);
        throw new Error("Please fill all the fields");
    }else{
        const notes = new  Note({user:loggedUser._id,title,content,category});
         const createdNotes = await notes.save()
        res.status(201).json(createdNotes)
    }
})
const getNoteById = asyncHandler(async (req,res) => {
    const note = await Note.findById(req.params.id)

    if(note){
        res.json(note)
    }else{
        res.status(404).json({message:"Note not found"})
    }
})
const updateNoteById = asyncHandler(async (req,res) => {
    const {title,content,category} = req.body
    const note = await Note.findById(req.params.id);

    if(note.user.toString() !== loggedUser._id.toString()){
      res.status(401);
      throw new Error("You cann't perform this action")
    }
    if(note){
        note.title=title;
        note.content=content;
        note.category= category;

        const updatedNote = await note.save();
        res.json(updatedNote)
    }else{
        res.status(401);
        throw new Error("Note not found");
    }

})
const deleteNoteById = asyncHandler(async(req,res) => {
    const note = await Note.findById(req.params.id)
    if (note.user.toString() !== loggedUser._id.toString()) {
      res.status(401);
      throw new Error("You cann't perform this action");
    }
    if(note){
        await note.remove();
        res.json({message:"Note removed"})
    }else{
         res.status(401);
         throw new Error("Note not found");
    }
   
})
module.exports = {getNotes,createNote,getNoteById,deleteNoteById,updateNoteById}