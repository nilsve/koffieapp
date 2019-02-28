import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthProvider from './components/AuthProvider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider />
      </div>
    );
  }
}

export default App;
