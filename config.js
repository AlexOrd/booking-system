const googleApi = process.env.PRODUCTION_MODE == 'ON' ?
  {
    "apiKey": process.env.API_KEY,
    "clientId": process.env.CLIENT_ID,
    "discoveryDocs": [process.env.DISCOVERY_DOCS],
    "scope": process.env.SCOPE
  } :
  {
  };

const openWeatherAPI = process.env.PRODUCTION_MODE == 'ON' ?
  {
    "apiLink" : process.env.WEATHER_API_LINK,
    "apiKey" : process.env.WEATHER_API_KEY,
    "cityCode": process.env.WEATHER_CITY_CODE,
  } :
  {
  };

export {googleApi, openWeatherAPI};
