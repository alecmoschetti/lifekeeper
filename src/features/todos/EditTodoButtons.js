import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { todoUpdated, todoDeleted } from './todosSlice';

export const EditTodoButtons = ({todo}) => {
    const [completedStatus, setCompletedStatus] = useState(todo.completed);
    const [starredStatus, setStarredStatus] = useState(todo.starred);
    const dispatch = useDispatch();
    const history = useHistory();
    const completeTodo = e => {
        setCompletedStatus(e.target.checked);
        dispatch(todoUpdated({ id: todo.id, completed: e.target.checked}));
    };
    const deleteTodo = () => {
        dispatch(todoDeleted(todo.id));
        history.push('/');   
    };
    const starTodo = e => {
        setStarredStatus(e.target.checked);
        dispatch(todoUpdated({ id: todo.id, starred: e.target.checked}));
    }
    return (
        <ul>
            <li>
                <label htmlFor="todoCompletedToggle">Completed:</label>
                <input type="checkbox" name="todoCompletedToggle" id="todoCompletedToggle" checked={completedStatus} onChange={(e) => completeTodo(e)} />
            </li>
            <li><button onClick={deleteTodo}>Delete</button></li>
            <li>
                <label htmlFor="todoStarredToggle">Starred:</label>
                <input type="checkbox" name="todoStarredToggle" id="todoStarredToggle" checked={starredStatus} onChange={(e) => starTodo(e)} />
            </li>
        </ul>
    )
}
