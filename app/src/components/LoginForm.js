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
  };

  render() {
    const {invalidPassword, username, password} = this.state;
    return <div className="LoginForm">
      <form className="LoginForm__form">
        <h3>Login</h3>
        {invalidPassword && <b>Onbekende gebruikersnaam en wachtwoord</b>}
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

    const result = await authApi.login(username, password);
    console.log(result)
    if (username === 'test' && password === 'test') {
      this.props.onLoggedOn({
        username,
      });
    } else {
      this.setState({
        invalidPassword: true,
      })
    }
  }

  handleUpdateField = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value,
    });
  };
}

export default LoginForm;
