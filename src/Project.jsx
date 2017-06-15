import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './css/Project.css';
import api from './utils/api';

class Project extends PureComponent {
  constructor() {
    super();
    this.state = {
      name: null,
      price: null,
      image: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.projectId;
    api.fetchProject(id)
      .then(project =>
        this.setState({
          name: project.name,
          price: project.price,
          image: project.image,
        }),
      );
  }

  render() {
    const image = this.state.image;
    const name = this.state.name;
    const price = this.state.price;

    return (
      <div className="Project">
        <div className="ProjectImage" style={{ backgroundImage: `url(${image})` }} />
        <p>{name}</p>
        <p>{price}</p>
      </div>
    );
  }
}

Project.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Project;
