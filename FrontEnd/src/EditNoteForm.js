import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import DashboardApi from "./api/api";


function EditNoteForm() {
    const { currentEmployee } = useContext(UserContext);
    const { id } = useParams();
    const [note, setNote] = useState('');
    const history = useHistory();

    useEffect(function getCurrentNote() {
        async function getNote() {
            setNote(await DashboardApi.getNote(id));
        }
        getNote();
    }, [id]);

    const [formData, setFormData] = useState({
        content: ''
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let employee_id = currentEmployee.empId;
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
            setFormErrors(e);
            return;
        }
        
        setFormData(data => ({ ...data}));
        setFormErrors([]);
        setNote(updatedNote);
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