import React, { useState, useContext } from "react";
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
        let newNote;
        let noteData = {
            date: date,
            content: formData.content,
            emp_id: currentEmployee.empId
        };
        addNote(noteData)
        setFormData({content:''})

        console.log(noteData);

        try {
            newNote = await DashboardApi.createNote(noteData);
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