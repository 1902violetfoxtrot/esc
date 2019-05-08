const router = require('express').Router();
const Amadeus = require('amadeus');
const iataConvert = require('../../utils/utils');
const redis = require('redis');
const redisClient = redis.createClient();
const bluebird = require('bluebird');
module.exports = router;

bluebird.promisifyAll(redisClient);

redisClient.on('error', function(err) {
  console.log('Error ' + err);
});

router.get('/testCall', async (req, res, next) => {
  try {
    let amadeus = await new Amadeus({
      clientId: process.env.AMADEUS_CLIENT_ID,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET
    });
    let flightReply = await redisClient.getAsync('flights');
    if (flightReply !== null) {
      flightReply = JSON.parse(flightReply);
    } else {
      const response = await amadeus.shopping.flightOffers.get({
        origin: 'NYC',
        destination: 'KEF',
        departureDate: '2019-08-01'
      });
      const { data } = response;
      flightReply = data;
      await redisClient.setAsync('flights', JSON.stringify(data));
    }
    const flights = flightReply.map(el => {
      let carrierName = iataConvert(
        el.offerItems[0].services[0].segments[0].flightSegment.carrierCode
      );
      return {
        carrier: carrierName,
        class:
          el.offerItems[0].services[0].segments[0].pricingDetailPerAdult
            .travelClass,
        price: el.offerItems[0].price.total
      };
    });
    let iter = 0;
    let flightz = [];
    while (flightz.length < 7) {
      flightz.push(flights[iter]);
      iter++;
    }

    res.json(flightz);
  } catch (err) {
    next(err);
  }
});
