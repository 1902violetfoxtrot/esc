const Amadeus = require('amadeus');
const iataConvert = require('../../../utils/utils');

class FlightsAPI {
  async getFlights(origin, destination, departureDate) {
    let amadeus = await new Amadeus({
      clientId: process.env.AMADEUS_CLIENT_ID,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET
    });
    const response = await amadeus.shopping.flightOffers.get({
      origin: `${origin}`,
      destination: `${destination}`,
      departureDate: `${departureDate}`
    });
    // const response = await amadeus.shopping.flightOffers.get({
    //   origin: 'NYC',
    //   destination: 'KEF',
    //   departureDate: '2019-08-01'
    // });
    const { data } = response;
    return data;
  }

  getIATA(flightReply, price) {
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

    let ourBestFlights = [];

    for (let i = 0; i < 7; i++) {
        if (flights[i].price < price)
        ourBestFlights.push(flights[i]);
    }

    return ourBestFlights;
  }
}

let flights = new FlightsAPI();

module.exports = flights;
