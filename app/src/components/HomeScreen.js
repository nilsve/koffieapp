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
    return <div>
      <p>Ingelogd als: {authData.userInfo.username}</p>
      {this.renderUsers()}
    </div>
  }

  renderUsers() {
    const {users} = this.state;

    return <table>
      <thead>
        <td>Gebruikersnaam</td>
        <td>Wachtwoord</td>
      </thead>
      <body>
        {users.map((user) => <tr><td>{user.username}</td><td>{user.password}</td></tr>)}
      </body>
    </table>;
  }
}

export default HomeScreen;
