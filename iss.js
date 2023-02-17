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
    };
    const data = JSON.parse(body);
    if (!data.success) {
      const msg = `success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}.`;
      callback(Error(msg), null);
      return;
    };
    if (body) {
      let latLong = {
        latitude: data.latitude,
        longitude: data.longitude
      };
      callback(latLong);
    }
  });
};



module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};