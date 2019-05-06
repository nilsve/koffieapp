import React from 'react';
import PropTypes from 'prop-types';

import BaseStore from './BaseStore';
import {loadUserData, storeUserData} from 'auth/authHelpers'

const AuthContext = React.createContext(null);

export class AuthStore extends BaseStore {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    loggedOn: false,
    userInfo: null,
    jwtToken: null,
  }

  componentWillMount() {
    //TODO: Checken via de server of je al ingelogd bent
    const userData = loadUserData();

    if (userData) {
      this.setUserData(userData);
    }
  }

  render() {
    const context = {
      ...this.state,
      setLoggedOn: this.setLoggedOn,
      setUserGroup: this.setUserGroup,
    };
    
    return <AuthContext.Provider value={context}>
      {this.props.children}
    </AuthContext.Provider>
  }

  setLoggedOn = (jwtToken, userInfo) => {
    const userData = {jwtToken, userInfo};
    storeUserData(userData);

    this.setUserData(userData);
  }

  setUserGroup = group => {
    const {userInfo} = this.state;
    this.setState({
      userInfo: {
        ...userInfo,
        group,
      }
    });
  }

  setUserData(userData) {
    this.setState({
      loggedOn: true,
      ...userData,
    });
  }
}

export const AuthConsumer = AuthContext.Consumer;
