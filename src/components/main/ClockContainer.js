import React from 'react';
import PropTypes from 'prop-types';
import Clock from 'react-live-clock';

// Material
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import theme from '../muiTheme'

const styles = {
  card: {
    ...theme.components.clockCard,
  backgroundColor: theme.palette.primary1Color
  },
  clock: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    color: theme.palette.textColor
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
