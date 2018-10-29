import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { emailToName, nameToInitial } from '../../utils/texts';

// Material
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import theme from './../muiTheme';

const styles = {
    root: theme.root,
    chipsContainer: {
      ...theme.components.chipsContainer,
      padding: theme.spacing.chipsSpacing,
    },
    chip: {
      margin: theme.spacing.chipsSpacing,
    },
    card: {
      width: theme.spacing.width
    },
    actions: {
      width: theme.spacing.width
    },
    media: {
      height: theme.spacing.mediaHeightSmall,
      backgroundColor: theme.palette.primary1Color
    },
    container: {
      ...theme.container
    }
};

class EventPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { events, calendar, classes } = this.props;
    const selectedId = this.props.match.params.id;
    const currentEvent = events.find(event => event.id == selectedId)
    const eventStartTime = moment(currentEvent.start.dateTime).format('HH:MM');
    const eventEndTime = moment(currentEvent.end.dateTime).format('HH:MM');
    const personsWithCreator = currentEvent.attendees ?
      [{ email: currentEvent.creator.email, responseStatus: 'accepted'}].concat(currentEvent.attendees) :
      [{ email: currentEvent.creator.email, responseStatus: 'accepted'}];
    const persons = personsWithCreator.map(person => {
      const name = emailToName(person.email);
      return {
        name,
        initials: nameToInitial(name),
        statusColor: person.responseStatus == 'accepted' ? 'primary' : 'secondary',
      }
    })

    return (
      <Paper className={classes.root} elevation={1}>
        <Card className={classes.card}>
          <CardActionArea className={classes.actions}>
            <CardMedia
              className={classes.media}
              image={`../images/room${calendar.imageId}.jpg`}
              title="Room images"
            />
          </CardActionArea>
          <CardContent className={classes.container}>
            <Typography gutterBottom variant="headline" component="h2">
              Meeting Room &quot;{calendar.summary}&quot;
            </Typography>
            <Typography component="h3">
              {currentEvent.summary}
            </Typography>
            <Typography component="h3">
              { eventStartTime } - { eventEndTime }
            </Typography>
            <Typography component="h3">
              Status:
            </Typography>
            <div className={classes.chipsContainer}>
              {persons.map((person, index) => {
                return (
                  <Chip
                    key={index}
                    avatar={<Avatar>{person.initials}</Avatar>}
                    label={person.name}
                    className={classes.chip}
                    color={person.statusColor}
                  />
                );
              })}
            </div>
          </CardContent>
          <CardActions>
            <Link to="/">
              <Button className={classes.buttons} variant="contained" size="large" color="primary">
                BACK
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}


EventPage.propTypes = {
  classes: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  match: PropTypes.object
};

// Styles encapsulation
const styledEventPage = withStyles(styles)(EventPage);

// Redux connectors
function mapStateToProps(state) {
  return {
    events: state.calendarData.events,
    calendar: state.calendarData.calendar,
  };
}

export default connect(
  mapStateToProps
)(styledEventPage);
