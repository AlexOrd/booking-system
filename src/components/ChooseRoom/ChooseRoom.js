import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/calendarDataActions';
import {bindActionCreators} from 'redux';

// Material
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from './../muiTheme';

const styles = {
  root: {
    ...theme.root,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  settingsContainer: {
    width: '100%',
    height: '100%',
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
  },
  roomsContainer: {
    maxHeight: 390,
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    height: theme.root.height - 200,
    width: theme.root.width - 50,
  },
  actions: {
    width: theme.spacing.width,
    justifyContent: "space-around",
  },
  media: {
    height: theme.spacing.mediaHeightSmall,
    backgroundColor: theme.palette.primary1Color
  },
  roomCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "space-around",
    width: theme.spacing.cardMinWidth,
    marginTop: '10px'
  },
  roomCardContent: {
    color: theme.palette.accent1Color,
    fontSize: theme.text.subtitle,
    display: 'flex'
  }
};

class ChooseRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
		this.props.actions.getCalendarList();
	}

  selectRoomCalendar = (roomData, index) => {
    const currentRoomData = {
      ...roomData,
      imageId: index
    };
    const currentRoomNews = this.props.calendarNewsList.find(newsCalendar => newsCalendar.summary.includes(currentRoomData.summary));
    localStorage.setItem('ROOM', JSON.stringify(currentRoomData));
    this.props.actions.setCalendarData(currentRoomData);
    this.props.actions.setCalendarNews(currentRoomNews);
    this.props.history.push('/');
  };


  render () {
    const { calendarList, classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <Card className={classes.settingsContainer}>
          <Typography className={classes.title} gutterBottom variant="headline" component="h2">
            Select a room
          </Typography>
          <CardContent className={classes.roomsContainer}>
            {calendarList.map((room, index) => {
              return (
                <Card key={room.id} className={classes.roomCard}>
                  <CardMedia
                    className={classes.media}
                    image={`images/room${index}.jpg`}
                    title="Room image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h3">
                      {room.summary}
                    </Typography>
                    <Typography className={classes.roomCardContent}>
                      {room.description || 'No description'}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="medium" color="primary"  onClick={() => this.selectRoomCalendar(room, index)}>
                      Select
                    </Button>
                    <Button disabled size="medium" color="primary">
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </CardContent>
          <CardActions>
            <Link to="/">
              <Button variant="contained" size="large" color="primary">
                BACK
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}

ChooseRoom.propTypes = {
  calendarList: PropTypes.array,
  calendarNewsList: PropTypes.array,
  history: PropTypes.object,
  actions: PropTypes.object,
  classes: PropTypes.object,
};

const styledChooseRoom = withStyles(styles)(ChooseRoom);

function mapStateToProps(state) {
  return {
    calendarList: state.calendarData.calendarList,
    calendarNewsList: state.calendarData.calendarNewsList,
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
)(styledChooseRoom);
