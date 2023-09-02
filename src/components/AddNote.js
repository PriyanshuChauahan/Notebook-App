import React from "react";
import { useContext,useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note,setNote]=useState({title:"",description:"",tag:""})
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag)
    setNote({title:"",description:"",tag:""});

  };
  const onChange = (e) => {
    setNote({...note,[e.target.name]:e.target.value
  })

  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="title"
              onChange={onChange}
              required
              minLength={5}
value={note.title}
              
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              name="description"
              type="text"
              className="form-control"
              id="description"
              onChange={onChange}
              required
              minLength={5}
value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              name="tag"
              type="text"
              className="form-control"
              id="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            // onSubmit={handleSubmit}
            onClick={handleSubmit}
            disabled={note.title.length<5 || note.description.length<5}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
