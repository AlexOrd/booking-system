import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as moment from 'moment';
import TextTruncate from 'react-text-truncate';
import { emailToName } from '../../utils/texts';

// Material
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import ImageIcon from '@material-ui/icons/Image';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import theme from './../muiTheme';

const styles = {
  root: {
    width: '360px',
    height: '100%',
    maxWidth: theme.spacing.listContainerMaxWidth,
    maxHeight: '100%',
    overflow: 'auto'
  },
  eventDescription: {
  },
  timeAvatar:  {
    width: '60px',
    height: '60px',
    backgroundColor: theme.palette.primary1Color
  }
};

const ListContainer = (props) => {
  const { events, classes } = props;
  const formattedEvents = events.map(event => {
    const authorName = emailToName(event.creator.email);
    const startTime = moment(event.start.dateTime).format('HH:MM');
    const endTime = moment(event.end.dateTime).format('HH:MM');
    const persons = event.attendees ? event.attendees : [];


    return {
      id: event.id,
      title: event.summary,
      startTime,
      endTime,
      description:
        <div className={classes.eventDescription}>
          { `Created by: ${authorName}` } <br/>
          <AccountCircleIcon style={{ fontSize: 14 }}/> { `${persons.length + 1} persons | ` } { startTime } - { endTime }
        </div>
    }

  });
  return (
    <Paper className={classes.root}>
      <List>
        {formattedEvents.map((event) => {
          return (
            <ListItem key={event.id} component={Link} to={`/event/${event.id}`} button>
              <Avatar className={classes.timeAvatar}>
                {event.startTime}
              </Avatar>
              <ListItemText inset primary={event.title} secondary={event.description} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

ListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.array,
};

export default withStyles(styles)(ListContainer);
