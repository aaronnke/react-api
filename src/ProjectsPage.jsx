import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from './utils/api';
import './ProjectsPage.css';

function Projects(props) {
  const projects = props.projects && props.projects.map(project =>
    (
      <Link key={project.id} to={`${props.baseUrl}/${project.id}`}>
        <div style={{ backgroundImage: `url(${project.image})` }} className="ProjectCard">
          <div className="ProjectCard__details">
            <p className="ProjectCard__details__name"> {project.name} </p>
          </div>
        </div>
      </Link>
    ),
  );

  return (
    <div className="Projects">
      {projects}
    </div>
  );
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  baseUrl: PropTypes.string.isRequired,
};

class ProjectsPage extends Component {
  constructor() {
    super();
    this.state = {
      projects: null,
      errors: null,
      search: null,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    api.fetchProjects()
      .then(projects =>
        this.setState({
          projects,
          errors: null,
        }),
      ).catch(errors =>
        this.setState({
          errors,
          projects: null,
        }));
  }

  handleSearchChange(e) {
    const search = e.target.value;
    this.setState({ search });
  }

  handleSearchSubmit() {
    const search = this.state.search;
    api.fetchProjects(search)
      .then(projects =>
        this.setState({
          projects,
          errors: null,
        }),
      ).catch(errors =>
        this.setState({
          errors,
          projects: null,
        }));
  }

  render() {
    const projects = this.state.projects;
    const baseUrl = this.props.match.url;
    const content = projects ?
      <Projects projects={projects} baseUrl={baseUrl} /> :
      <p> Loading.. </p>;

    return (
      <div>
        <div className="ProjectsNav">
          <form className="" onSubmit={this.handleSearchSubmit}>
            <input
              id="search"
              className="ProjectsNav__search"
              type="text"
              value={this.state.search}
              onChange={this.handleSearchChange}
            />
          </form>
          <Link to={`${baseUrl}/new`} className="ProjectsNav__link Button">
            Create Project
          </Link>
        </div>
        {content}
      </div>
    );
  }
}

ProjectsPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProjectsPage;
