import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as moment from 'moment';
import * as actions from '../../actions/calendarDataActions';

// Components
import InfoContainer from './InfoContainer';
import ClockContainer from './ClockContainer';
import ListContainer from './ListContainer';


// Material
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import theme from './../muiTheme';

const WAITING_TIME = 10;

const styles = {
    root: theme.root,
    menu: {
      height: '420px'
    }
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingTime: 0,
    };
  }

  componentDidMount() {
    const calendarId = this.props.calendar.id;
    const timeMin = moment().startOf('day').format();
    const timeMax = moment().endOf('day').format();

    if (calendarId) {
      this.props.actions.loadEvents(calendarId, timeMin, timeMax);
    }

    const waitingTimer = () => {
      const { waitingTime } = this.state;
      if (waitingTime < WAITING_TIME) {
        this.setState({ waitingTime: waitingTime + 1 });
      } else {
        this.props.history.push('/');
      }
    };

    this.interval = setInterval(waitingTimer.bind(this), 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render () {
    const {calendar, classes } = this.props;
    return (
      <Paper className={classes.root} elevation={1} >
        <InfoContainer calendar={calendar} />
        <div className={classes.menu}>
          <ClockContainer />
          <ListContainer />
        </div>
      </Paper>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  calendar: PropTypes.object.isRequired,
  actions:  PropTypes.object,
};

// Styles encapsulation
const styledHomePage = withStyles(styles)(HomePage);

// Redux connectors
function mapStateToProps(state) {
  return {
    calendarData: state.calendarData,
    events: state.calendarData.events,
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
)(styledHomePage);
