// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  ip = JSON.parse(body).ip
  const link = 'http://ipwho.is/';
  return request(link + ip);
};

const fetchISSFlyOverTimes = (body) => {
  const coords = JSON.parse(body);
  const lat = coords.latitude;
  const lon = coords.longitude;
  const link = `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`;
  return request(link);
}

const nextISSTimesForMyLocation = (body) => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    const { response } = JSON.parse(data);
    return response;
  })
};

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
 };