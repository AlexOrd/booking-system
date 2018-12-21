import * as localConfig from './localConfig.js';

const googleApi = process.env.PRODUCTION_MODE == 'ON' ?
  {
    "apiKey": process.env.API_KEY,
    "clientId": process.env.CLIENT_ID,
    "discoveryDocs": [process.env.DISCOVERY_DOCS],
    "scope": process.env.SCOPE
  } : localConfig.googleApi;

const openWeatherAPI = process.env.PRODUCTION_MODE == 'ON' ?
  {
    "apiLink" : process.env.WEATHER_API_LINK,
    "apiKey" : process.env.WEATHER_API_KEY,
    "cityCode": process.env.WEATHER_CITY_CODE,
  } : localConfig.openWeatherAPI;

const AWSConfigs = process.env.PRODUCTION_MODE == 'ON' ?
{
  "AWSAccessKeyId" : process.env.AWS_KEY_ID,
  "AWSSecretKey" : process.env.AWS_SECRET_KEY,
  "AWSRegion" : process.env.AWS_REGION,
  "AWSApiGateway": process.env.AWS_GATEWAY,
  "ApiGatewayXKey": process.env.AWS_GATEWAY_XKEY,
  "IoTEndpoint": process.env.AWS_IOT
} : localConfig.AWSConfigs;

export { googleApi, openWeatherAPI, AWSConfigs };
