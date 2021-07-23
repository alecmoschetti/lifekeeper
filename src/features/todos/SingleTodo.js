import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectTodoById } from './todosSlice';
import { EditTodoButtons } from './EditTodoButtons';
import { formatDueDate } from '../../app/dateLogic';

export const SingleTodo = ({ match }) => {
    const { todoId, projectId } = match.params;
    const link = projectId ? `/projects/${projectId}` : '/' ;
    const todo = useSelector(state => selectTodoById(state, todoId));
    return (
        <section>
            <h3>{todo.title}</h3>
            <aside>
                <h6><Link to={link}>Go back to project</Link></h6>
            </aside>
            <div>
                <p>Description: {todo.description}</p>
                <p>Priority: {todo.priority}</p>
                <p>Due {formatDueDate(todo.dueDate)}</p>
                <p>Todo starred: {todo.starred ? 'starred' : 'not starred'}</p>
                <p>Todo completed: {todo.completed ? 'yep' : 'not yet'}</p>
                <EditTodoButtons todo={todo} />
            </div>
            <div>
                <Link to={`/editTodo/${todo.id}`}>Edit Todo</Link>
            </div>
        </section>
    )
}
