const router = require('express').Router();
const Amadeus = require('amadeus');
const fetch = require('node-fetch');
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
    let currency;
    for (let i = 0; i < data.length; i++) {
      if (data[i].offers[0].price.currency) {
        currency = data[i].offers[0].price.currency;
        break;
      }
    }
    const currencyData = await fetch(
      `http://api.openrates.io/latest?base=${currency}`
    );
    const fetchRes = await currencyData.json();
    const hotels = data.map(el => {
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
