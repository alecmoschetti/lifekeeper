import { createSlice, createEntityAdapter, createSelector, nanoid } from '@reduxjs/toolkit';


const projectsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.title.localeCompare(a.title)
});

const defaultProject = [{ id: nanoid(), title: 'General', completed: false }];
const emptyInitialState = projectsAdapter.getInitialState();
const filledState = projectsAdapter.upsertMany(emptyInitialState, defaultProject)

const projectsSlice = createSlice({
    name: 'projects',
    initialState: filledState,
    reducers: {
        projectAdded: projectsAdapter.addOne,
        projectUpdated: projectsAdapter.upsertOne,
        projectDeleted: projectsAdapter.removeOne,
    }
});

export const { projectAdded, projectUpdated, projectDeleted } = projectsSlice.actions

export default projectsSlice.reducer;

export const { 
    selectAll: selectAllProjects,
    selectById: selectProjectById,
    selectIds: selectProjectIds    
} = projectsAdapter.getSelectors(state => state.projects);

export const selectActiveProjects = createSelector(selectAllProjects, projects => projects.filter(project => (!project.completed)));
export const selectCompletedProjects = createSelector(selectAllProjects, projects => projects.filter(project => project.completed));
    