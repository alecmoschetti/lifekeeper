import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { todoUpdated, selectTodoById } from './todosSlice';
import { selectAllProjects } from '../projects/projectsSlice';

const priorities = ["very low", "low", "medium", "high", "very high"];
const priorityOptions = priorities.map((priority, index) => (
    <option key={priority} value={index + 1}>{priority}</option>
));

export const EditTodoForm = ({match}) => {
    const { todoId } = match.params;
    const todo = useSelector(state => selectTodoById(state, todoId));
    const projects = useSelector(selectAllProjects);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [project, setProject] = useState(todo.project);
    const [priority, setPriority] = useState(todo.priority);

    const onTitleChanged = e => setTitle(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);
    const onProjectChanged = e => setProject(e.target.value);
    const onPriorityChanged = e => setPriority(e.target.value);
    const onSaveTodoClicked = () => {
        if (title && description) {
            dispatch(todoUpdated({ id: todoId, title, description, project, priority}));
            history.goBack();
        }
    };
    const onCancelClicked = () => {
        history.goBack();
    };
    const projectOptions = projects.map(project => (
        <option key={project.id} value={project.id}>
            {project.title}
        </option>
    ));

    return (
        <section>
            <h2>Edit Todo</h2>
            <form>
                <label htmlFor="todoTitle">Todo Title:</label>
                <input type="text" id="todoTitle" name="todoTitle" value={title} onChange={onTitleChanged} />
                <label htmlFor="todoDescription">Todo Description:</label>
                <input type="text" id="todoDescription" name="todoDescription" value={description} onChange={onDescriptionChanged} />
                <label htmlFor="todoProject">Todo Project:</label>
                <select  id="todoProject" value={project} onChange={onProjectChanged}>
                    <option value=""></option>
                    {projectOptions}
                </select>
                <label>Todo Priority:</label>
                <select id="todoPriority" value={priority} onChange={onPriorityChanged}>
                    <option value=""></option>
                    {priorityOptions}
                </select>
            </form>
            <button type="button" onClick={onSaveTodoClicked}>Save Todo</button>
            <button type="button" onClick={onCancelClicked}>Cancel</button>
        </section>
    )
}
