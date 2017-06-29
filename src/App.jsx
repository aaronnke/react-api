import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './css/App.css';
import Home from './Home';
import ProjectsPage from './ProjectsPage';
import Project from './Project';
import NewProject from './NewProject';
import SignUpPage from './SignUp';

function NavBar() {
  return (
    <div className="NavContainer">
      <ul className="Nav">
        <li key="Home" className="Nav__link"><Link to="/">Home</Link></li>
        <li key="Projects" className="Nav__link"><Link to="/projects">Projects</Link></li>
        <li key="SignUp" className="Nav__link--right Nav__link">
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="Main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/projects" component={ProjectsPage} />
            <Route exact path="/projects/new" component={NewProject} />
            <Route exact path="/projects/:projectId" component={Project} />
            <Route render={() =>
              <p>Not Found</p>
          } />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
