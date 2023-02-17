// index.js
// const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss')

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


fetchCoordsByIP('66.222',  (error, data) => {
  if (error) {
    console.log(error, null)
  };
  if (data) {
    console.log(null, data)
  }
});
// fetchCoordsByIP('66.183.244.222', (error, data) => {
//   if (error) {
//     console.log(error, null)
//   };
//   if (data) {
//     console.log(null, data)

//   }
// });