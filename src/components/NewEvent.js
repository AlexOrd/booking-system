import React from 'react';
import PropTypes from "prop-types";

// Components
import EventContainer from './EventContainer';
import EventListContainer from './EventListContainer';

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

const NewEvent = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <EventContainer />
      <div>
        <EventListContainer />
      </div>
    </Paper>
  );
};

NewEvent.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(NewEvent);
