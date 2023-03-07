import React, { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function NewNoteForm({addNote, date}) {
    const { currentEmployee } = useContext(UserContext);

    const [formData, setFormData] = useState({
        content: ''
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let noteData = {
            date: date,
            content: formData.content,
            emp_id: currentEmployee.empId
        };
        addNote(noteData)
        setFormData({content:''})

        try {
            await DashboardApi.createNote(noteData);
        } catch (e) {
            setFormErrors(e);
        return;
        }
        
        setFormData(data => ({ ...data }));
        setFormErrors([]);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
        setFormErrors([]);
    }

    

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                <div>
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