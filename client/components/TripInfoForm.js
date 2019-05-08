import React from 'react';

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
  constructor() {
    super();

    const now = Date.now()
    this.today = getReadableDate(new Date(now));
    this.returnLimit = getReadableDate(new Date(now + 330 * DAY));
    this.departLimit = getReadableDate(new Date(now + 329 * DAY));
    const tomorrow = getReadableDate(new Date(now + DAY));

    this.state = {
      budget: 5000,
      departure: '',
      dayAfterDeparture: tomorrow,
      return: '',
      adults: 1,
      children: 0,
      infants: 0
    };
    this.onBudgetChange = this.onBudgetChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onTravelersChange = this.onTravelersChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      if (this.state.return && this.state.return <= this.state.departure) {
        this.setState({
          return: dayAfter
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
    console.log(this.state);
  }

  render() {
    return (
      <form id="tripInfo" onSubmit={this.onSubmit}>
        <div id="dates">
          <div>
            <label><i className="fas fa-plane-departure" /> Departure Date</label>
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
          <div>
            <label><i className="fas fa-plane-arrival" /> Return Date</label>
            <input
              id="return"
              type="date"
              min={this.state.dayAfterDeparture}
              max={this.returnLimit}
              value={this.state.return}
              onChange={this.onDateChange}
              required="required"
            />
          </div>
        </div>

        <div id="travelers">
          <div>
            <label><i className="fas fa-users" /> Adults:</label>
            <input
              id="adults"
              type="number"
              min="1" // children and infants should not be traveling unsupervised
              max="20"
              value={this.state.adults}
              onChange={this.onTravelersChange}
              required="required"
            />
          </div>
          <div>
            <label><i className="fas fa-child" /> Children:</label>
            <input
              id="children"
              type="number"
              min="0"
              max="20"
              value={this.state.children}
              onChange={this.onTravelersChange}
              required="required"
            />
          </div>
          <div>
            <label><i className="fas fa-baby" /> Infants:</label>
            <input
              id="infants"
              type="number"
              min="0"
              max="10"
              value={this.state.infants}
              onChange={this.onTravelersChange}
              required="required"
            />
          </div>
        </div>

        <div id="budget">
          <div>
            <label><i className="fas fa-money-check" /> Budget (USD)</label>
            <input
              type="number"
              min="500"
              max="100000"
              id="budgetInput"
              value={this.state.budget}
              onChange={this.onBudgetChange}
              required="required"
            />
          </div>
          <input
            type="range"
            min="500"
            max="100000"
            step="100"
            className="slider"
            id="budgetSlider"
            value={this.state.budget}
            onChange={this.onBudgetChange}
            required="required"
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default TripInfoForm;
