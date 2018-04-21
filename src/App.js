import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from './Component/LandingPage'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <LandingPage />
      </MuiThemeProvider>
    );
  }
}

export default App;
