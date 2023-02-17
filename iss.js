const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=jsoncallback', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (body) {
      callback(null, body);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const link = 'http://ipwho.is/';
  request(link + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);
    if (!data.success) {
      const msg = `success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}.`;
      callback(Error(msg), null);
      return;
    }
    if (body) {
      let latLong = {
        latitude: data.latitude,
        longitude: data.longitude
      };
      console.log("latLong", latLong)
      callback(null, latLong);
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  console.log("coords", coords);
  const lat = coords.latitude;
  const lon = coords.longitude;
  const link = `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`;
  request(link, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${data.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    if (body) {
      callback(null, data.response);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(data, (error, data) => {
  if (error) {
    callback(error, null);
    return;
  }
  callback(null, data);
  });
});
});
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};