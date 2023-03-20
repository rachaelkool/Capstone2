import React, { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import DashboardApi from "../api/api";


function NewNoteForm({addNote, date}) {
    const { currentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        let newNote;
        let noteData = {
            date: date,
            content: formData.content,
            emp_id: currentEmployee.empId
        };
        addNote({...noteData, first_name: currentEmployee.firstName, last_name:currentEmployee.lastName})
        setFormData({})

        try {
            newNote = await DashboardApi.createNote(noteData);
        } catch (e) {
            return;
        }
        
        setFormData(data => ({ ...data }));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div>
            <div className='form'>
                <form className="ui form"onSubmit={handleSubmit}>
                <h3>Input Note</h3>
                <div  className="field">
                    <label htmlFor="content"></label>
                    <input
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                    />
                </div>
                <button>Add Note</button>
                </form>
            </div>
        </div>
    );
}


export default NewNoteForm;