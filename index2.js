const { nextISSTimesForMyLocation } = require("./iss_promised");


nextISSTimesForMyLocation()
.then((data) => {
  console.log(data);
})
.catch((error) => {
  console.log('it didnt work ', error.message);
});