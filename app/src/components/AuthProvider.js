import React from 'react';
import PropTypes from 'prop-types';

import {AuthStore, AuthConsumer} from 'stores/AuthStore';
import LoginForm from './LoginForm';

export default class AuthProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  state = {
    loggedOn: false,
    setLoggedOn: this.setLoggedOn,
  }

  render() {
    return <AuthStore>
      <AuthConsumer>
        {(store) => this.renderBody(store)}
      </AuthConsumer>
    </AuthStore>
  }

  renderBody(store) {
    if (store.loggedOn) {
      return this.props.children;
    } else {
      return <LoginForm onLoggedOn={store.setLoggedOn}/>
    }
  }

  setLoggedOn = () => {
    this.setState({
      loggedOn: true,
    });
  }
}
