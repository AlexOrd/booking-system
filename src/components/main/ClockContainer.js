import React from 'react';
import PropTypes from 'prop-types';
import Clock from 'react-live-clock';

// Material
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import theme from '../muiTheme'

const styles = {
  freeMode: {
    ...theme.components.clockCard,
    backgroundColor: theme.palette.primary1Color
  },
  busyMode: {
    ...theme.components.clockCard,
    backgroundColor: theme.palette.secondaryColor
  },
  clock: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    color: theme.palette.textColor
  },
};

const ClockContainer = (props) => {
  const { classes, busyMode } = props;

  return (
    <Paper className={busyMode ? classes.busyMode : classes.freeMode}>
      <Clock className={classes.clock} ticking={true}/>
    </Paper>
  );
};

ClockContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  busyMode: PropTypes.PropTypes.bool
};

export default withStyles(styles)(ClockContainer);
