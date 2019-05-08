const router = require('express').Router();
const redis = require('redis');
const redisClient = redis.createClient();
const bluebird = require('bluebird');
const flightsAPI = require('../db/models/flightsAPI')

module.exports = router;

bluebird.promisifyAll(redisClient);

redisClient.on('error', function(err) {
  console.log('Error ' + err);
});

router.get('/', async (req, res, next) => {
  try {
    let flightReply = await redisClient.getAsync('flights');
    if (flightReply !== null) {
      flightReply = JSON.parse(flightReply);
    } else {
      flightReply = await flightsAPI.getFlights();
      await redisClient.setAsync('flights', JSON.stringify(flightReply));
    }
    
    let ourBestFlights = flightsAPI.getIATA(flightReply)

    res.json(ourBestFlights);
  } catch (err) {
    next(err);
  }
});
