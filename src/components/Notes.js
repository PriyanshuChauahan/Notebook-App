import { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import {useNavigate} from "react-router-dom"







const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  let navigate=useNavigate();
  
 
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();

    }
    else
    {

      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    ref.current.click();
    

  };
  const onChange = (e) => {
    setNote({...note,[e.target.name]:e.target.value
  })

  };
  const updateNote = (currentNote) => {
    ref.current.click();
    const currNote={
      id:currentNote._id,
      etitle:currentNote.title,
      edescription:currentNote.description,
      etag:currentNote.tag
    }
    setNote(currNote);
  };
  const ref = useRef(null);

  return (
    <>
      <AddNote />

      <button
        hidden
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    value={note.etitle}
                    name="etitle"
                    type="text"
                    className="form-control"
                    id="etitle"
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                  value={note.edescription}
                    name="edescription"
                    type="text"
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                  value={note.etag}
                    name="etag"
                    type="text"
                    className="form-control"
                    id="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleSubmit} type="submit" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container" >
        {notes.length===0 && 'No Notes to Display'}</div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
