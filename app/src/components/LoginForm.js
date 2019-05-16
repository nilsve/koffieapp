import './LoginForm.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {authApi} from 'apis';
import {Button, TextField} from '@material-ui/core'

class LoginForm extends Component {
  static propTypes = {
    onLoggedOn: PropTypes.func.isRequired,
  }

  state = {
    username: '',
    password: '',

    newUsername: '',
    newPassword: '',
    invalidPassword: false,
    error: false,

    status: 'login', // State kan 'login' zijn of 'register'
  };

  render() {
    if (this.state.status === 'login') {
      return this.renderLoginForm();
    } else {
      return this.renderRegisterForm();
    }
  }

  renderLoginForm() {
    const {error, invalidPassword, username, password} = this.state;
    return <div className="LoginForm">
      <form className="LoginForm__form">
        <h1>Inloggen</h1>
        {invalidPassword && <b>Onbekende gebruikersnaam en wachtwoord</b>}
        {error && <b>Onbekende fout opgetreden!</b>}
        <TextField className="LoginForm__form__input" variant="outlined" label="Gebruikersnaam (of emailadres)" type="text" onChange={this.handleUpdateField('username')}>{username}</TextField>
        <TextField className="LoginForm__form__input" variant="outlined" label="Wachtwoord" type="password" onChange={this.handleUpdateField('password')}>{password}</TextField>
        <Button className="LoginForm__form__input" variant="contained" color="primary" onClick={this.handleLogin}>Inloggen</Button>
        <Button className="LoginForm__form__input" variant="contained" color="default" onClick={this.toggleScreen('register')}>Registreren</Button>
      </form>
    </div>;
  }

  renderRegisterForm() {
    const {newUsername, newPassword} = this.state;
    return <div className="LoginForm">
      <form className="LoginForm__form">
        <h1>Registreren</h1>
        <TextField className="LoginForm__form__input" variant="outlined" label="Gebruikersnaam  (of emailadres)" type="text" onChange={this.handleUpdateField('newUsername')}>{newUsername}</TextField>
        <TextField className="LoginForm__form__input" variant="outlined" label="Wachtwoord" type="password" onChange={this.handleUpdateField('newPassword')}>{newPassword}</TextField>
        <Button className="LoginForm__form__input" variant="contained" color="primary" onClick={this.handleRegisterComplete}>Registreren</Button>
        <Button className="LoginForm__form__input" variant="contained" color="default" onClick={this.toggleScreen('login')}>Terug</Button>
      </form>
    </div>
  }

  handleRegisterComplete = async (e) => {
    e.preventDefault();
    const {newUsername, newPassword} = this.state;

    await authApi.register(newUsername, newPassword);

    this.setState({
      status: 'login',
    })
  }

  toggleScreen = newStatus => e => {
    e.preventDefault()
    this.setState({
      status: newStatus,
    });
  }

  handleLogin = async (e) => {
    e.preventDefault();

    // Todo: Echte login
    const {username, password} = this.state;

    try {
      const token = await authApi.login(username, password);

      this.props.onLoggedOn(token, {
        username,
      });
    } catch (err) {
      if (err.status === 403) {
        this.setState({
          invalidPassword: true,
          error: false,
        });
      } else {
        this.setState({
          error: true,
          invalidPassword: false,
        })
      }
    }
  }

  handleUpdateField = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value,
    });
  };
}

export default LoginForm;
