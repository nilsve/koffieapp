import './LoginForm.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  static propTypes = {
    onLoggedOn: PropTypes.func.isRequired,
  }

  state = {
    username: '',
    password: '',
  };

  render() {
    const {username, password} = this.state;
    return <div className="LoginForm">
      <form className="LoginForm__form">
        <input type="text" placeholder="Gebruikersnaam" value={username} onChange={this.handleUpdateField('username')}/>
        <input type="password" placeholder="Wachtwoord" value={password} onChange={this.handleUpdateField('password')} />
        <input type="submit" value="Inloggedn" onClick={this.handleLogin}/>
      </form>
    </div>;
  }

  handleLogin = () => {
    // Todo: Echte login
    this.props.onLoggedOn();
  }

  handleUpdateField = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value,
    });
  };
}

export default LoginForm;
