const router = require('express').Router();
const bluebird = require('bluebird');
const hotelsAPI = require('../db/models/hotelsAPI');
const redisClient = require('redis').createClient(process.env.HEROKU_REDIS_RED_URL);
module.exports = router;

bluebird.promisifyAll(redisClient);

redisClient.on('error', function(err) {
  console.log('Error ' + err);
});

router.get('/', async (req, res, next) => {
  try {
    let hotelReply = await redisClient.getAsync('hotels');
    if (hotelReply !== null) {
      hotelReply = JSON.parse(hotelReply);
    } else {
      let data = await hotelsAPI.getHotels();
      hotelReply = data;
      await redisClient.setAsync('hotels', JSON.stringify(data));
    }

    let ourBestHotels = await hotelsAPI.conversion(hotelReply);

    res.json(ourBestHotels);
  } catch (error) {
    console.error(error);
  }
});
