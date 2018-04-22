import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from './Component/LandingPage'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (


      <MuiThemeProvider>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css?family=Muli:400,800" rel="stylesheet"/>
        <LandingPage />
      </MuiThemeProvider>
    );
  }
}

export default App;
