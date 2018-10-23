import React from 'react';
import PropTypes from "prop-types";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as moment from 'moment';
import * as actions from '../../actions/calendarDataActions';

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
      height: 590,
      display: 'flex',
      justifyContent: 'space-between',
      flexFlow: 'column',
    },
    sliderContainer: {
      width: '100%',
      height: '80%',
    },
    actions: {
      marginTop: '35px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    buttons: theme.buttons,
};

class LockScreenPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const calendarId = this.props.newsCalendar && this.props.newsCalendar.id;
    if (calendarId) {
      const timeMin = moment().startOf('day').format();
      const timeMax = moment().endOf('day').format();
      const updateNews = () => {
        this.props.actions.loadNews(calendarId, timeMin, timeMax);
      };

      this.interval = setInterval(updateNews.bind(this), 6000);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render () {

    const { classes, news } = this.props;
    const newsImgs = [];
    news.forEach((daily) => {
      newsImgs.push(...daily.description.trim().split(/\r?\n/));
    })
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      autoplaySpeed: 4000,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Paper className={classes.root} elevation={1}>
        <Slider className={classes.sliderContainer} {...settings}>
          {newsImgs.map((imgSrc, index) => {
            return (
              <div key={index} >
                <img src={imgSrc} />
              </div>
            );
          })}
        </Slider>
        <CardActions className={classes.actions}>
          <Button className={classes.buttons} component={Link} to="/room" variant="contained" size="large" color="primary">
            SMART ROOM SYSTEM
          </Button>
          <Button className={classes.buttons} component={Link} to="/home" variant="contained" size="large" color="primary" >
            RESERVE MEETING ROOM
          </Button>
        </CardActions>
      </Paper>
    );
  }
}

LockScreenPage.propTypes = {
  classes: PropTypes.object.isRequired,
  newsCalendar: PropTypes.object.isRequired,
  news: PropTypes.array.isRequired,
  actions:  PropTypes.object,
};

// Styles encapsulation
const styledLockScreenPage = withStyles(styles)(LockScreenPage);

// Redux connectors
function mapStateToProps(state) {
  return {
    newsCalendar: state.calendarData.newsCalendar,
    news: state.calendarData.news,
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
)(styledLockScreenPage);
