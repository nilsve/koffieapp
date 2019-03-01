import './App.scss';
import React, { Component } from 'react';
import AuthProvider from './components/AuthProvider';
import HomeScreen from 'components/HomeScreen';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <HomeScreen />
        </AuthProvider>
      </div>
    );
  }
}

export default App;
