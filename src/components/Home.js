import React, { useState } from 'react';
import { AddProjectForm } from '../features/projects/AddProjectForm';
import { AddTodoForm } from '../features/todos/AddTodoForm';
import { AllTodos } from '../features/todos/AllTodos';
import { FilterTodos } from '../features/todos/FilterTodos';

export const Home = () => {
    const [filterType, setFilterType] = useState('newest');
    return (
        <div>
            <h1>Lifekeeper</h1>
            <AddProjectForm />
            <AddTodoForm existingProject={''}/>
            <FilterTodos filterType={filterType} setFilterType={setFilterType} />
            <AllTodos filterType={filterType} />
        </div>
    )
}
