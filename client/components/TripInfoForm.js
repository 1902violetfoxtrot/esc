import React from 'react';
import { connect } from 'react-redux';
import { getFlightsThunk } from '../store';
import Axios from 'axios';

const DAY = 24 * 60 * 60 * 1000;
function getReadableDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (day < 10 ? '0' + day : day)
  );
}

function parseDate(s) {
  var b = s.split(/\D/);
  return new Date(b[0], --b[1], b[2]);
}

class TripInfoForm extends React.Component {
  constructor(props) {
    super(props);

    const now = Date.now();
    this.today = getReadableDate(new Date(now));
    this.returnLimit = getReadableDate(new Date(now + 330 * DAY));
    this.departLimit = getReadableDate(new Date(now + 329 * DAY));
    const tomorrow = getReadableDate(new Date(now + DAY));

    this.state = {
      budget: 1000,
      departure: '',
      dayAfterDeparture: tomorrow,
      returnDate: '',
      adults: 1,
      children: 0,
      infants: 0,
      clicked: false
    };
    this.onBudgetChange = this.onBudgetChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onTravelersChange = this.onTravelersChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(() => {});
  }

  async onDateChange(e) {
    const { target } = e;
    await this.setState({
      [target.id]: target.value
    });

    if (target.id === 'departure') {
      const dep = parseDate(this.state.departure);
      const dayAfter = getReadableDate(new Date(dep.getTime() + DAY));
      await this.setState({
        dayAfterDeparture: dayAfter
      });
      if (
        this.state.returnDate &&
        this.state.returnDate <= this.state.departure
      ) {
        this.setState({
          returnDate: dayAfter
        });
      }
    }
  }

  onTravelersChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onBudgetChange(e) {
    this.setState({
      budget: e.target.value
    });
  }

  onSubmit(e) {
    this.setState({ clicked: true });
    e.preventDefault();
    const {
      budget,
      departure,
      returnDate,
      adults,
      children,
      infants
    } = this.state;
    window.navigator.geolocation.getCurrentPosition(async response => {
      const { longitude, latitude } = response.coords;
      const originData = await Axios.get(
        `/api/flights/closestAirport?longitude=${longitude}&latitude=${latitude}`
      );

      // repeat this for each of the 5 destinations received

      // TEMPORARY, until we hook up the image recognition with the search
      //const { destinations } = this.props;
      const destinations = ['SEL', 'MAD', 'LCA', 'ADL', 'MSY'];

      const origin = originData.data.data[0].iataCode;
      this.props.getFlightsThunk(origin, destinations, departure, returnDate);
    });
  }

  render() {
    return (
      <div className="ui center container segment">
        <form id="tripInfo" onSubmit={this.onSubmit} className="ui form">
          <div className="ui centered column grid">
            <div id="dates" className="centered two column row">
              <div className="column">
                <label className="ui header">
                  <div className="icon">
                    <i className="fas fa-plane-departure" />
                  </div>
                  Departure Date
                </label>
                <input
                  id="departure"
                  type="date"
                  min={this.today}
                  max={this.departLimit}
                  value={this.state.departure}
                  onChange={this.onDateChange}
                  required="required"
                />
              </div>
              <div className="column">
                <label className="ui header">
                  <div className="icon">
                    <i className="fas fa-plane-arrival" />
                  </div>
                  Return Date
                </label>
                <input
                  id="returnDate"
                  type="date"
                  min={this.state.dayAfterDeparture}
                  max={this.returnLimit}
                  value={this.state.returnDate}
                  onChange={this.onDateChange}
                  required="required"
                />
              </div>
            </div>

            <div id="travelers" className="centered three column row">
              <div className="column">
                <label className="ui header">
                  <div className="icon">
                    <i className="fas fa-users" />
                  </div>
                  Adults:
                </label>
                <input
                  id="adults"
                  type="number"
                  min="1" // children and infants should not be traveling unsupervised
                  max="10"
                  value={this.state.adults}
                  onChange={this.onTravelersChange}
                  required="required"
                />
              </div>
              <div className="column">
                <label className="ui header">
                  <div className="icon">
                    <i className="fas fa-child" />
                  </div>
                  Children:
                </label>
                <input
                  id="children"
                  type="number"
                  min="0"
                  max="10"
                  value={this.state.children}
                  onChange={this.onTravelersChange}
                  required="required"
                />
              </div>
              <div className="column">
                <label className="ui header">
                  <div className="icon">
                    <i className="fas fa-baby" />
                  </div>
                  Infants:
                </label>
                <input
                  id="infants"
                  type="number"
                  min="0"
                  max="5"
                  value={this.state.infants}
                  onChange={this.onTravelersChange}
                  required="required"
                />
              </div>
            </div>

            <div className="centered two column row">
              <div id="budget" className="column">
                <div>
                  <label className="ui header">
                    <div className="icon">
                      <i className="fas fa-money-check" />
                    </div>
                    Budget (USD)
                  </label>
                </div>
              </div>
              <div className="centered three column row">
                <div className="column">
                  <input
                    type="number"
                    min="100"
                    max="10000"
                    id="budgetInput"
                    value={this.state.budget}
                    onChange={this.onBudgetChange}
                    required="required"
                  />
                </div>
                <div className="column center aligned">
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="50"
                    className="slider column"
                    id="budgetSlider"
                    value={this.state.budget}
                    onChange={this.onBudgetChange}
                    required="required"
                  />
                </div>
              </div>
            </div>

            <div className="centered two column row">
              <div className="column">
                {this.state.clicked === false ? (
                  <button
                    className="ui primary centered button fluid segment"
                    type="submit"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="ui primary centered button fluid segment"
                    type="submit"
                    disabled
                  >
                    Loading
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  destinations: state.location.destinationCodes
});

const mapDispatchToProps = dispatch => ({
  getFlightsThunk: (origin, destination, departureDate, isReturn) =>
    dispatch(getFlightsThunk(origin, destination, departureDate, isReturn))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripInfoForm);
