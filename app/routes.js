// @flow
import React from "react";
import { Route, IndexRoute } from "react-router";
import { SpotifyWebClient } from "./api/SpotifyWebClient";
import AppContainer from "./containers/AppContainer";
import LoginPageContainer from "./containers/LoginPageContainer";
import MainPageContainer from "./containers/MainPageContainer";
import SongsContainer from "./containers/SongsContainer";
import ConfigurationContainer from "./containers/ConfigurationContainer";

const checkAuth = (nextState, replace, callback) => {
  if (!SpotifyWebClient.isAuthenticated()) {
    replace('/');
  }
  callback();
};

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={LoginPageContainer}/>
    <Route path="/main" component={MainPageContainer} onEnter={checkAuth}>
      <IndexRoute component={SongsContainer}/>
      <Route path="/main/configuration" component={ConfigurationContainer}/>
    </Route>
  </Route>
);
