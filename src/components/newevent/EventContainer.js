import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { Chart } from "react-google-charts";
import CircularProgressbar from 'react-circular-progressbar';
import * as moment from 'moment';
import cx from 'classnames';

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
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column'
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
    marginBottom: '5px',
    display: 'flex',
    flexDirection: 'column'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.vertical
  },
};

const columns = [
  { type: "string", id: "id" },
  { type: "string", id: "Meeting" },
  { type: 'string', role: 'style' },
  { type: "date", id: "Start" },
  { type: "date", id: "End" }
];

// const rows = [
//   ['FREE', "", '#00ff00', moment.add(2, 'hours'), new Date(1809, 2, 4)],
//   ['BUSY', "Washington", '#ff0000', new Date(1789, 3, 30), new Date(1797, 2, 4)],
//   ['BUSY', "Adams",  '#ff0000', new Date(1800, 2, 4), new Date(1801, 2, 4)]
// ];

const rows = [
  ['FREE', "", theme.palette.primary1Color, moment().startOf('day'), moment().startOf('day').add(2, 'hours')],
  ['BUSY', "Long meeting", theme.palette.accent1Color, moment().startOf('day').add(2, 'hours'), moment().endOf('day').subtract(4, 'hours')],
  ['FREE', "", theme.palette.primary1Color, moment().endOf('day').subtract(4, 'hours'), moment().endOf('day')]
];

const options = {
  timeline: {
    groupByRowLabel: true,
    showRowLabels: false,
    rowLabelStyle: {
        fontName: theme.fontFamily,
        fontSize: 14,
        textTransform: 'uppercase',
        color: '#333333'
    },
    barLabelStyle: {
        fontName: theme.fontFamily,
        textTransform: 'uppercase',
        fontSize: 14
    }
  },
  avoidOverlappingGridLines: true,

};



class EventContainer extends React.Component {
  state = {
    name: 'Meeting title',
    selectedDate: new Date(),
    datepicker: new Date(),
    refresh: Date.now()
  };

  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({ refresh: Date.now() });
  //   }, 1000);
  // }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  onDateChange = datepicker => this.setState({ datepicker });

  render() {
    const { classes } = this.props;


    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="images/room.jpg"
            title="Room images"
          />
          <CircularProgressbar
            percentage={66}
            className={classes.progressBar}
          />
        </CardActionArea>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="headline" component="h1">
              Meeting Room #1
            </Typography>
            <div>

            </div>
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
                  className: cx(classes.formLabel, classes.color),
                }}
                fullWidth
              />
              <div>
                <div className={classes.dateField}>
                  <InputLabel htmlFor="date" className={cx(classes.dateLabel, classes.color)} >Date</InputLabel>
                  <DatePicker
                    id='date'
                    onChange={this.onDateChange}
                    value={this.state.datepicker}
                    minDate={new Date()}
                    className={classes.calendar}
                  />
                </div>
              </div>
              <FormGroup row className={classes.formGroup}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="from-time" className={cx(classes.formLabel, classes.color)} >From</InputLabel>
                  <TimeInput
                    id='from-time'
                    mode='12h'
                    className={classes.form2Input}
                    onChange={(fromTime) => this.handleChange(fromTime)}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="to-time" className={cx(classes.formLabel, classes.color)}>To</InputLabel>
                  <TimeInput
                    id='to-time'
                    mode='12h'
                    className={classes.form2Input}
                    onChange={(toTime) => this.handleDateChange(toTime)}
                  />
                </FormControl>
              </FormGroup>
            </form>
            <div className={classes.chart}>
              <Chart
                chartType="Timeline"
                options={options}
                data={[columns, ...rows]}
                height='150px'
                width='610px'
              />
            </div>
          </CardContent>
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
