import React from 'react';
import { connect } from 'react-redux';
import { getFlightsThunk, clearFlights } from '../store';
import Axios from 'axios';
import history from '../history';
import BudgetBar from './portableBudgetBar';
import { jsonShrink } from './jsonHelper';

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
      infants: 0
    };
    this.onBudgetChange = this.onBudgetChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onTravelersChange = this.onTravelersChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(() => {});
    this.props.clearFlights();
  }

  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.departing).length &&
      !Object.keys(prevProps.departing).length
    ) {
      const coordsSource = Object.keys(this.props.destinations).map(
        location => {
          const { longitude, latitude } = this.props.destinations[location];
          return [longitude, latitude];
        }
      );
      const coords = coordsSource.reduce((prev, pair) => {
        return prev + pair[0] + ',' + pair[1] + ',';
      }, '');
      const { adults, children, budget } = this.state;
      const seats = Number(adults) + Number(children);
      const { departing, returning, destinations } = this.props;
      history.push(
        `/results?seats=${seats}&budget=${budget}&coords=${coords.slice(
          0,
          -1
        )}&departing=${jsonShrink(departing)}
        &returning=${jsonShrink(returning)}
        &destinations=${jsonShrink(destinations)}`
      );
    }
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
    e.preventDefault();
    this.props.handleClicked();
    const { departure, returnDate } = this.state;
    window.navigator.geolocation.getCurrentPosition(async response => {
      const { longitude, latitude } = response.coords;
      const originData = await Axios.get(
        `/api/flights/closestAirport?longitude=${longitude}&latitude=${latitude}`
      );
      const destinationChoices = Object.keys(this.props.destinations);

      const origin = originData.data.data[0].iataCode;
      const backupOrigin = originData.data.data[1].iataCode;
      const backupOrigin2 = originData.data.data[2].iataCode;
      this.props.getFlightsThunk(
        origin,
        destinationChoices,
        departure,
        returnDate,
        backupOrigin,
        backupOrigin2
      );
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
                  max={Math.min(2 * this.state.adults, 5)}
                  value={this.state.infants}
                  onChange={this.onTravelersChange}
                  required="required"
                />
              </div>
            </div>

            <BudgetBar
              budget={this.state.budget}
              onChange={this.onBudgetChange}
            />

            <div className="centered two column row">
              <div className="column">
                {!this.props.clicked &&
                Object.keys(this.props.destinations).length &&
                this.state.departure &&
                this.state.returnDate &&
                this.state.adults ? (
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
                    Submit
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
  destinations: state.user.instagramId
    ? state.instagram.locations
    : state.destinations.destinationInfo,
  departing: state.location.departing,
  returning: state.location.returning,
  instagramImages: state.instagram.images
});

const mapDispatchToProps = dispatch => ({
  getFlightsThunk: (...params) => dispatch(getFlightsThunk(...params)),
  clearFlights: () => dispatch(clearFlights())
});

export default connect(mapStateToProps, mapDispatchToProps)(TripInfoForm);
