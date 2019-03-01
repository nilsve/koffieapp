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
    invalidPassword: false,
    error: false,
  };

  render() {
    const {error, invalidPassword, username, password} = this.state;
    return <div className="LoginForm">
      <form className="LoginForm__form">
        <h3>Login</h3>
        {invalidPassword && <b>Onbekende gebruikersnaam en wachtwoord</b>}
        {error && <b>Onbekende fout opgetreden!</b>}
        <input type="text" placeholder="Gebruikersnaam" value={username} onChange={this.handleUpdateField('username')}/>
        <input type="password" placeholder="Wachtwoord" value={password} onChange={this.handleUpdateField('password')} />
        <input type="submit" value="Inloggedn" onClick={this.handleLogin}/>
      </form>
    </div>;
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
