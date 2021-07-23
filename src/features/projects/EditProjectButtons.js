import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { projectDeleted, projectUpdated } from './projectsSlice';
import { deletedProject } from '../todos/todosSlice';

export const EditProjectButtons = ({project}) => {
    const [completedStatus, setCompletedStatus] = useState(project.completed || false);
    const dispatch = useDispatch();
    const history = useHistory();
    const completeProject = e => {
        setCompletedStatus(e.target.checked);
        dispatch(projectUpdated({ id: project.id, completed: e.target.checked}));
    };
    const deleteProject = () => {
        dispatch(deletedProject(project.id));
        dispatch(projectDeleted(project.id));
        history.push('/projects');
    };
    return (
        <ul>
            <li>
                <label htmlFor="projectCompletedToggle">Completed:</label>
                <input type="checkbox" name="projectCompletedToggle" id="projectCompletedToggle" checked={completedStatus} onChange={(e) => completeProject(e)} />
            </li>
            <li><Link to={`/projects/editProject/${project.id}`}>Edit Title</Link></li>
            <li><button onClick={deleteProject}>Delete</button></li>
        </ul>
    )
}
