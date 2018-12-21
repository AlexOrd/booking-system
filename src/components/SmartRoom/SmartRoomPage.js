import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {IotData} from 'aws-sdk';
import MqttClient from 'mqtt/lib/client';
import v4 from 'aws-signature-v4';
import websocket from 'websocket-stream';
import crypto from 'crypto';

import Switcher from './Widgets/Switcher/Switcher';
import WeatherTile from './Widgets/Tile/WeatherTile';
import WindTile from './Widgets/Tile/WindTile';
import HumidityTile from './Widgets/Tile/HumidityTile';
import {openWeatherAPI, AWSConfigs} from '../../../config';
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
      position: 'fixed',
      bottom: 0,
      justifyContent: 'space-between',
      paddingBottom: theme.spacing.vertical
    },
};

class SmartRoomPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 0.0,
      description: '',
      iotThings: [],
      wind: {
        speed: 0
      }
    }
  }

  getWeatherInfo = () => {
    fetch(`${openWeatherAPI.apiLink}/weather?id=${openWeatherAPI.cityCode}&appid=${openWeatherAPI.apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        let fogAlts = ['Haze', 'Mist', 'Smoke']; // possible synonimic words for a Fog description in response
        this.setState({
          temperature: data.main.temp,
          description: data.weather[0].description,
          image: fogAlts.includes(data.weather[0].main) ? 'Fog' : data.weather[0].main,
          humidity: data.main.humidity,
          wind: data.wind,
        })
      })
      .catch(error => console.log('error is', error));
  };

  getIotThingsInfo = () => {
    let roomName = this.props.calendar.summary.replace(' ', ''); // AWS group names don't allow spaces
    let url = `${AWSConfigs.AWSApiGateway}/things/${roomName}`;
    axios( {
      url: url,
      method: 'GET',
      headers: { 'X-Api-Key': AWSConfigs.ApiGatewayXKey }
    })
    .then((responseJson) => {
      let things= responseJson.data;
      if(things)
        this.setState({iotThings: things})
    })
    .catch(error => console.log('Error while accessing AWS API Gateway: ' + error))
  };

  componentDidMount(){
    this.getWeatherInfo();
    this.getIotThingsInfo();
    this.establishConnection();
    // creating  of one iotData instance and passing it as a param to every thing tile
    this.setState({iotData:
        new IotData({
        endpoint: AWSConfigs.IoTEndpoint,
        region: AWSConfigs.AWSRegion,
        accessKeyId: AWSConfigs.AWSAccessKeyId,
        secretAccessKey: AWSConfigs.AWSSecretKey
        })
    })
  }

  establishConnection = () => {
      this.client = new MqttClient(() => {
        let url = v4.createPresignedURL(
          'GET',
         AWSConfigs.IoTEndpoint.toLowerCase(),
          '/mqtt',
          'iotdevicegateway',
          crypto.createHash('sha256').update('', 'utf8').digest('hex'),
          {
            'key': AWSConfigs.AWSAccessKeyId,
            'secret': AWSConfigs.AWSSecretKey,
            'region': AWSConfigs.AWSRegion,
            'protocol': 'wss',
            'expires': 15
          }
        );

        return websocket(url, [ 'mqttv3.1' ]);
      });

      this.client.on('connect', () => {
        console.log('Connected to AWS IoT');
        this.client.subscribe('$aws/things/+/shadow/update');
      });

      this.client.on('close', () => {
        console.log('Connection closed');
        this.client.end();
        this.client = undefined;
      });

      this.client.on('message', (topic, message) => {
      let topicThingName = topic.split('/')[2];
      let decodedMessage = JSON.parse(message.toString());

      //if message comes from device itself (as a reported object) - rewrite the iotThings array
      //TODO: make the rewriting field independent
      if(decodedMessage.state && decodedMessage.state.reported){
        let iotThings = this.state.iotThings.map(thing => {
          if(thing.thingName === topicThingName)
            return {...thing, status: decodedMessage.state.reported.status};
          return thing;
        });

        this.setState({iotThings: iotThings});
      }
      });
    }

    componentWillUnmount() {
      this.client.on('close', () => {
        console.log('Connection closed');
        this.client.end();
        this.client = undefined;
      });
    }

  updateThingShadow = (thingName, payload) => {
    let params = {
      topic: `$aws/things/${thingName}/shadow/update`, /* required */
      payload:`{"state": {"desired":${JSON.stringify(payload)}}}`,
      qos: 0
    };

    this.state.iotData.publish(params, function(err, data) {
      if (err)
        console.log(err, err.stack); // an error occurred
      else
        console.log(data);           // successful response
    });
  }
  render () {

    const {classes } = this.props;

    return (
      <Paper  className={classes.root} elevation={1}>
        <Grid container spacing={40}>
          <Grid item direction={'column'} xs={6}>
            {this.state.iotThings.map(thing =>
            <Switcher key={thing.thingName}
                      title={thing.publicName}
                      status={thing.status}
                      thingName={thing.thingName}
                      publish={this.updateThingShadow}/>
              )}
          </Grid>
          <Grid item direction={'column'} xs={6}>
            <WeatherTile number={Number.parseFloat(this.state.temperature).toFixed(1)} description={this.state.description} image={this.state.image}/>
            <WeatherTile number={21} description={'in office'} image={'OfficeIcon'}/>
            <div style={{display: 'flex'}}>
              <HumidityTile humidity={this.state.humidity}></HumidityTile>
              <WindTile wind={this.state.wind}></WindTile>
            </div>
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
  classes: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired
};


// Styles encapsulation
const styledSmartRoomPage = withStyles(styles)(SmartRoomPage);

// Redux connectors
function mapStateToProps(state) {
  return {
    calendar: state.calendarData.calendar,
  };
}
export default connect(mapStateToProps)(styledSmartRoomPage);
