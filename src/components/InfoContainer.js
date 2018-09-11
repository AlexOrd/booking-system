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

const styles = {
  card: {
    maxWidth: 650,
  },
  media: {
    height: 330,
    backgroundColor: '#3f51b5'
  },
};

const InfoContainer = (props) => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Room images"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Meeting Room #1
          </Typography>
          <Typography component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec tempor purus, eu ullamcorper dolor. Donec at justo quis lacus mattis egestas sed id quam. Praesent sit amet elit at metus fermentum pellentesque porttitor et tortor. Proin imperdiet, justo non porttitor posuere, leo libero consequat libero, vitae fringilla purus augue quis nulla. Aliquam eu urna a magna scelerisque dictum. Proin tristique tincidunt ligula, et egestas quam volutpat eget. Pellentesque varius magna in orci lacinia, eget suscipit ipsum ultricies.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to="/new">
          <Button variant="contained" size="large" color="primary">
            RESERVE
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

InfoContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoContainer);
