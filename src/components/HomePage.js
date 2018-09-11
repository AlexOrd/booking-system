import React from 'react';
import PropTypes from "prop-types";

// Components
import InfoContainer from './InfoContainer';
import ClockContainer from './ClockContainer';
import ListContainer from './ListContainer';

// Material
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingBottom: '16px',
      paddingTop: '16px',
      width: '1024px',
      height: '600px',
      display: 'flex',
      justifyContent: 'space-between'
    }
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