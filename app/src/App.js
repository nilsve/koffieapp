import './App.scss';
import React, { Component } from 'react';
import AuthProvider from './components/AuthProvider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>Hallo</AuthProvider>
      </div>
    );
  }
}

export default App;
