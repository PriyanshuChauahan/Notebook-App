import { useState } from "react";
import NoteContext from "./noteContext";
import { useContext } from "react"
import alertContext from "../alert/alertContext";



const NoteState = (props) => {
  const acontext = useContext(alertContext);
  const { showAlert } = acontext;
  const host = "http://localhost:5000";
  const token =localStorage.getItem("token");
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const fetching = async (url, method, data) => {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "*/*",
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json;
  };
  // getting all notes
  const getNotes=async ()=>{
    // api call
    const url=`${host}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "auth-token": token,
        "Content-Type": "application/json",
      },
      
    });
    const res=await response.json();
    console.log(res);
    setNotes(res.notes);
    showAlert("Your notes Successfully displayed","success");


  }
  // add a note
  // const addNote=(note)=>{
  const addNote = async (title, description, tag) => {
    // to do api call
    const url = `${host}/api/notes/addnote`;
    const data = { title, description, tag };
    const res = await fetching(url, "POST", data);
    console.log(res);

    // console.log("Adding a note", note)
    const note = res.note;
    showAlert("Your note Successfully added","success");

    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    // to do api call
    const url = `${host}/api/notes/deletenote/${id}`;

    const res = await fetching(url, "DELETE", {});
    console.log(res);
    console.log("Deleting The Note With id", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    showAlert("Your notes Successfully deleted","success");
    setNotes(newNotes);
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // api call
    const url = `${host}/api/notes/updatenote/${id}`;
    const data = { title, description, tag };
    const res = await fetching(url, "PUT", data);
    console.log(res);
    
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      let element = newNotes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    showAlert("Your notes Successfully Updated","success");
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
