import React from 'react';
import {AuthConsumer} from 'stores/AuthStore';

import {userApi} from 'apis';

class HomeScreen extends React.Component {
  
  state = {
    users: [],
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
    console.log(authData.userInfo.username)
    return <div>
      <p>Ingelogd als: {authData.userInfo.username}</p>
      <p>{JSON.stringify(this.state.users)}</p>
    </div>
  }
}

export default HomeScreen;
