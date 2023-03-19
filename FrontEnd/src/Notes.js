import React, { useState, useEffect, useContext } from "react";
import DashboardApi from "./api/api";
import NewNoteForm from "./NewNoteForm";
import { useLocation, Link } from "react-router-dom";
import UserContext from "./UserContext";


function Notes() {
    const { currentEmployee } = useContext(UserContext);
    const [notes, setNotes] = useState('');

    let data = useLocation();

    const addNote = (newNote) => {
        setNotes(notes => [...notes, newNote]);
    };

    const removeNote = async (note) => {
        await DashboardApi.deleteNote(note.id);
        setNotes(notes => notes.filter(n => n.content !== note.content));
    };

    useEffect(function getNotesForDashboard() {
        async function getNotes() {
            setNotes(await DashboardApi.getNotes());
        }
        getNotes();
    }, []);
    
    if (!notes) return null;

    let todaysNotes = notes.filter(note => note.date.includes(data.state.date))

    return (
        <div className="feature-container">
            <div> 
                <h2 lassName="feature-header">Notes from {data.state.date}</h2>
                <table className="ui celled table">
                <thead>
                        <tr>
                            <th>Name</th>
                            <th>Note</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {todaysNotes.map((note, index) => (
                        <tr key={index}>
                            <td>{note.first_name} {note.last_name}</td>
                            <td>{note.content}</td>
                            <td>
                                {currentEmployee && (currentEmployee.firstName === note.first_name && currentEmployee.lastName === note.last_name) ? 
                                <Link to={{pathname: `/notes/${note.id}`}}>
                                    <i className="edit icon"></i>
                                </Link> 
                                : ''}
                            </td>
                            <td>{currentEmployee && (currentEmployee.firstName === note.first_name && currentEmployee.lastName === note.last_name) ? <div onClick={() => removeNote(note)} className="delete-row"><i className="trash alternate icon"></i></div> : ''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <br></br>
            <div>
                <NewNoteForm date={data.state.date} addNote={addNote} setNotes={setNotes}/>
            </div>
        </div>
    );
}


export default Notes;