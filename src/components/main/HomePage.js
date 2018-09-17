import React from 'react';
import PropTypes from "prop-types";

// Components
import InfoContainer from './InfoContainer';
import ClockContainer from './ClockContainer';
import ListContainer from './ListContainer';

// Material
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import theme from './../muiTheme';

const styles = {
    root: theme.root
};

const HomePage = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <InfoContainer />
      <div>
        <ClockContainer />
        <ListContainer />
      </div>
    </Paper>
  );
};

HomePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HomePage);
