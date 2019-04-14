import './App.scss';
import React, { Component } from 'react';
import AuthProvider from './components/AuthProvider';
import HomeScreen from 'components/HomeScreen';
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
      color: 'lightgrey',
      fontSize: 12,
    }
    return (
      <div className="App">
        <AuthProvider>
          <GroupProvider>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab style={style} label="Bestellen" />
                <Tab style={style} label="Afhaallijst" />
                <Tab style={style} label="Mijn groep" />
                <Button style={style} onClick={this.handleLogoff}>
                  Uitloggen
                </Button>
              </Tabs>
            </AppBar>
            {value === 0 && 
            <TabContainer>
              <div className="Aligner-item--bottom">
                <HomeScreen className="Aligner-item Aligner-item--top"/>
              </div>
            </TabContainer>}
            {value === 1 && 
            <TabContainer>
              <div className="Aligner-item--bottom">
                <HomeScreen className="Aligner-item Aligner-item--top"/>
              </div>
            </TabContainer>}
            {value === 2 && 
            <TabContainer>
              <div className="Aligner-item--bottom">
                <GroupForm className="Aligner-item Aligner-item--bottom"/>
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

  handleLogoff = () => {
    //TODO: deze nog fixen
    <AuthConsumer>
      {(store) => store.setLoggedOn(null, null)}
    </AuthConsumer>
  }
}

export default App;
