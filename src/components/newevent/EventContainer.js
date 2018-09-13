import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { Chart } from "react-google-charts";
import CircularProgressbar from 'react-circular-progressbar';
import * as moment from 'moment';

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
  progressBar: {
    position: 'absolute',
    left: '580px',
    margin: '10px',
    height: 50,
    width: 50,
  },
  media: {
    height: 130,
    width: 650,
    backgroundColor: '#3f51b5'
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
    flexFlow: 'column',
    height: '230px'
  },
  textField: {
    marginLeft: '16px',
    marginRight: '16px',
    fontSize: '2em',
    height: '100px'
  },
  dateField: {
    marginBottom: '5px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  formInput: {
    fontSize: '1.5em'
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
    width: '380px',
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    width: '230px'
  }
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
  ['FREE', "", '#13A6E1', moment().startOf('day'), moment().startOf('day').add(2, 'hours')],
  ['BUSY', "Long meeting", '#0B314F', moment().startOf('day').add(2, 'hours'), moment().endOf('day').subtract(4, 'hours')],
  ['FREE', "", '#13A6E1', moment().endOf('day').subtract(4, 'hours'), moment().endOf('day')]
];

const options = {
  timeline: {
    groupByRowLabel: true,
    showRowLabels: false,
    rowLabelStyle: {
        fontName: 'Roboto Condensed',
        fontSize: 14,
        textTransform: 'uppercase',
        color: '#333333'
    },
    barLabelStyle: {
        fontName: 'Roboto Condensed',
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
              <div className={classes.dateField}>
                <DatePicker
                  onChange={this.onDateChange}
                  value={this.state.datepicker}
                />
              </div>
              <FormGroup row className={classes.formGroup}>
                <FormControl className={classes.formControl}>
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
            <Chart
              chartType="Timeline"
              options={options}
              data={[columns, ...rows]}
              height='150px'
              width='610px'
            />
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
