import React from 'react';
import PropTypes from "prop-types";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';
import * as actions from '../../actions/calendarDataActions';

// Material
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const defaultSlide = 'images/logo.png';

const styles = {
    slide: {
      margin: "20px 10px",
      position: "relative",
      height: "500px",
    },
    img: {
      position: "absolute",
      margin: "auto",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0"
    }
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
    const newsImgs = [ defaultSlide ];
    news.forEach((daily) => {
      if (daily.description) {
        newsImgs.push(...daily.description.trim().split(/\r?\n/));
      }
    })
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      autoplaySpeed: 4000,
      autoplay: true,
      adaptiveHeight: true,
      fade: true,
      // touchMove: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Paper component={Link} to="/home" elevation={1}>
        <Slider {...settings}>
          {newsImgs.map((imgSrc, index) => {
            return (
              <div className={classes.slide} key={index}>
                <img className={classes.img} src={imgSrc} />
              </div>
            );
          })}
        </Slider>
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
