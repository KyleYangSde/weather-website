const request = require("request");
const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/d1531c71ce89e81b2ef761b4269d1fa5/" +
    long +
    "," +
    lat +
    "?lang=zh";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to connect to find location", undefined);
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          "It is curently " +
          response.body.currently.temperature +
          " degress out. There is a " +
          response.body.currently.precipProbability +
          " chance to rain"
      );
    }
  });
};

module.exports = forecast;
