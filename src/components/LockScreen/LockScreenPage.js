import React from 'react';
import PropTypes from "prop-types";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

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

class LockScreenPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {

    const {classes } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      autoplaySpeed: 4000,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <Paper  className={classes.root} elevation={1}>
          <Slider className={classes.sliderContainer} {...settings}>
            <div>
              <img src="images/anna.jpg" />
            </div>
            <div>
              <img src="images/mike.jpg" />
            </div>
            <div>
              <img src="images/anna.jpg" />
            </div>
            <div>
              <img src="images/mike.jpg" />
            </div>
          </Slider>
        <CardActions className={classes.actions}>
          <Button component={Link} to="/room" variant="contained" size="large" color="primary">
            SMART ROOM SYSTEM
          </Button>
          <Button component={Link} to="/home" variant="contained" size="large" color="primary" >
            RESERVE MEETING ROOM
          </Button>
        </CardActions>
      </Paper>
    );
  }
}

LockScreenPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// Styles encapsulation
const styledLockScreenPage = withStyles(styles)(LockScreenPage);

export default styledLockScreenPage;
