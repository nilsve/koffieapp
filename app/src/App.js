import './App.scss';
import React, { Component } from 'react';
import AuthProvider from './components/AuthProvider';
import HomeScreen from 'components/HomeScreen';
import GroupForm from './components/GroupForm';
import GroupProvider from './components/GroupProvider';

class App extends Component {
  state = {
    currentTab: 'bestellen',
  }

  render() {
    return (
      <div className="App">
        <AuthProvider>
          <GroupProvider>
            <div className="App__menubar">
              {this.renderTab('bestellen', 'Bestellen')}
              {this.renderTab('afhaallijst', 'Afhaallijst')}
              {this.renderTab('groep', 'Mijn groep')}
            </div>
            <div className="Aligner-item--bottom">
              {this.renderBody()}
            </div>
          </GroupProvider>
        </AuthProvider>
      </div>
    );
  }

  renderTab(tabName, title) {
     return <a href="#" className="App__menubar__item" onClick={() => this.handleTabChange(tabName)}>{title}</a>;
  }

  renderBody() {
    const {currentTab} = this.state;
    switch (currentTab) {
      case 'bestellen': return <HomeScreen className="Aligner-item Aligner-item--top"/>;
      case 'afhaallijst': return <HomeScreen className="Aligner-item Aligner-item--top"/>;
      case 'groep': return <GroupForm className="Aligner-item Aligner-item--bottom"/>;
      default: return null;
    }
  }

  handleTabChange = tabName => {
    this.setState({
      currentTab: tabName,
    });
  }
}

export default App;
