import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import DashboardApi from "../api/api";


function EditNoteForm() {
    const { currentEmployee } = useContext(UserContext);
    const { id } = useParams();
    const [note, setNote] = useState('');
    const history = useHistory();

    const [formData, setFormData] = useState({});

    useEffect(function getCurrentNote() {
        async function getNote() {
            let note = await DashboardApi.getNote(id)
            setNote(note);
            setFormData(note)
        }
        getNote();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        let updatedNote;
        let noteData = {
            date: note.date,
            content: formData.content || note.content,
            emp_id: currentEmployee.empId
        };

        try {
            updatedNote = await DashboardApi.updateNote(id, noteData);
            alert('updated')
            history.push("/");
        } catch (e) {
            return;
        }
        
        setFormData(data => ({ ...data}));
        setNote(updatedNote);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="feature-container">
            <h3>Input Note</h3>
            <div className="form">
                <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="content"></label>
                    <input
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder={note.content}
                    />
                </div>
                <button>Update</button>
                </form>
            </div>
        </div>
    );
}


export default EditNoteForm;