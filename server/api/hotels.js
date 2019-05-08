const router = require('express').Router();
const Amadeus = require('amadeus');
const fetch = require('node-fetch');
const redis = require('redis');
const bluebird = require('bluebird');
const redisClient = redis.createClient();
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
    let hotelReply = await redisClient.getAsync('hotels');
    if (hotelReply !== null) {
      hotelReply = JSON.parse(hotelReply);
    } else {
      const response = await amadeus.shopping.hotelOffers.get({
        longitude: 2.3522,
        latitude: 48.8566
      });
      const { data } = response;
      hotelReply = data;
      console.log(data);
      await redisClient.setAsync('hotels', JSON.stringify(data));
    }
    console.log('undefined', hotelReply);
    let currency;
    for (let i = 0; i < hotelReply.length; i++) {
      if (hotelReply[i].offers[0].price.currency) {
        currency = hotelReply[i].offers[0].price.currency;
        break;
      }
    }
    const currencyData = await fetch(
      `http://api.openrates.io/latest?base=${currency}`
    );
    const fetchRes = await currencyData.json();
    const hotels = hotelReply.map(el => {
      if (el.offers[0].price.base) {
        let oldPrice = el.offers[0].price.base;
        let newPrice = oldPrice * fetchRes.rates.USD;
        let finalPrice = newPrice.toFixed(2);
        return {
          name: el.hotel.name,
          price: finalPrice,
          currency: 'USD'
        };
      }
    });
    const hotelz = hotels.filter(el => {
      if (el) return el;
    });
    let iter = 0;
    let hotel5 = [];
    while (hotel5.length < 5) {
      hotel5.push(hotelz[iter]);
      iter++;
    }
    res.json(hotel5);
  } catch (error) {
    console.error(error);
  }
});
