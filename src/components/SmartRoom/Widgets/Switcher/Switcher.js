import React, {PureComponent}  from 'react';
import PropTypes from "prop-types";

import Switch from 'react-switch';
import {Card, CardContent, Typography} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles/index";
import theme from '../../../muiTheme';

const styles = {
  switcher: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    marginTop: theme.spacing.vertical,
    marginLeft: theme.spacing.vertical,
  }
};

class Switcher extends PureComponent{
  constructor(props) {
    super(props);
  }

  handleSwitcherChange = () =>{
      this.props.publish(this.props.thingName, {status: !this.props.status});
  };

  render() {
    const {classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.switcher}>
          <Typography component="h5" variant="display1">
            {this.props.title}
          </Typography>
          <Switch checked={this.props.status}
                  onChange={this.handleSwitcherChange}
                  id={this.props.thingName}
                  height={60}
                  width={150}
                  onColor={'#1958A8'}
                  offColor={'#4D4D4D'}
                  handleDiameter={55}
                 />

        </CardContent>
      </Card>

    );
  }
}

Switcher.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  thingName: PropTypes.string.isRequired,
  publish: PropTypes.func.isRequired
};

export default withStyles(styles)(Switcher);
