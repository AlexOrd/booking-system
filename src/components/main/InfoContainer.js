import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Material
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from './../muiTheme';

const styles = {
  card: {
    width: theme.spacing.cardMaxWidth,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: theme.spacing.mediaHeightLarge,
    backgroundColor: theme.palette.primary1Color
  },
  actions: {
    justifyContent: 'space-between',
    paddingTop: theme.spacing.vertical
  },
  buttons: theme.buttons,
};

const InfoContainer = (props) => {
  const { classes, calendar } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`images/room${calendar.imageId}.jpg`}
          title="Room images"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Meeting Room &quot;{calendar.summary}&quot;
          </Typography>
          <Typography>
            {calendar.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button className={classes.buttons} component={Link} to="/room" variant="contained" size="large" color="primary">
          SMART ROOM
        </Button>
        <Button className={classes.buttons} component={Link} to="/new" variant="contained" size="large" color="primary">
          RESERVE
        </Button>
      </CardActions>
    </Card>
  );
};

InfoContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  calendar: PropTypes.shape({
    imageId: PropTypes.number,
    summary: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default withStyles(styles)(InfoContainer);
