const router = require('express').Router();
const Amadeus = require('amadeus');
module.exports = router;

router.get('/testCall', async (req, res, next) => {
  try {
    let amadeus = await new Amadeus({
      clientId: process.env.AMADEUS_CLIENT_ID,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET
    });
    const response = await amadeus.shopping.flightOffers.get({
      origin: 'NYC',
      destination: 'MAD',
      departureDate: '2019-08-01'
    });
    const { data } = await response;
    const flights = data.map(el => {
      return {
        carrier:
          el.offerItems[0].services[0].segments[0].flightSegment.carrierCode,
        class:
          el.offerItems[0].services[0].segments[0].pricingDetailPerAdult
            .travelClass,
        price: el.offerItems[0].price.total
      };
    });
    let iter = 0;
    let flightz = [];
    while (flightz.length < 3) {
      flightz.push(flights[iter]);
      iter++;
    }

    res.json(flightz);
  } catch (err) {
    next(err);
  }
});
