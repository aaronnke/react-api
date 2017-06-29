import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './css/SignUp.css';
import api from './utils/api';

function FormGroup(props) {
  return (
    <div className={`${props.groupName}__group`}>
      <label className={`${props.groupName}__label`} htmlFor={props.item}>
        {props.label}
      </label>
      <input
        name={props.item}
        className={`${props.groupName}__input`}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
}

FormGroup.propTypes = {
  groupName: PropTypes.string,
  item: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

FormGroup.defaultProps = {
  groupName: 'Form',
  label: '',
};

function SubmitButton(props) {
  return (
    <button
      className={`${props.addClassName}__submit Button`}
      type="submit"
      disabled={props.isDisabled}
    >
      {props.text}
    </button>
  );
}

SubmitButton.propTypes = {
  isDisabled: PropTypes.bool,
  addClassName: PropTypes.string,
  text: PropTypes.string,
};

SubmitButton.defaultProps = {
  isDisabled: false,
  addClassName: '',
  text: 'Submit',
};

class SignUpPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const passwordConfirmation = this.state.passwordConfirmation;
    api.createUser({ email, password, password_confirmation: passwordConfirmation })
      .then(response =>
        console.log(response),
      )
      .catch((err) => {
        const error = err.response.data;
        this.setState({ error });
      });
  }

  render() {
    const isDisabled = !(this.state.email
      && this.state.password
      && this.state.passwordConfirmation);

    return (
      <div className="SignUpPage">
        <form className="SignUpForm" onSubmit={this.handleSubmit}>
          <FormGroup
            groupName="SignUp"
            item="email"
            label="Email"
            type="text"
            value={this.state.email}
            handleChange={this.handleChange}
          />
          <FormGroup
            groupName="SignUp"
            item="password"
            label="Password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
          />
          <FormGroup
            groupName="SignUp"
            item="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            value={this.state.passwordConfirmation}
            handleChange={this.handleChange}
          />
          <SubmitButton
            addClassName="SignUpForm"
            text="Sign Up"
            isDisabled={isDisabled}
          />
        </form>
      </div>
    );
  }
}

export default SignUpPage;
