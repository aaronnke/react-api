import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import Home from './Home';
import ProjectsPage from './ProjectsPage';
import Project from './Project';
import NewProject from './NewProject';

function App() {
  return (
    <Router>
      <div>
        <div className="NavContainer">
          <ul className="Nav">
            <li key="Home"><Link to="/" className="Nav__link">Home</Link></li>
            <li key="Projects"><Link to="/projects" className="Nav__link">Projects</Link></li>
          </ul>
        </div>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={ProjectsPage} />
          <Route exact path="/projects/new" component={NewProject} />
          <Route exact path="/projects/:projectId" component={Project} />
          <Route render={() =>
            <p>Not Found</p>
        } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
