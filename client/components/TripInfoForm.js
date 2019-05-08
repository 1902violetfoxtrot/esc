import React from 'react';

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

    this.today = getReadableDate(new Date());
    const tomorrow = getReadableDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

    this.state = {
      budget: 5000,
      departure: this.today,
      dayAfterDeparture: tomorrow,
      return: tomorrow,
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
      const dayAfter = getReadableDate(new Date(dep.getTime() + 24 * 60 * 60 * 1000));
      await this.setState({
        dayAfterDeparture: dayAfter
      });
      if (this.state.return <= this.state.departure) {
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
            <label>Departing Day</label>
            <input
              id="departure"
              type="date"
              min={this.today}
              value={this.state.departure}
              onChange={this.onDateChange}
            />
          </div>
          <div>
            <label>Returning Day</label>
            <input
              id="return"
              type="date"
              min={this.state.dayAfterDeparture}
              value={this.state.return}
              onChange={this.onDateChange}
            />
          </div>
        </div>

        <div id="travelers">
          <div>
            <label>Adults traveling:</label>
            <input
              id="adults"
              type="number"
              min="0"
              max="20"
              value={this.state.adults}
              onChange={this.onTravelersChange}
            />
          </div>
          <div>
            <label>Children traveling:</label>
            <input
              id="children"
              type="number"
              min="0"
              max="20"
              value={this.state.children}
              onChange={this.onTravelersChange}
            />
          </div>
          <div>
            <label>Infants traveling:</label>
            <input
              id="infants"
              type="number"
              min="0"
              max="10"
              value={this.state.infants}
              onChange={this.onTravelersChange}
            />
          </div>
        </div>

        <div id="budget">
          <div>
            <label>Budget</label>
            <input
              type="number"
              id="budgetInput"
              value={this.state.budget}
              onChange={this.onBudgetChange}
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