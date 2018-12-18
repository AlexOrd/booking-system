import React, {PureComponent}  from 'react';
import PropTypes from "prop-types";

import {Card, CardContent, Typography, CardMedia} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles/index";
import theme from '../../../muiTheme';

const styles = {
  weatherTile: {
    flex: '1 0 auto'
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
    width: 75,
    backgroundSize: '80%'
  }
};

class Wind extends PureComponent{
  constructor(props) {
    super(props);
  }

  render() {
    const {classes } = this.props;
    return (
      <Card className={classes.card}>
        <div className={classes.info}>
          <CardContent className={classes.weatherTile}>
            <Typography component="h3" variant="display2">
              {`${this.props.wind.speed} m/s`}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.image}
          image={`images/weather/wind.png`}
          title="Live from space album cover"
        />
      </Card>

    );
  }
}

Wind.propTypes = {
  classes: PropTypes.object.isRequired,
  wind: PropTypes.object.isRequired
};

export default withStyles(styles)(Wind);
