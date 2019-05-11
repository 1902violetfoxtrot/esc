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

router.get('/', async (req, res, next) => {
  try {
    const { origin, destination, departureDate, direction } = req.query;
    const key = `${origin}-${destination} ${departureDate}`;
    let flightReply = await redisClient.getAsync(key);
    if (flightReply !== null) {
      flightReply = JSON.parse(flightReply);
    } else {
      flightReply = await flightsAPI.getFlights(
        origin,
        destination,
        departureDate
      );
      await redisClient.setAsync(key, JSON.stringify(flightReply));
    }

    let ourBestFlights = flightsAPI.getIATA(flightReply);
    const vacationPlace = direction === 'from' ? origin : destination;

    res.json({ ourBestFlights, vacationPlace });
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
