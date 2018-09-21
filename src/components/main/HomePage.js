import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <InfoContainer />
        <div>
          <ClockContainer />
          <ListContainer />
        </div>
      </Paper>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
};

// Styles encapsulation
const styledHomePage = withStyles(styles)(HomePage);

// Redux connectors
function mapStateToProps(state) {
  return {
    events: state.calendarData
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
