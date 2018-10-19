import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartComponent }  from "react-google-charts";
import * as moment from 'moment';

// Material
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import theme from './../muiTheme';

const styles = {
  chart: {
    ...theme.components.chart,
    justifyContent: 'center'
  }
};

const FREE_MARK = {
  title: 'Free',
  color: '#00ff00'
}
const BUSY_MARK = {
  title: 'Busy',
  color: '#ff0000'
}

const CHART_OPTIONS = {
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

const COLUMNS_OPTIONS = [
  { type: 'string', id: 'id' },
  { type: 'string', id: 'Meeting' },
  { type: 'string', role: 'style' },
  { type: 'date', id: 'Start' },
  { type: 'date', id: 'End' }
];

const Chart = (props) => {
  const { date, events, classes, isLoading } = props;
  const startOfDay = moment(date).startOf('day');
  const endOfDay = moment(date).endOf('day');
  const chartData = [];
  let tempTime = startOfDay;

  if (events.length) {
    events.forEach(event => {
      const startTime = moment(event.start.dateTime);
      const endTime = moment(event.end.dateTime);

      if (startTime.isAfter(tempTime)) {
        chartData.push([FREE_MARK.title, 'The room is available.', FREE_MARK.color, tempTime, startTime]);
      }

      chartData.push([BUSY_MARK.title, event.summary, BUSY_MARK.color, startTime, endTime]);
      tempTime = endTime;
    });
  } else {
    chartData.push([FREE_MARK.title, 'The room is available.', FREE_MARK.color, startOfDay, endOfDay]);
  }

  return (
    <div className={classes.chart}>
      { !isLoading &&
        <ChartComponent
          chartType="Timeline"
          options={CHART_OPTIONS}
          data={[COLUMNS_OPTIONS, ...chartData]}
          height='150px'
          width='610px'
        />
      }
      { isLoading &&
        <CircularProgress />
      }
    </div>
  );
};

Chart.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Chart);
