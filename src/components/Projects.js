import React from 'react';
import { ProjectsList } from '../features/projects/ProjectsList'; 
import { AddProjectForm } from '../features/projects/AddProjectForm';

export const Projects = () => {
    return (
        <div>
            <h2>Projects</h2>
            <AddProjectForm />
            <ProjectsList />
        </div>
    )
}
