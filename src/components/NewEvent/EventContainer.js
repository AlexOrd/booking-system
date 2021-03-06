import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import Chart from './Chart'
import cx from 'classnames';

// Material
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import theme from '../muiTheme';

import TimeInput from 'material-ui-time-picker'

const styles ={
  card: {
    width: theme.spacing.cardMaxWidth,
  },
  color: {
    color: theme.palette.primary1Color
  },
  dateLabel:{
    fontSize: theme.text.form.formLabel.fontSize *3/4
  },
  progressBar: theme.components.progressBar,
  chart: theme.components.chart,
  media: {
    height: theme.spacing.mediaHeightSmall / 2,
    width: theme.spacing.cardMaxWidth,
    backgroundColor: theme.palette.primary1Color
  },
  content: {
    height: '380px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between'
  },
  form: {
    height: '270px',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
    justifyContent: 'center',
  },
  ...theme.text.form,
  calendar: theme.components.calendar,
  textField: {
    marginLeft: '16px',
    marginRight: '16px',
    fontSize: theme.text.input,
    height: '100px'
  },
  dateField: {
    width: '230px',
    marginBottom: '25px',
    display: 'flex',
    flexDirection: 'column'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.vertical
  },
  selectContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '500px',
  },
  formControl: {
    width: '230px',
  },
  buttons: theme.buttons,
};

const EVENT_TITLES = [
  'Daily meeting',
  'Office meeting',
  'Emergency meeting'
];

const EventContainer = (props) => {
    const {
      classes,
      calendar,
      events,
      selectedDate,
      isLoading,
      meetingTitle,
      onTitleChange,
      onStartTimeChange,
      onEndTimeChange,
      onDateChange,
      onReserve
    } = props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="images/room1.jpg"
            title="Room images"
          />
        </CardActionArea>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="headline" component="h1">
              Meeting Room &quot;{calendar.summary}&quot;
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
              <div className={classes.selectContainer} >
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="title-selector">Select event title</InputLabel>
                  <Select
                    value={meetingTitle}
                    onChange={onTitleChange}
                    inputProps={{
                      name: 'Select event title',
                      id: 'title-selector',
                    }}
                  >
                    { EVENT_TITLES.map((title, index) => <MenuItem key={index} value={title}>{title}</MenuItem>) }
                  </Select>
                </FormControl>
                <div className={classes.dateField}>
                  <InputLabel htmlFor="date" className={cx(classes.dateLabel, classes.color)} >Date</InputLabel>
                  <DatePicker
                    id='date'
                    onChange={onDateChange}
                    value={selectedDate}
                    minDate={new Date()}
                    className={classes.calendar}
                  />
                </div>
              </div>
              <FormGroup row className={classes.selectContainer}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="from-time" className={cx(classes.formLabel, classes.color)} >From</InputLabel>
                  <TimeInput
                    id='from-time'
                    mode='12h'
                    className={classes.form2Input}
                    onChange={onStartTimeChange}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="to-time" className={cx(classes.formLabel, classes.color)}>To</InputLabel>
                  <TimeInput
                    id='to-time'
                    mode='12h'
                    className={classes.form2Input}
                    onChange={onEndTimeChange}
                  />
                </FormControl>
              </FormGroup>
            </form>
            <Chart
              events={events}
              date={selectedDate}
              isLoading={isLoading}
            />
          </CardContent>
        <CardActions className={classes.actions}>
          <Button className={classes.buttons} component={Link} to="/home" variant="contained" size="large" color="secondary">
            BACK
          </Button>
          <Button className={classes.buttons} variant="contained" size="large" color="primary" onClick={onReserve}>
            RESERVE
          </Button>
        </CardActions>
      </Card>
    );
}

EventContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  selectedDate: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  meetingTitle: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onReserve: PropTypes.func.isRequired,
};

export default withStyles(styles)(EventContainer);
