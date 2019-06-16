import './App.scss';
import React, {Component} from 'react';
import AuthProvider from './components/AuthProvider';
import OrderScreen from 'components/OrderScreen';
import OrderListScreen from 'components/orderlist/OrderListScreen';
import AdminScreen from './components/AdminScreen';
import GroupForm from './components/GroupForm';
import GroupProvider from './components/GroupProvider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Button} from '@material-ui/core';
import {AuthConsumer} from 'stores/AuthStore';
import {userApi} from 'apis';

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

class App extends Component {

  state = {
    value: 0,
    admin: false,
  }

  render() {
    return <AuthConsumer>
      {(authData) => this.renderBody(authData)}
    </AuthConsumer>;
  }

  renderBody() {
    const {value} = this.state;
    return (
      <div className="App">
        <AuthProvider>
          <GroupProvider>
            <AuthConsumer>{(authData) => this.renderAppBar(authData)}</AuthConsumer>
            {value === 0 &&
              <TabContainer>
                <div className="Aligner-item--bottom">
                  <OrderScreen className="Aligner-item Aligner-item--top" />
                </div>
              </TabContainer>}
            {value === 1 &&
              <TabContainer>
                <div className="Aligner-item--bottom">
                  <OrderListScreen className="Aligner-item Aligner-item--top" />
                </div>
              </TabContainer>}
            {value === 2 &&
              <TabContainer>
                <div className="Aligner-item--bottom">
                  <GroupForm className="Aligner-item Aligner-item--top" />
                </div>
              </TabContainer>}
            {value === 3 &&
              <TabContainer>
                <div className="Aligner-item--bottom">
                  <AdminScreen className="Aligner-item Aligner-item--top" />
                </div>
              </TabContainer>}
          </GroupProvider>
        </AuthProvider>
      </div>
    );
  }

  renderAppBar(authData) {
    const {value, admin} = this.state;
    const style = {
      color: 'white',
      fontSize: 12,
      width: 200,
    }
    const styleLogoff = {...style, marginLeft: 'auto'}
    this.checkadmin(authData)
    if (admin) {
      return <AppBar position="static">
        <Tabs value={value} onChange={this.handleChange}>
          <Tab style={style} label="Bestellen" />
          <Tab style={style} label="Afhaallijst" />
          <Tab style={style} label="Mijn groep" />
          <Tab style={style} label="Beheer" />
          <AuthConsumer>
            {(store) => <Button style={styleLogoff} onClick={() => store.onLogout()}>Uitloggen</Button>}
          </AuthConsumer>
        </Tabs>
      </AppBar>
    } else {
      return <AppBar position="static">
        <Tabs value={value} onChange={this.handleChange}>
          <Tab style={style} label="Bestellen" />
          <Tab style={style} label="Afhaallijst" />
          <Tab style={style} label="Mijn groep" />
          <AuthConsumer>
            {(store) => <Button style={styleLogoff} onClick={() => store.onLogout()}>Uitloggen</Button>}
          </AuthConsumer>
        </Tabs>
      </AppBar>
    }
  }

  checkadmin = async (authData) => {
    const {admin} = this.state
    const user = await userApi.getUser(authData.userInfo.username)
    if (user.isAdmin && !admin) {
      this.setState({
        admin: true,
      })
    } else if (!user.isAdmin && admin) {
      this.setState({
        admin: false,
      })
    }
  }

  handleChange = (e, value) => {
    this.setState({value});
  }

}

export default App;
