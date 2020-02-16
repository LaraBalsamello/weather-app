import React, { Component } from "react";
import "./App.scss";
import Layout from "./Layout/Layout";
import { BrowserRouter as Router, Route } from "react-router-dom";
export const WEATHER_API_KEY = "7382a6c201602e1d9652f9b71d1690b3";

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
