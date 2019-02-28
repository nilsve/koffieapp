import React from 'react';
import PropTypes from 'prop-types';

import BaseStore from './BaseStore';

const AuthContext = React.createContext(null);

export class AuthStore extends BaseStore {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    loggedOn: false,
  }

  render() {
    const context = {
      ...this.state,
      setLoggedOn: this.setLoggedOn,
    }
    return <AuthContext.Provider value={context}>
      {this.props.children}
    </AuthContext.Provider>
  }

  setLoggedOn = () => {
    this.setState({
      loggedOn: true,
    });
  }
}

export const AuthConsumer = AuthContext.Consumer;
