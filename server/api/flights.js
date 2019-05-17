const router = require('express').Router();
const bluebird = require('bluebird');
const flightsAPI = require('../db/models/flightsAPI');
let redisClient;

if (process.env.HEROKU_REDIS_RED_URL) {
  redisClient = require('redis').createClient(process.env.HEROKU_REDIS_RED_URL);
} else {
  redisClient = require('redis').createClient();
}

module.exports = router;

bluebird.promisifyAll(redisClient);

redisClient.on('error', function(err) {
  console.log('Error ' + err);
});

const checkFlightInRedis = async (key, origin, destination, departureDate) => {
  const flightReply = await redisClient.getAsync(key);
  if (flightReply !== null) return JSON.parse(flightReply);
  const toReturn = await flightsAPI.getFlights(
    origin,
    destination,
    departureDate
  );
  await redisClient.setAsync(key, JSON.stringify(toReturn));
  return toReturn;
};

router.get('/', async (req, res, next) => {
  try {
    const {
      origin,
      destination,
      departureDate,
      direction,
      backup,
      backup2
    } = req.query;
    const key = `${origin}-${destination} ${departureDate}`;
    let flightReply = await checkFlightInRedis(
      key,
      origin,
      destination,
      departureDate
    );
    let cont = true;

    if (flightReply === 'no flights found!') {
      flightReply =
        direction === 'from'
          ? await checkFlightInRedis(
              `${origin}-${backup} ${departureDate}`,
              origin,
              backup,
              departureDate
            )
          : await checkFlightInRedis(
              `${backup}-${destination} ${departureDate}`,
              backup,
              destination,
              departureDate
            );
      if (flightReply === 'no flights found!') {
        flightReply =
          direction === 'from'
            ? await checkFlightInRedis(
                `${origin}-${backup2} ${departureDate}`,
                origin,
                backup2,
                departureDate
              )
            : await checkFlightInRedis(
                `${backup2}-${destination} ${departureDate}`,
                backup2,
                destination,
                departureDate
              );
        if (flightReply === 'no flights found!') {
          cont = false;
          res.json('no');
          res.end();
        }
      }
    }
    if (cont) {
      let ourBestFlights = flightsAPI.getIATA(flightReply);
      const vacationPlace = direction === 'from' ? origin : destination;
      res.json({ ourBestFlights, vacationPlace });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/closestAirport', async (req, res, next) => {
  try {
    const { longitude, latitude } = req.query;
    const data = await flightsAPI.getClosestAirport(longitude, latitude);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

function sleep(ms) {
  return new Promise(resolve => 
    setTimeout(resolve, ms));
}
