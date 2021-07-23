import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectTodoById, selectActiveTodos, selectCompletedTodos} from './todosSlice';
import { formatDueDate } from '../../app/dateLogic';
import { sortingTodos } from '../../app/filterLogic';

let TodoItem = ({ todoId, projectId }) => {
    const todo = useSelector(state => selectTodoById(state, todoId));
    return (
        <li>
            <section>
                <h5>{todo.title}</h5>
                <p>Priority: {todo.priority}</p>
                <p>Due {formatDueDate(todo.dueDate)}</p>
                <Link to={`/projects/${projectId}/${todo.id}`}>View Todo</Link>
            </section>
        </li>
    )
};

export const TodoList = ({project, filterType}) => {
    const activeTodos = useSelector(selectActiveTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    
    sortingTodos(filterType, activeTodos, completedTodos);

    const activeTodosInProject = activeTodos.filter(todo => todo.project === project.id);
    const completedTodosInProject = completedTodos.filter(todo => todo.project === project.id);
    const activeTodoList = activeTodosInProject.map(todo => <TodoItem key={todo.id} todoId={todo.id} projectId={project.id}/>);
    const completedTodoList = completedTodosInProject.map(todo => <TodoItem key={todo.id} todoId={todo.id} projectId={project.id}/>);

    return (
        <section>
            <section>
                <h3>Still Todo:</h3>
                <ul>
                    {activeTodosInProject.length ? activeTodoList : <li>Is this project completed? Or do you need to add something?</li>}
                </ul>
            </section>
            <section>
                <h3>Completed:</h3>
                <ul>{completedTodosInProject.length ? completedTodoList : <li>Nothing to see here...</li>}</ul>
            </section>
        </section>
    )
}
