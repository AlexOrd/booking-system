import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

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
};

// Styles encapsulation
const styledHomePage = withStyles(styles)(HomePage);

// Redux connectors
function mapStateToProps(state) {
  return {
    calendarData: state.calendarData
  };
}

export default connect(
  mapStateToProps
)(styledHomePage);
