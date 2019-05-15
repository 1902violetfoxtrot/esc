import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Icon } from 'semantic-ui-react';

class FlightInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.makeFlightsArr = this.makeFlightsArr.bind(this);
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  makeFlightsArr() {
    const {
      returning,
      departing,
      destinations,
      instagramLocs,
      instagramUser,
      budget,
      seats
    } = this.props;

    let destinationChoices = {};
    if (instagramUser) {
      destinationChoices = instagramLocs;
    } else {
      destinationChoices = destinations;
    }
    let totalFlightsArr = [];

    for (let airportCode in destinationChoices) {
      if (destinationChoices.hasOwnProperty(airportCode)) {
        let locationName = destinationChoices[airportCode].name;
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
          // const totalPrices = flightsDeparting.map((departure, idx) => {
          //   if (departure) {
          //     let sum =
          //       parseFloat(departure.price, 10) +
          //       parseFloat(flightsReturning[idx].price, 10);
          //     return sum.toFixed(2);
          //   }
          // });
          let flightsObj = {
            city: locationName,
            departing: flightsDeparting,
            returning: flightsReturning
            // totals: totalPrices
          };
          totalFlightsArr.push(flightsObj);
        }
      }
    }
    return totalFlightsArr;
  }

  render() {
    const { activeIndex } = this.state;
    const flightsInfoArr = this.makeFlightsArr();
    if (!flightsInfoArr.length) {
      return (
        <div className="ui centered medium header">
          There are no flights at this price
        </div>
      );
    }
    return (
      <Accordion styled={true}>
        {flightsInfoArr.map((element, i) => {
          return (
            <div key={element.city}>
              <Accordion.Title
                active={activeIndex === i}
                index={i}
                onClick={this.handleClick}
                style={{fontSize: 28}}
              >
                <Icon name="dropdown" />
                {element.city}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === i}>
                <label role="list" className="ui list container">
                  <label className="ui medium header">
                    <div className="icon">
                      <i className="fas fa-plane-departure" />
                    </div>
                    Departing
                  </label>

                  {element.departing.map((departure, i) => {
                    return (
                      <div
                        key={i}
                        role="listitem"
                        className="ui container segment"
                      >
                        <div className="content">
                          <div>Airline: {departure.carrier}</div>
                          <div>Class: {departure.class}</div>
                          <div>${departure.price} / seat</div>
                        </div>
                      </div>
                    );
                  })}
                  <label className="ui medium header">
                    <div className="icon">
                      <i className="fas fa-plane-arrival" />
                    </div>
                    Returning
                  </label>
                  {element.returning.map((returns, i) => {
                    return (
                      <div
                        key={i}
                        role="listitem"
                        className="ui container segment"
                      >
                        <div className="content">
                          <div>Airline: {returns.carrier}</div>
                          <div>Class: {returns.class}</div>
                          <div>${returns.price} / seat</div>
                        </div>
                      </div>
                    );
                  })}
                </label>
              </Accordion.Content>
            </div>
          );
        })}
      </Accordion>
    );
  }
}
const mapState = state => ({
  returning: state.location.returning,
  departing: state.location.departing,
  destinations: state.destinations.destinationInfo,
  instagramLocs: state.instagram.locations,
  instagramUser: state.user.instagramId
});
export default connect(mapState)(FlightInfo);
