import React from 'react';
import { connect } from 'react-redux';

const FlightInfo = props => {
  const {
    returning,
    departing,
    destinations,
    instagramLocs,
    instagramUser
  } = props;

  let destinationChoices = {};
  if (instagramUser) {
    destinationChoices = instagramLocs;
  } else {
    destinationChoices = destinations;
  }
  let departingFlights = {};
  let returningFlights = {};

  for (let airportCode in destinationChoices) {
    if (destinationChoices.hasOwnProperty(airportCode)) {
      const locationName = destinationChoices[airportCode].name;
      const flights = departing[airportCode];
      if (flights) {
        departingFlights[locationName] = flights;
      }
    }
  }

  for (let airportCode in destinationChoices) {
    if (destinationChoices.hasOwnProperty(airportCode)) {
      const locationName = destinationChoices[airportCode].name;
      const flights = returning[airportCode];
      if (flights) {
        returningFlights[locationName] = flights;
      }
    }
  }
  return <div className="trip" />;
};
const mapState = state => ({
  returning: state.location.returning,
  departing: state.location.departing,
  destinations: state.destinations.destinationInfo,
  instagramLocs: state.instagram.locations,
  instagramUser: state.user.instagramId
});
export default connect(mapState)(FlightInfo);
