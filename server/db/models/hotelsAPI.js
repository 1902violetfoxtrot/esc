const fetch = require('node-fetch');
const Amadeus = require('amadeus');

class HotelsAPI {
  async getHotels(longitude, latitude) {
    let amadeus = await new Amadeus({
      clientId: process.env.AMADEUS_CLIENT_ID,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET
    });
    const response = await amadeus.shopping.hotelOffers.get({
      longitude: `${longitude}`,
      latitude: `${latitude}`
    });
    const { data } = response;
    return data;
  }
  
  async conversion(hotelReply) {
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
    const conversion = await currencyData.json();
    const hotels = hotelReply.map(el => {
      if (el.offers[0].price.base) {
        let oldPrice = el.offers[0].price.base;
        let newPrice = oldPrice * conversion.rates.USD;
        let finalPrice = newPrice.toFixed(2);
        return {
          name: el.hotel.name,
          price: finalPrice,
          currency: 'USD'
        };
      }
    });
    let pricedHotels = hotels.filter(el => {
      if (el) return el;
    });

    let ourBestHotels = [];
    for (let i = 0; i < 5; i++) {
      ourBestHotels.push(pricedHotels[i]);
    }

    return ourBestHotels;
  }
}

const hotels = new HotelsAPI();

module.exports = hotels;
