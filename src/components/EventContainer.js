import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';

import TimeInput from 'material-ui-time-picker'

const styles ={
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
    width: '80%',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexFlow: 'column',
    width: '90%'
  },
  textField: {
    marginLeft: '16px',
    marginRight: '16px',
    fontSize: '2em'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  formInput: {
    fontSize: '2em'
  },
  form2Input: {
    fontSize: '2em',
    width: '73%'
  },
  formLabel: {
    fontSize: '1em',
    color: '#1958A8'
  },
  form2Label: {
    fontSize: '2em',
    color: '#1958A8'
  },
  formGroup: {
    flexWrap:'nowrap',
    marginLeft: '90px'
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
            <Typography gutterBottom variant="headline" component="h1">
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
                InputProps={{
                  classes: {
                    input: classes.formInput,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.formLabel,
                }}
                fullWidth
              />
              <TextField
                id='date'
                type='date'
                label="Meeting date"
                defaultValue={moment().format('YYYY-MM-DD')}
                className={classes.textField}
                onChange={(date) => this.handleChange(date)}
                margin="normal"
                InputProps={{
                  classes: {
                    input: classes.formInput,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.formLabel,
                }}
                fullWidth
              />
              <FormGroup row className={classes.formGroup}>
                <FormControl>
                  <InputLabel htmlFor="from-time" className={classes.form2Label} >From</InputLabel>
                  <TimeInput
                    id='from-time'
                    mode='12h'
                    className={classes.form2Input}
                    onChange={(fromTime) => this.handleChange(fromTime)}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="to-time" className={classes.form2Label}>To</InputLabel>
                  <TimeInput
                    id='to-time'
                    mode='12h'
                    className={classes.form2Input}
                    onChange={(toTime) => this.handleDateChange(toTime)}
                  />
                </FormControl>

              </FormGroup>

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
