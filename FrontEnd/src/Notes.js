import React, { useState, useEffect } from "react";
import DashboardApi from "./api/api";
import NewNoteForm from "./NewNoteForm";
import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";


function Notes() {
    const [notes, setNotes] = useState('');

    let data = useLocation();

    console.log(data);

    const addNote = (newNote) => {
        setNotes(notes => [...notes, newNote]);
    };

    const removeNote = async (note) => {
        await DashboardApi.deleteNote(note.id);
        setNotes(notes => notes.filter(n => n.content !== note.content));
    };

    // const retrieveNote = async (note) => {
    //     await DashboardApi.getNote(note.id);
    // };

    useEffect(function getNotesForDashboard() {
        async function getNotes() {
            setNotes(await DashboardApi.getNotes());
        }
        getNotes();
    }, []);

    
    if (!notes) return null;

    //todo add filtering for notes === only to date

    let todaysNotes = notes.filter(note => note.date.includes(data.state.date))

    console.log(notes, todaysNotes)

    return (
        <div>
            <div> 
                <h2>Notes from {data.state.date}</h2>
                {notes.map((note, index) => (
                    <div key={index} className="notes_wrapper" style={{display:'flex'}}>
                        <div>{note.content}</div>
                        <button onClick={() => removeNote(note)} className="delete">x</button>
                        {/* <Link onClick={() => retrieveNote(note)} setNotes={setNotes} to="/notes/16">Edit</Link> */}
                    </div>
                ))}
            </div>
            <br></br>
            <div>
                <NewNoteForm date={data.state.date} addNote={addNote} setNotes={setNotes} notes={notes}/>
            </div>
        </div>
    );
}


export default Notes;