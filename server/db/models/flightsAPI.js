const Amadeus = require('amadeus');
const iataConvert = require('../../../utils/utils');

const amadeusClient = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

class FlightsAPI {
  async getFlights(origin, destination, departureDate) {
    const response = await amadeusClient.shopping.flightOffers.get({
      origin: `${origin}`,
      destination: `${destination}`,
      departureDate: `${departureDate}`
    });
    const { data } = response;
    return data;
  };

  getIATA(flightReply) {
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

    for (let i = 0; ourBestFlights.length < 3 && i < flights.length; i++) {
      if (flights[i].carrier) ourBestFlights.push(flights[i]);
    }

    return ourBestFlights;
  }

  async getClosestAirport(longitude, latitude) {
    let data = await amadeusClient.referenceData.locations.airports.get({
      longitude,
      latitude
    });
    return data;
  }
}

let flights = new FlightsAPI();

module.exports = flights;
