import './App.scss';
import React, { Component } from 'react';
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

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class App extends Component {
  state = {
    value: 0,
  }

  render() {
    const {value} = this.state;
    const style ={
      color: 'white',
      fontSize: 12,
      width: 200,
    }
    const styleLogoff = {...style, marginLeft: 'auto'}
    return (
      <div className="App">
        <AuthProvider>
          <GroupProvider>
            <AppBar position="static">
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
            {value === 0 &&
            <TabContainer>
              <div className="Aligner-item--bottom">
                <OrderScreen className="Aligner-item Aligner-item--top"/>
              </div>
            </TabContainer>}
            {value === 1 &&
            <TabContainer>
              <div className="Aligner-item--bottom">
                <OrderListScreen className="Aligner-item Aligner-item--top"/>
              </div>
            </TabContainer>}
            {value === 2 &&
            <TabContainer>
              <div className="Aligner-item--bottom">
                <GroupForm className="Aligner-item Aligner-item--top"/>
              </div>
            </TabContainer>}
            {value === 3 &&
            <TabContainer>
              <div className="Aligner-item--bottom">
                <AdminScreen className="Aligner-item Aligner-item--top"/>
              </div>
            </TabContainer>}
          </GroupProvider>
        </AuthProvider>
      </div>
    );
  }

  handleChange = (e, value) => {
    this.setState({value});
  };

}

export default App;
