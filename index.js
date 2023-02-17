// index.js
// // const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP('66.222',  (error, data) => {
//   if (error) {
//     console.log(error, null)
//   };
//   if (data) {
//     console.log(null, data)
//   }
// });
// fetchCoordsByIP('66.183.244.222', (error, data) => {
//   if (error) {
//     console.log(error, null)
//   };
//   if (data) {
//     console.log(null, data)
//   }
// });
// { latitude: '49.2827291', longitude: '-123.1207375'}
// fetchISSFlyOverTimes({ latitude: '49.2827291', longitude: '-123.1207375'}, (error, data) => {
//   if (error) {
//     console.log(error, null);
//     return;
//   }
//   if (data) {
//     console.log("passes", data);
//   }
// });

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});