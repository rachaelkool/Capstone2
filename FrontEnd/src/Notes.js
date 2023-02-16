import React, { useState, useEffect } from "react";
import DashboardApi from "./api/api";


function Notes() {
    const [notes, setNotes] = useState('');

    useEffect(function getNotesForDashboard() {
        async function getNotes() {
            setNotes(await DashboardApi.getNotes());
        }
        getNotes();
    }, []);
    
    if (!notes) return null;

    return (
        <div>
            <div> 
                <h2>Notes</h2>
                {notes.map(note => (
                    <div key={note.id}>{note.id}- {note.content}</div>
                ))}
            </div>
        </div>
    );
}


export default Notes;