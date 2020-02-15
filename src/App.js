import React, { Component } from 'react';
import './App.scss';
import Layout from './Layout/Layout';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router basename="/">
        <Route path="/inicio" component={Layout} />
      </Router>
    );
  }
}

export default App;
