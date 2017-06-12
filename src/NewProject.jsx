import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewProject.css';
import api from './utils/api';

class NewProject extends Component {
  constructor() {
    super();
    this.state = {
      presignedUrl: '',
      image: '',
      name: '',
      price: '',
      error: null,
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    api.getPresignedUrl()
      .then(presignedUrl =>
        this.setState({ presignedUrl }),
      );
  }

  handleImageChange(e) {
    const url = this.state.presignedUrl;
    const imageFile = e.target.files[0];
    api.uploadImage(url, imageFile)
      .then(image =>
        this.setState({ image }),
      );
  }

  handleNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
  }

  handlePriceChange(e) {
    const price = e.target.value;
    this.setState({ price });
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.name;
    const price = this.state.price;
    const image = this.state.image;
    api.createProject({ name, price, image })
      .then((response) => {
        this.props.history.push(`/projects/${response.id}`);
      })
      .catch(error =>
        this.setState({ error }));
  }

  render() {
    const errors = this.state.errors && <p>Something went wrong.</p>;

    return (
      <div>
        {errors}
        <input
          id="image"
          className="NewProject__image"
          type="file"
          onChange={this.handleImageChange}
        />
        <form className="NewProject" onSubmit={this.handleSubmit}>
          <div className="NewProject__group">
            <label className="NewProject__label" htmlFor="name">
              Project Name
            </label>
            <input
              id="name"
              className="NewProject__input"
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="NewProject__group">
            <label className="NewProject__label" htmlFor="price">
              Project Price
            </label>
            <input
              id="price"
              className="NewProject__input"
              type="number"
              value={this.state.price}
              onChange={this.handlePriceChange}
            />
          </div>
          <button
            className="NewProject__submit Button"
            type="submit"
            disabled={!(this.state.name && this.state.price && this.state.image)}
          >
              Submit
          </button>
        </form>
      </div>
    );
  }
}

NewProject.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewProject;
