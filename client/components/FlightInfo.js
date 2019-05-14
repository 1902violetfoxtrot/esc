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
  let flightsArr = [];
  let flightsForLocations = {};
  let totalFlightsArr = [];
  let departingFlights = {};
  let departingArr = [];
  let returningFlights = {};
  let returningArr = [];

  for (let airportCode in destinationChoices) {
    if (destinationChoices.hasOwnProperty(airportCode)) {
      let locationName = destinationChoices[airportCode].name;
      locationName = locationName[0].toUpperCase() + locationName.slice(1);
      const flightsDeparting = departing[airportCode];
      const flightsReturning = returning[airportCode];
      if (flightsDeparting && flightsReturning) {
        flightsArr.push({ Departing: flightsDeparting });
        flightsArr.push({ Returning: flightsReturning });
        flightsForLocations[locationName] = flightsArr;
      }
    }
  }
  totalFlightsArr.push(flightsForLocations);
  console.log(totalFlightsArr);

  return (
    <div class="ui inverted segment">
      <div class="ui inverted relaxed divided list">
        <div class="item">
          <div class="content">
            <div class="header">{}</div>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <div class="header">Departing</div>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <div class="header">Returning</div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapState = state => ({
  returning: state.location.returning,
  departing: state.location.departing,
  destinations: state.destinations.destinationInfo,
  instagramLocs: state.instagram.locations,
  instagramUser: state.user.instagramId
});
export default connect(mapState)(FlightInfo);
