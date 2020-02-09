const request = require("request");

const geocode = (address, callback) => {
  //? 会自动被编码
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoia3lsZTc4Nzg3OCIsImEiOiJjazZhOGo5OTUwbzB5M21wb3UwcXA2b3lnIn0.84uArURkoarhFK9-fimhkw&language=chinese";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longtitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
