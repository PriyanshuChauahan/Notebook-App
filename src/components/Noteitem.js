
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { note,updateNote } = props;
  const context = useContext(noteContext);
  const {deleteNote}=context;
  

  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
          <div className="d-flex justify-content-between">
          <h5 className="card-title">{note.title}</h5>
          <div>
          <i className="fa-solid fa-trash-can mx-2"  style={{color: "#000000",}} onClick={()=>{deleteNote(note._id)}} />
          <i className="fa-regular fa-pen-to-square mx-2"
          onClick={()=>{updateNote(note)}}
          ></i>
          </div>
          </div>
          <p className="card-text">{note.description}</p>
          
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
