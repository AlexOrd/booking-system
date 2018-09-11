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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import TimeInput from 'material-ui-time-picker'

const styles = {
  card: {
    width: 650,
  },
  media: {
    height: 130,
    width: 650,
    backgroundColor: '#3f51b5'
  },
  content: {
    height: '380px',
    width: '100%',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexFlow: 'column'
  },
  textField: {
    marginLeft: '16px',
    marginRight: '16px',
    width: 200,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};


class EventContainer extends React.Component {
  state = {
    name: 'Meeting title',
    selectedDate: new Date()
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Room images"
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="headline" component="h2">
              Meeting Room #1
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                id="name"
                label="Meeting title"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <TimeInput
                mode='12h'
                onChange={(time) => this.handleDateChange(time)}
              />
            </form>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Link to="/">
            <Button variant="contained" size="large" color="secondary">
              BACK
            </Button>
          </Link>
          <Button variant="contained" size="large" color="primary">
            RESERVE
          </Button>
        </CardActions>
      </Card>
    );
  }
}

EventContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventContainer);
