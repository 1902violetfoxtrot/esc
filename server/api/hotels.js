const router = require('express').Router();
const Amadeus = require('amadeus');
module.exports = router;

router.get('/testCall', async (req, res, next) => {
  try {
    let amadeus = await new Amadeus({
      clientId: process.env.AMADEUS_CLIENT_ID,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET
    });
    const response = await amadeus.shopping.hotelOffers.get({
      longitude: 2.3522,
      latitude: 48.8566
    });
    const { data } = await response;
    const hotels = data.map(el => {
      if (el.offers[0].price.base) {
        return {
          name: el.hotel.name,
          price: el.offers[0].price.base,
          currency: el.offers[0].price.currency
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
