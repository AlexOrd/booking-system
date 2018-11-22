import React, {PureComponent}  from 'react';
import PropTypes from "prop-types";

import Toggle from 'react-toggle';
import {Card, CardContent, Typography, CardMedia} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles/index";
import theme from '../../../muiTheme';

const styles = {
  weatherTile: {
    flex: '1 0 auto',
    minWidth: 260
  },
  card: {
    display: 'flex',
    marginTop: theme.spacing.vertical,
    marginRight: theme.spacing.vertical
  },
  weatherSubtitle: {
    fontSize: 30,
    color: theme.palette.accent1Color
  },
  info: {
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    width: 155,
    backgroundSize: '80%'
  }
};

class Weather extends PureComponent{
  constructor(props) {
    super(props);
  }

  render() {
    const {classes } = this.props;
    return (
      <Card className={classes.card}>
        <div className={classes.info}>
          <CardContent className={classes.weatherTile}>
              <Typography component="h2" variant="display3">
                {`${this.props.number}°C`}
              </Typography>
              <Typography component="h5" variant="display1">
                {this.props.description}
              </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.image}
          image={`images/weather/png/${this.props.image}.png`}
          title="Live from space album cover"
        />
      </Card>

    );
  }
}

Weather.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default withStyles(styles)(Weather);
