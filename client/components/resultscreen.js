import React from 'react';
import ResultsMap from './ResultsMap';
import BudgetBar from './portableBudgetBar';
import queryString from 'query-string';
import FlightInfo from './FlightInfo';

class ResultScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      budget: 1000, // should be passed down, placeholder
      flights: [], // should be calculated and then passed down
      coords: [[]]
    };
    this.onBudgetChange = this.onBudgetChange.bind(this);
  }

  componentDidMount() {
    const { coords } = queryString.parse(this.props.location.search);
    const rawCoords = coords.split(',');
    const realCoords = [];
    while (rawCoords.length) {
      realCoords.push([rawCoords.shift(), rawCoords.shift()]);
    }
    this.setState({
      coords: realCoords
    });
  }

  onBudgetChange(e) {
    this.setState({
      budget: e.target.value
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="ui grid">
        <div className="ui grid eleven wide column">
        <div className="centered two column row">
          <BudgetBar
            budget={this.state.budget}
            onChange={this.onBudgetChange}
          />
          </div>
          <div className="ui grid">
            <div className="eleven wide column">
              <ResultsMap coords={this.state.coords} />
            </div>
          </div>
        </div>
        {/* and then the list of flights to the side somewhere here */}
        <div className="five wide column">
          <FlightInfo />
        </div>
      </div>
    );
  }
}

export default ResultScreen;
