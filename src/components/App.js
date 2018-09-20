/* eslint-disable import/no-named-as-default */
const API_KEY = 'AIzaSyAdE32PL8frgPNJUgjhdr83fz8FeOmEBoY';
const CLIENT_ID = 'stately-magpie-216913';

import { Route, Switch } from "react-router-dom";

import AboutPage from "./AboutPage";
import HomePage from "./main/HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import NewEvent from './NewEvent/NewEvent';
import EventInfo from './EventInfo/EventInfo';
import ChooseRoomPage from './ChooseRoom/ChooseRoom';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gapiReady: false
    };
  }

  loadCalendarApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load('calendar', 'v3', () => {
          var request = window.gapi.client.calendar.calendarList.list();
          request.execute(function(resp) {
            var cals = resp.items;
          });
          this.setState({ gapiReady: true });
        });
      });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadCalendarApi();
  }

  render() {
    if (this.state.gapiReady) {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
              <Route path="/new" component={NewEvent} />
            <Route path="/info" component={EventInfo} />
            <Route path="/about" component={AboutPage} />
            <Route path="/settings" component={ChooseRoomPage} />
            <Route component={NotFoundPage} />
          </Switch>
      </div>
    );
  } else {
    return (
      <h1>GAPI loading.</h1>
    );
  }
}
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
