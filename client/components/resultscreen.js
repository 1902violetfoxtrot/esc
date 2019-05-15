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
//    console.log(this.props);
    return (
      <div>
        <BudgetBar budget={this.state.budget} onChange={this.onBudgetChange} />
        <ResultsMap coords={this.state.coords} />
        {/* and then the list of flights to the side somewhere here */}
        <FlightInfo budget={this.state.budget} />
      </div>
    );
  }
}

export default ResultScreen;
