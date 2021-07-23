import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectActiveProjects, selectCompletedProjects, selectProjectById } from './projectsSlice';

let ProjectTitles = ({proj}) => {
    const project = useSelector(state => selectProjectById(state, proj.id));
    return (
        <li>
            <Link to={`projects/${project.id}`}>{project.title}</Link>
            {/* add component here for editing and completing and deleting buttons, you can pass todo as prop */}
        </li>
    )
};

export const ProjectsList = () => {
    const activeProjects = useSelector(selectActiveProjects);
    const activeProjectsList = activeProjects.map(project => <ProjectTitles key={project.id} proj={project}/>);
    const completedProjects = useSelector(selectCompletedProjects);
    const completedProjectsList = completedProjects.map(project => <ProjectTitles key={project.id} proj={project}/>);
    return (
        <section>
            <h2>All Projects</h2>
            {/* add filter component here can pass todos as a prop */}
            <section>
                <h3>Active Projects:</h3>
                <ul>
                    {activeProjects.length ? activeProjectsList : <li>No projects to display</li>}
                </ul>
            </section>
            <section>
                <h3>Completed Projects:</h3>
                <ul>{completedProjectsList}</ul>
            </section>
        </section>
    )
}
