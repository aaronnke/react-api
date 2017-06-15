import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from './utils/api';
import './css/ProjectsPage.css';

function SearchBar(props) {
  return (
    <form className={props.className} onSubmit={props.handleSubmit}>
      <input
        className={`${props.className}__input`}
        type="text"
        placeholder="search.."
        value={props.value}
        onChange={props.handleChange}
      />
    </form>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  className: '',
  value: '',
};

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
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseUrl: PropTypes.string.isRequired,
};

class ProjectsPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      projects: [],
      errors: null,
      search: '',
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
          projects: [],
        }));
  }

  handleSearchChange(e) {
    const search = e.target.value;
    this.setState({ search });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
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
          projects: [],
        }));
  }

  render() {
    const projects = this.state.projects;
    const baseUrl = this.props.match.url;
    const content = projects.length > 0 ?
      <Projects projects={projects} baseUrl={baseUrl} /> :
      <p> Could not find any projects with your search term. </p>;

    return (
      <div>
        <div className="ProjectsNav">
          <SearchBar
            className="ProjectsSearchBar"
            value={this.state.search}
            handleChange={this.handleSearchChange}
            handleSubmit={this.handleSearchSubmit}
          />
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
