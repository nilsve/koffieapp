import './LoginForm.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {authApi} from 'apis';

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
        <h3>Login</h3>
        {invalidPassword && <b>Onbekende gebruikersnaam en wachtwoord</b>}
        {error && <b>Onbekende fout opgetreden!</b>}
        <input type="text" placeholder="Gebruikersnaam" value={username} onChange={this.handleUpdateField('username')}/>
        <input type="password" placeholder="Wachtwoord" value={password} onChange={this.handleUpdateField('password')} />
        <input type="submit" value="Inloggen" onClick={this.handleLogin}/>
        <input type="button" value="Registreren" onClick={this.handleRegister} />
      </form>
    </div>;
  }

  renderRegisterForm() {
    const {newUsername, newPassword} = this.state;
    return <div className="LoginForm">
      <form className="LoginForm__form">
        <h3>Registreren</h3>
        <input type="text" placeholder="Gebruikersnaam" value={newUsername} onChange={this.handleUpdateField('newUsername')} />
        <input type="password" placeholder="Wachtwoord" value={newPassword} onChange={this.handleUpdateField('newPassword')} />
        <input type="submit" value="Registreren" onClick={this.handleRegisterComplete}/>
      </form>
    </div>;
  }

  handleRegisterComplete = async (e) => {
    e.preventDefault();
    const {newUsername, newPassword} = this.state;

    try {
      await authApi.register(newUsername, newPassword);
      
    } catch (err) {

    }
  }

  handleRegister = () => {
    this.setState({
      status: 'register',
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
