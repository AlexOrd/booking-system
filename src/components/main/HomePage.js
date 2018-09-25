import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/calendarDataActions';

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

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  componentDidMount() {
		this.props.actions.loadEvents();
	}

  redirectToAddCoursePage() {
    this.console.log();
  }

  render () {
    const { calendarData, classes } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <InfoContainer calendar={calendarData.calendar}/>
        <div>
          <ClockContainer />
          <ListContainer />
        </div>
      </Paper>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  calendarData: PropTypes.object,
  actions:  PropTypes.object,
};

// Styles encapsulation
const styledHomePage = withStyles(styles)(HomePage);

// Redux connectors
function mapStateToProps(state) {
  return {
    calendarData: state.calendarData
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
