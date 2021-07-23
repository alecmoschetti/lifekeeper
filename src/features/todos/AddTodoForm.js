import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { lightFormat, parseISO } from 'date-fns';
import { todoAdded } from './todosSlice';
import { selectAllProjects } from '../projects/projectsSlice';

const priorities = ["very low", "low", "medium", "high", "very high"];
const priorityOptions = priorities.map((priority, index) => (
    <option key={priority} value={index + 1}>{priority}</option>
));

export const AddTodoForm = ({existingProject}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProject] = useState(existingProject || '');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(lightFormat(new Date(), 'yyyy-MM-dd'));

    const projects = useSelector(selectAllProjects);
    const dispatch = useDispatch();

    const onTitleChanged = e => setTitle(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onProjectChanged = e => setProject(e.target.value);
    const onPriorityChanged = e => setPriority(e.target.value);
    const onDueDateChanged = e => parseISO(e.target.value) ? setDueDate(e.target.value) :console.log('Please pick a valid due date');

    const canSave = [title, description, project, priority, dueDate].every(Boolean);

    const projectOptions = projects.map(project => (
        <option key={project.id} value={project.id}>
            {project.title}
        </option>
    ));

    const onSaveTodoClicked = () => {
        if (canSave) {
            const date = new Date().toISOString();
            const id = nanoid();
            const completed = false;
            const starred = false;
            dispatch(todoAdded({id, title, description, project, priority, date, completed, starred, dueDate}));
            setTitle('');
            setDescription('');
            setProject('');
            setPriority('');
        }
    };

    return (
        <section>
            <h2>Add A New To-do:</h2>
            <form>
                <label htmlFor="todoTitle">To-do Title:</label>
                <input type="text" id="todoTitle" name="todoTitle" value={title} onChange={onTitleChanged} />
                <label htmlFor="todoDescription">To-do Description:</label>
                <input type="text" id="todoDescription" name="todoDescription" value={description} onChange={onDescriptionChanged} />
                <label htmlFor="todoProject">To-do Project:</label>
                <select  id="todoProject" value={project} onChange={onProjectChanged}>
                    <option value=""></option>
                    {projectOptions}
                </select>
                <label>To-do priority:</label>
                <select id="todoPriority" value={priority} onChange={onPriorityChanged}>
                <option value=""></option>
                    {priorityOptions}
                </select>
                <label htmlFor="dueDate">Due date:</label>
                <input type="date" name="dueDate" id="dueDate" value={dueDate} onChange={onDueDateChanged}/>
                <button type="button" disabled={!canSave} onClick={onSaveTodoClicked}>Save To-do</button>
            </form>
        </section>
    )
}
