import React from 'react';
import {AuthConsumer} from 'stores/AuthStore';

import {userApi} from 'apis';

class HomeScreen extends React.Component {

  state = {
    users: [],
    username: '',
    password: '',
  }

  async componentDidMount() {
    const result = await userApi.getUsers();

    this.setState({
      users: result,
    })
  }

  render() {
    return <AuthConsumer>
      {(authData) => this.renderBody(authData)}
    </AuthConsumer>;
  }

  renderBody(authData) {
    return <div className="HomeScreen">
      <h1>Welkom {authData.userInfo.username}</h1>
    </div>;
  }

  handleUpdateField = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value,
    });
  };
}

export default HomeScreen;
