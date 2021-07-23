import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import projectsReducer from '../features/projects/projectsSlice';

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        projects: projectsReducer
    }
});
