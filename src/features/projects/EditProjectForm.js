import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { projectUpdated, selectProjectById } from './projectsSlice';

export const EditProjectForm = ({match}) => {
    const { projectId } = match.params;
    console.log(projectId);
    const project = useSelector(state => selectProjectById(state, projectId))
    const [title, setTitle] = useState(project.title);
    const onTitleChanged = e => setTitle(e.target.value);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSaveProjectClicked = () => {
        if (title) {
            dispatch(projectUpdated({id: projectId, title}));
            history.goBack();
        }
    };

    const onCancelClicked = () => {
        history.goBack();
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
                }} disabled={!title}>Save Project</button>
                <button type="button" onClick={onCancelClicked}>Cancel</button>
            </form>
        </section>
    )
}
