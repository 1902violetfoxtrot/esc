import React from 'react';
import ResultsMap from './ResultsMap';
import BudgetBar from './portableBudgetBar';
import queryString from 'query-string';
import FlightInfo from './FlightInfo';
import { connect } from 'react-redux';
import history from '../history';

class ResultScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      budget: 1000,
      coords: [[]],
      seats: 1,
      departing: {},
      returning: {},
      destinations: {}
    };
    this.onBudgetChange = this.onBudgetChange.bind(this);
    this.makeFlightsArr = this.makeFlightsArr.bind(this);
  }

  componentDidMount() {
    const {
      budget,
      coords,
      seats,
      departing,
      returning,
      destinations
    } = queryString.parse(this.props.location.search);

    const realBudget = Number(budget);
    const rawCoords = coords.split(',');
    const realCoords = [];
    while (rawCoords.length) {
      realCoords.push([rawCoords.shift(), rawCoords.shift()]);
    }
    const realSeats = Number(seats);
    const realDeparting = JSON.parse(departing);
    const realReturning = JSON.parse(returning);
    const realDestinations = JSON.parse(destinations);

    this.setState({
      budget: realBudget,
      coords: realCoords,
      seats: realSeats,
      departing: realDeparting,
      returning: realReturning,
      destinations: realDestinations
    });
  }

  onBudgetChange(e) {
    const newBudget = Number(e.target.value);
    this.setState({
      budget: newBudget
    });
    const {
      coords,
      seats,
      departing,
      returning,
      destinations
    } = queryString.parse(this.props.location.search);
    history.replace(
      `/results?seats=${seats}&budget=${newBudget}&coords=${coords}&departing=${departing}&returning=${returning}&destinations=${destinations}`
    );
  }

  makeFlightsArr(budget, seats, departing, returning, destinations) {
    let totalFlightsArr = [];

    for (let airportCode in destinations) {
      if (destinations.hasOwnProperty(airportCode)) {
        let locationName = destinations[airportCode].name;
        locationName = locationName[0].toUpperCase() + locationName.slice(1);
        let flightsDeparting = departing[airportCode] || [];
        let flightsReturning = returning[airportCode] || [];
        if (flightsDeparting)
          flightsDeparting = flightsDeparting
            .filter(({ price }) => Number(price) <= budget / (2 * seats))
            .sort((a, b) => Number(b.price) - Number(a.price))
            .slice(0, 5);
        if (flightsReturning)
          flightsReturning = flightsReturning
            .filter(({ price }) => Number(price) <= budget / (2 * seats))
            .sort((a, b) => Number(b.price) - Number(a.price))
            .slice(0, 5);

        if (flightsDeparting.length && flightsReturning.length) {
          let flightsObj = {
            city: locationName,
            departing: flightsDeparting,
            returning: flightsReturning
          };
          totalFlightsArr.push(flightsObj);
        }
      }
    }
    return totalFlightsArr;
  }

  render() {
    const {
      budget,
      coords,
      seats,
      departing,
      returning,
      destinations
    } = this.state;
    const flights = this.makeFlightsArr(
      budget,
      seats,
      departing,
      returning,
      destinations
    );
    return (
      <div className="ui padded grid">
        <div className="ui padded grid eleven wide column">
          <div className="centered two column row">
            <BudgetBar budget={budget} onChange={this.onBudgetChange} />
          </div>
          <div className="row">
            <ResultsMap coords={coords} />
          </div>
        </div>
        {/* and then the list of flights to the side somewhere here */}
        <div className="four wide column">
          <FlightInfo budget={budget} seats={seats} flightsInfoArr={flights} />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  returning: state.location.returning,
  departing: state.location.departing,
  destinationChoices: state.user.instagramId
    ? state.instagram.locations
    : state.destinations.destinationInfo
});

export default connect(mapState)(ResultScreen);
