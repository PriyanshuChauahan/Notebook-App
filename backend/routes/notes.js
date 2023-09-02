const express=require('express');
const Notes=require('../models/Notes');
const {body,validationResult}=require('express-validator')
const fetchuser = require('../middleware/fetchuser');
const router=express.Router();

//Route 1:   Fetch all Post using : GET "/api/notes/fetchallnotes"   login Required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{

        const notes=await Notes.find({user:req.user.id});
        return  res.status(200).json({notes});
    }
    catch(error)
    {
        console.log(error.message);
        return  res.status(401).json({msg:"Internal Server Error"});
    }

})


//Route 2:   Add a new Note using:  POST "/api/notes/addnote"    login Required
router.post('/addnote',fetchuser,[
    // validating data
    body('title',"Enter a Valid Title").isLength({min:3}),
    body('description'," Description must be have atleast 5 characters").isLength({min:5}),
], async (req,res)=>{
    try{

    
    // they are errors, Return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return  res.status(400).json({ errors: errors.array() });
      
    }
    const {title,description,tag}=req.body;
    const notes=new Notes(
        {
            title,description,tag,
            user:req.user.id

        }
    )
    const savedNote=await notes.save();
   return  res.status(200).json({msg:"Note is saved Successfully",note:savedNote});
    }
    catch(error)
    {
        console.log(error.message);
        return  res.status(401).json({msg:"Internal Server Error"});

    }

})

//Route 3:   Update a Existing Note using: Put  "/api/notes/updatenote"    login Required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
   
    try{

    
    const {title,description,tag}=req.body;
   const newNote={};
   // if title is present then update it
   if(title){newNote.title=title};
   if(description){newNote.description=description};
   if(tag){newNote.tag=tag};

   // find the note to be updated 
   let note=await Notes.findById(req.params.id);
   if(!note)
   {
    return res.status(404).send("Not Found");
   }
   if(note.user.toString()!==req.user.id)
   {
     return res.status(401).send("Not Allowed");
   }
   note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
   res.json({note});
}
catch(error)
{
    console.log(error.message);
        return  res.status(401).json({msg:"Internal Server Error"});
}


})
//Route 4:   Delete a Existing Note using: Delete  "/api/notes/deletenote"    login Required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try{

   // find the note to be deleted and delete it by checking that this note belongs to login user or not
   let note=await Notes.findById(req.params.id);
   if(!note)
   {
    return res.status(404).send("Not Found");
   }
   // alow deletion only if it belongs to notes
   if(note.user.toString()!==req.user.id)
   {
     return res.status(401).send("Not Allowed");
   }
   note=await Notes.findByIdAndDelete(req.params.id)
   res.json({msg:"Note have been successfully deleted",note:note});
}

   catch(error)
{
    console.log(error.message);
        return  res.status(401).json({msg:"Internal Server Error"});
}


})



module.exports=router;