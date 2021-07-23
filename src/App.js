import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { SingleProjectPage } from './features/projects/SingleProjectPage';
import { SingleTodo } from './features/todos/SingleTodo';
import { EditTodoForm } from './features/todos/EditTodoForm';
import { EditProjectForm } from './features/projects/EditProjectForm';

function App() {
  return (
    <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => (
              <>
                <Home />
              </>
              )} 
            />
            <Route exact path='/projects' component={Projects} />
            <Route exact path="/projects/:projectId" component={SingleProjectPage} />
            <Route exact path="/projects/editProject/:projectId" component={EditProjectForm} />
            <Route exact path="/projects/:projectId/:todoId" component={SingleTodo} />
            <Route exact path="/:todoId" component={SingleTodo} />
            <Route exact path="/editTodo/:todoId" component={EditTodoForm} />
            <Route exact path='/contact' component={Contact} />
            <Redirect to="/" />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
