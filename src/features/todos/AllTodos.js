import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTodoById, selectActiveTodos, selectCompletedTodos} from './todosSlice';
import { selectProjectById } from '../projects/projectsSlice';
import { sortingTodos } from '../../app/filterLogic';
import { formatDueDate } from '../../app/dateLogic';


const TodoTask = ({todoId}) => {
    const todo = useSelector(state => selectTodoById(state, todoId));
    const project = useSelector(state => selectProjectById(state, todo.project));

    return (
        <li key={todo.id}>
            <article>
                <h5>{todo.title}</h5>
                <p>Project: {project.title}</p>
                <p>Due {formatDueDate(todo.dueDate)}</p>
                <p>Priority: {todo.priority}</p>
                <ul>
                    <li><Link to={`/${todo.id}`}>View Todo</Link></li>
                    <li><Link to={`/editTodo/${todo.id}`}>Edit Todo</Link></li>
                </ul>
            </article>
        </li>
    )
};

export const AllTodos = ({filterType}) => {
    const activeTodos = useSelector(selectActiveTodos);
    const completedTodos = useSelector(selectCompletedTodos);

    sortingTodos(filterType, activeTodos, completedTodos);

    const activeTodoList = activeTodos.map(todo => <TodoTask key={todo.id} todoId={todo.id}/>);
    const completedTodoList = completedTodos.map(todo => <TodoTask key={todo.id} todoId={todo.id}/>);
    return (
        <section>
            <h2>All todos</h2>
            <section>
                <h3>Still Todo:</h3>
                <ul>
                    {activeTodos.length ? activeTodoList : <li>No active todos! Nice?</li>}
                </ul>
            </section>
            <section>
                <h3>Completed:</h3>
                <ul>
                    {completedTodos.length ? completedTodoList : <li>Nothing to see here...</li>}
                </ul>
            </section>
        </section>
    )
}
