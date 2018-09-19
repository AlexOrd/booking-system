import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

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
  root: theme.root,
  roomsContainer: {
    ...theme.components.roomsContainer,
    height: theme.root.height - 200,
    width: theme.root.width - 50,
  },
  card: {
    width: theme.spacing.width
  },
  actions: {
    width: theme.spacing.width
  },
  media: {
    height: theme.spacing.mediaHeightSmall,
    backgroundColor: theme.palette.primary1Color
  },
  roomCard: {
    width: theme.spacing.cardMinWidth
  },
  roomCardContent: {
    color: theme.palette.accent1Color,
    fontSize: theme.text.title,
    display: 'flex'
  }
};


const mockRooms = Array.from(Array(4).keys()).map((v) => (
  {
    key: v,
    label: `Room #${v}`,
    image: `images/room${v}.jpg`,
    capacity: Math.floor(Math.random()*20),
    beamer: true
  }));

const ChooseRoom = (props) => {
  const { classes } = props;

  const handleClick =(roomId)=> {
    localStorage.setItem('ROOM_ID', roomId);
    window.location.assign('/');
  }

  return (
    <Paper className={classes.root} elevation={1}>
      <Card className={classes.card}>
        <CardContent className={classes.container}>
          <Typography gutterBottom variant="headline" component="h2">
            Select a room
          </Typography>

          <div className={classes.roomsContainer} elevation={2}>
            {mockRooms.map(room => {
              return (
               <Card key={room.key} className={classes.roomCard}>
                 <CardMedia
                   className={classes.media}
                   image={room.image}
                   title="Room image"
                 />
                 <CardContent>
                    <Typography gutterBottom variant="headline" component="h3">
                     {room.label}
                    </Typography>
                   <Typography className={classes.roomCardContent}>
                     Room capacity: {room.capacity}
                   </Typography>
                   <Typography className={classes.roomCardContent}>
                    Beamer: {room.beamer ? <i className="material-icons">done</i> : <i className="material-icons">remove</i>}
                   </Typography>
                 </CardContent>
                 <CardActions>
                   <Button size="medium" color="primary"  onClick={() => handleClick(room.key)}>
                     Select
                   </Button>
                   <Button disabled size="medium" color="primary">
                     Remove
                   </Button>
                 </CardActions>
               </Card>
              );
            })}
          </div>
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
};

ChooseRoom.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ChooseRoom);
