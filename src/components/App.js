/* eslint-disable import/no-named-as-default */

import { googleApi } from '../../config.js';
import { Route, Switch, Redirect } from "react-router-dom";
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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('ROOM_ID')
      ? <Component {...props} />
      : <Redirect to='/settings' />
  )} />
)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gapiReady: false,
      calendarList: []
    };
  }

  loadCalendarApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.init(googleApi).then(() => {
          const isAuth = window.gapi.auth2.getAuthInstance().isSignedIn.get();
          if (!isAuth) {
            window.gapi.auth2.getAuthInstance().signIn()
              .then(() => {
                this.setState({
                  gapiReady: true
                });
              })
              .catch(() => {

              });
          } else {
            this.setState({
              gapiReady: true
            });
          }
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
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute path="/new" component={NewEvent} />
              <PrivateRoute path="/info" component={EventInfo} />
              <PrivateRoute path="/about" component={AboutPage} />
              <Route path="/settings" render={(props) => <ChooseRoomPage history={props.history}/>} />
              <Route component={NotFoundPage} />
            </Switch>
        </div>
      );
    } else {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1> GAPI loading... </h1>
        </div>
      );
    }
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
