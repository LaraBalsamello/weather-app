import React, { Component } from "react";
import "./App.scss";
import Layout from "./Layout/Layout";
import MyFavouriteCities from "./Layout/MyFavoriteCities/MyFavoriteCities";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
export const WEATHER_API_KEY = "7382a6c201602e1d9652f9b71d1690b3";

class App extends Component {
  render() {
    return (
      <Router>
        <Redirect
          from="**"
          to="/inicio" />
        <Switch>
          <Route path="/inicio" exact={false} component={Layout} />
          <Route path="/ciudades-favoritas" exact component={MyFavouriteCities} />
        </Switch>
      </Router>
    );
  }
}

export default App;
