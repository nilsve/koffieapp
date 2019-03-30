import './App.scss';
import React, { Component } from 'react';
import AuthProvider from './components/AuthProvider';
import HomeScreen from 'components/HomeScreen';
import GroupForm from './components/GroupForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <div className="Aligner">
            <HomeScreen className="Aligner-item Aligner-item--top"/>
            <GroupForm className="Aligner-item Aligner-item--bottom"/>
          </div>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
