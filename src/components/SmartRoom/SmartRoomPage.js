import React from 'react';
import PropTypes from "prop-types";
import { GenericWeather } from 'react-weather';
import { Link } from 'react-router-dom';
import Switcher from './Widgets/Switcher';

// Material
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import theme from './../muiTheme';

const styles = {
    root: {
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '5px',
      paddingTop: '5px',
      width: 1014,
      height: 590
    },
    sliderContainer: {
      width: '100%',
      height: '80%',
    },
    actions: {
      marginTop: '50px',
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.vertical
    },
};

class SmartRoomPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {

    const {classes } = this.props;

    return (
      <Paper  className={classes.root} elevation={1}>
        <div style={{width: theme.root.width/2, margin: '120px 150px'}}>
          <Switcher title={'Main light'}/>
          <Switcher title={'Side light'}/>
        </div>
        <CardActions className={classes.actions}>
          <Button component={Link} to="/" variant="contained" size="large" color="secondary">
            BACK
          </Button>
        </CardActions>
      </Paper>
    );
  }
}

SmartRoomPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// Styles encapsulation
const styledSmartRoomPage = withStyles(styles)(SmartRoomPage);

export default styledSmartRoomPage;
