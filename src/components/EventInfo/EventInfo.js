import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

// Material
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import theme from './../muiTheme';

const styles = {
    root: theme.root,
    chipsContainer: {
      ...theme.components.chipsContainer,
      padding: theme.spacing.chipsSpacing,
    },
    chip: {
      margin: theme.spacing.chipsSpacing,
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
    container: {
      ...theme.container
    }
};

const mockListData = Array.from(Array(28).keys()).map((v) => ({key: v, label: 'User Name'}));

const EventInfo = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <Card className={classes.card}>
        <CardActionArea className={classes.actions}>
          <CardMedia
            className={classes.media}
            image="images/room1.jpg"
            title="Room images"
          />
        </CardActionArea>
        <CardContent className={classes.container}>
          <Typography gutterBottom variant="headline" component="h2">
            Meeting Room #1
          </Typography>
          <Typography component="h3">
            Meeting title
          </Typography>
          <Typography component="h3">
            From: date To: date
          </Typography>
          <Typography component="h3">
            Status: ongoing
          </Typography>
          <Paper className={classes.chipsContainer} elevation={2}>
            {mockListData.map(data => {
              return (
                <Chip
                  key={data.key}
                  avatar={<Avatar>UN</Avatar>}
                  label={data.label}
                  className={classes.chip}
                  color="primary"
                />
              );
            })}
          </Paper>
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

EventInfo.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(EventInfo);
