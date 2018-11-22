import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import Switcher from './Widgets/Switcher/Switcher';
import WeatherTile from './Widgets/Tile/WeatherTile';
import {openWeatherAPI} from '../../../config';

// Material
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import theme from './../muiTheme';

const styles = {
    root: {
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '5px',
      paddingTop: '5px',
      width: 1014,
      height: 590
    },
    sliderContainer: {
      width: '100%',
      height: '80%',
    },
    actions: {
      marginTop: '50px',
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.vertical
    },
};

class SmartRoomPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 0.0,
      description: ''
    }
  }

  componentDidMount(){
    fetch(`${openWeatherAPI.apiLink}/weather?id=${openWeatherAPI.cityCode}&appid=${openWeatherAPI.apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        let fogAlts = ['Haze', 'Mist', 'Smoke']; // possible synonimic words for a Fog description in response
        this.setState({
          temperature: data.main.temp,
          description: data.weather[0].description,
          image: fogAlts.includes(data.weather[0].main) ? 'Fog' : data.weather[0].main
        })
      })
      .catch(error => console.log('error is', error));
  }

  render () {

    const {classes } = this.props;

    return (
      <Paper  className={classes.root} elevation={1}>
        <Grid container spacing={40}>
          <Grid item direction={'column'} xs={6}>
            <Switcher title={'Main light'}/>
            <Switcher title={'Side light'}/>
          </Grid>
          <Grid item direction={'column'} xs={6}>
            <WeatherTile number={Number.parseFloat(this.state.temperature).toFixed(1)} description={this.state.description} image={this.state.image}/>
            <WeatherTile number={21} description={'in office'} image={'OfficeIcon'}/>
          </Grid>
        </Grid>

        <CardActions className={classes.actions}>
          <Button component={Link} to="/" variant="contained" size="large" color="secondary">
            BACK
          </Button>
        </CardActions>
      </Paper>
    );
  }
}

SmartRoomPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// Styles encapsulation
const styledSmartRoomPage = withStyles(styles)(SmartRoomPage);

export default styledSmartRoomPage;
