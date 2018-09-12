import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from './App';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import theme from './muiTheme';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    const muiTheme = createMuiTheme(theme);

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={muiTheme}>
            <App />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
