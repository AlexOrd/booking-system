import React from 'react';
import PropTypes from 'prop-types';
import Clock from 'react-live-clock';

// Material
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = {
  card: {
    width: '350px',
    height: '170px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#3f51b5'
  },
  clock: {
    fontFamily: 'Roboto',
    fontSize: '64px',
    color: '#FFFFFF'
  },
};

const ClockContainer = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.card}>
      <Clock className={classes.clock} ticking={true}/>
    </Paper>
  );
};

ClockContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClockContainer);
