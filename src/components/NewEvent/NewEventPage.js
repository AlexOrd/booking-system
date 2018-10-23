import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/calendarDataActions';
import calendarAPI from '../../api/calendarAPI';
import * as moment from 'moment';

// Components
import EventContainer from './EventContainer';
import EventListContainer from './EventListContainer';

// Material
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '5px',
      paddingTop: '5px',
      width: '1014px',
      height: '590px',
      display: 'flex',
      justifyContent: 'space-between'
    }
};

class NewEventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingTitle: '',
      selectedDate: new Date(),
      fromTime: '',
      toTime: '',
      dailyEvents: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadEvents(this.state.selectedDate);
  }

  loadEvents = (date) => {
    const startTime = moment(date).startOf('day').format();
    const endTime = moment(date).endOf('day').format();
    const calendarId = this.props.calendar.id;
    this.isLoading = true;
    calendarAPI.getEvents(calendarId, startTime, endTime).then(response => {
      const events = response.result.items;
      this.setState({ dailyEvents: events });
      this.isLoading = false;
    }).catch(error => {
      this.isLoading = false;
      throw(error);
    });
  }

  onTitleChange = (event) => {
    this.setState({ meetingTitle: event.target.value });
  }

  onStartTimeChange = (fromTime) => {
    this.setState({ fromTime });
  }

  onEndTimeChange = (toTime) => {
    this.setState({ toTime });
  }

  onDateChange = (date) => {
    this.loadEvents(date);
    this.setState({ selectedDate: date });
  }

  onReserve = () => {
    const resource = {
      summary: this.state.meetingTitle,
      description: 'Meeting created from Smart Room System',
      start: {
        dateTime: moment(this.state.fromTime).format()
      },
      end: {
        dateTime: moment(this.state.toTime).format()
      },
      attendees: []
    };

    calendarAPI.createEvent(this.props.calendar.id, resource).then(() => {
      this.props.history.push('/home');
    }).catch(error => {
      throw(error);
    });
  }

  render () {
    const { isLoading, dailyEvents, selectedDate, meetingTitle} = this.state;
    const { classes, calendar } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <EventContainer
          calendar={calendar}
          events={dailyEvents}
          selectedDate={selectedDate}
          isLoading={isLoading}
          meetingTitle={meetingTitle}
          onTitleChange={this.onTitleChange}
          onStartTimeChange={this.onStartTimeChange}
          onEndTimeChange={this.onEndTimeChange}
          onDateChange={this.onDateChange}
          onReserve={this.onReserve}
        />
        <div>
          <EventListContainer />
        </div>
      </Paper>
    );
  }
}

NewEventPage.propTypes = {
  classes: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

// Styles encapsulation
const styledNewEventPage = withStyles(styles)(NewEventPage);

// Redux connectors
function mapStateToProps(state) {
  return {
    calendar: state.calendarData.calendar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledNewEventPage);
