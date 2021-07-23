import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { selectProjectById } from './projectsSlice';
import { TodoList } from '../todos/TodoList';
import { AddTodoForm } from '../todos/AddTodoForm';
import { FilterTodos } from '../todos/FilterTodos';
import { EditProjectButtons } from './EditProjectButtons';

export const SingleProjectPage = ({ match }) => {
    const { projectId } = match.params;
    const project = useSelector(state => selectProjectById(state, projectId));
    const [filterType, setFilterType] = useState('newest');

    if (!project) {
        return (
            <section>
                <h2>Project not found!</h2>
            </section>
        )
    }
    return (
        <section>
            <section>
                <h2>{project.title}</h2>
                <EditProjectButtons project={project}/>
            </section>
            <AddTodoForm existingProject={project.title}/>
            <FilterTodos filterType={filterType} setFilterType={setFilterType} />
            <TodoList project={project} filterType={filterType} />
        </section>
    )
}