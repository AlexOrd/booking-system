/* eslint-disable import/no-named-as-default */
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
  render() {
    // const activeStyle = { color: 'blue' };
    return (
      <div>
        {/* <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
          {' | '}
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
        </div> */}
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
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
