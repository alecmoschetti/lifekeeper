import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const todosAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = todosAdapter.getInitialState();

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded: todosAdapter.addOne,
        todoUpdated: todosAdapter.upsertOne,
        todoDeleted: todosAdapter.removeOne,
        deletedProject(state, action) {
            const todosToDelete = Object.values(state.entities)
                .filter(todo => todo.project === action.payload)
                .map(todo => todo.id);
            todosAdapter.removeMany(state, todosToDelete);
        }
    },
});

export const { todoAdded, todoUpdated, todoDeleted, deletedProject } = todosSlice.actions
export default todosSlice.reducer;

export const { 
    selectAll: selectAllTodos,
    selectById: selectTodoById,
    selectIds: selectTodoIds    
} = todosAdapter.getSelectors(state => state.todos);

export const selectActiveTodos = createSelector(selectAllTodos, todos => todos.filter(todo => (!todo.completed)));
export const selectCompletedTodos = createSelector(selectAllTodos, todos => todos.filter(todo => todo.completed));