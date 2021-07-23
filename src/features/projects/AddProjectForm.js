import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { projectAdded } from './projectsSlice';

export const AddProjectForm = () => {
    const [title, setTitle] = useState('');
    const onTitleChanged = e => setTitle(e.target.value);
    const dispatch = useDispatch();
    const canSave = Boolean(title);

    const onSaveProjectClicked = () => {
        if (canSave) {
            const id = nanoid();
            dispatch(projectAdded({id, title, completed: false}));
            setTitle('');
        }
    };
    
    return (
        <section>
            <h2>Add a New Project:</h2>
            <form onSubmit={e => {
                    onSaveProjectClicked();
                    e.preventDefault();
            }}>
                <label htmlFor="projectTitleCreation">New Project Title:</label>
                <input type="text" id="projectTitleCreation" name="projectTitleCreation" value={title} onChange={onTitleChanged} />
                <button type="button" onClick={e => {
                    onSaveProjectClicked();
                    e.preventDefault();
                }} disabled={!canSave}>Save Project</button>
            </form>
        </section>
    )
}
