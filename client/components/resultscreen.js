import React from 'react';
import ResultsMap from './ResultsMap';
import BudgetBar from './portableBudgetBar';
import queryString from 'query-string';
import FlightInfo from './FlightInfo';

class ResultScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      budget: 1000,
      flights: [], // should be calculated and then passed down
      coords: [[]],
      seats: 1
    };
    this.onBudgetChange = this.onBudgetChange.bind(this);
  }

  componentDidMount() {
    const { budget, coords, seats } = queryString.parse(this.props.location.search);
    const rawCoords = coords.split(',');
    const realCoords = [];
    while (rawCoords.length) {
      realCoords.push([rawCoords.shift(), rawCoords.shift()]);
    }
    this.setState({
      budget: Number(budget),
      coords: realCoords,
      seats: Number(seats)
    });
  }

  onBudgetChange(e) {
    this.setState({
      budget: e.target.value
    });
  }

  render() {
//    console.log(this.props);
    return (
      <div className="ui padded grid">
        <div className="ui padded grid eleven wide column">
          <div className="centered two column row">
            <BudgetBar
              budget={this.state.budget}
              onChange={this.onBudgetChange}
            />
          </div>
          <div className="row">
            <ResultsMap coords={this.state.coords} />
          </div>
        </div>
        {/* and then the list of flights to the side somewhere here */}
        <div className="four wide column">
          <FlightInfo budget={this.state.budget} seats={this.state.seats} />
        </div>
      </div>
    );
  }
}

export default ResultScreen;
