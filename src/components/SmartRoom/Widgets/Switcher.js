import React, {PureComponent}  from 'react';
import PropTypes from "prop-types";

import Toggle from 'react-toggle';
import {Card, CardContent, Typography} from '@material-ui/core';
import './Switcher.css';
import {withStyles} from "@material-ui/core/styles/index";
import theme from './../../muiTheme';

const styles = {
  switcher: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    marginTop: theme.spacing.vertical
  }
};

class Switcher extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {isToggled: /*this.props.tileProps.data.value*/ false};
  }

  handleSwitcherChange = () =>{
    // axios({
    //   method: 'put',
    //   url: `https://6k3sopzeng.execute-api.us-west-2.amazonaws.com/dev/${this.props.tileProps.id}/${this.props.tileProps.data.value}`,
    //   headers: {'x-api-key': 'aarClnTn29aECvc6f4FJe792wRSVfrJP6zalqpJg'} // API key created in AWS API Gateway and attached to
    // })                                                                    // its Usage plan. Expires in 364 days
    //   .then(res => {
        const prevState = this.state.isToggled;
        this.setState({isToggled: !prevState});
      // })
      // .catch(function(err) {
      //   console.log(err);
      // })
  };

  render() {
    const {classes } = this.props;
    console.log(this.props);
    return (
      <Card className={classes.card}>
        <CardContent className={classes.switcher}>
          <Typography component="h5" variant="title">
            {this.props.title}
          </Typography>
          <Toggle className={this.state.isToggled ? 'Switcher-right-align': 'Switcher-left-align'}
                  defaultChecked={this.state.isToggled}
                  onChange={this.handleSwitcherChange} />
        </CardContent>
      </Card>

    );
  }
}

Switcher.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Switcher);
