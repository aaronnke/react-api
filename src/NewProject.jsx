import React, { Component } from 'react';
import './NewProject.css';
import api from './utils/api';

class NewProject extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: '',
      image: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    api.createProject(name, price, image)
      .then(response =>
      console.log(response))
      .catch(error =>
      console.log(error));
  }

  render() {
    return (
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
          disabled={!(this.state.name && this.state.price)}
        >
            Submit
        </button>
      </form>
    );
  }
}

export default NewProject;
