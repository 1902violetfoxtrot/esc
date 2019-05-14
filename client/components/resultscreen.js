import React from 'react';
import ResultsMap from './ResultsMap';
import BudgetBar from './portableBudgetBar';

class ResultScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      budget: 1000, // should be passed down, placeholder
      flights: [] // should be calculated and then passed down
    };
    this.onBudgetChange = this.onBudgetChange.bind(this);
  }

  onBudgetChange(e) {
    this.setState({
      budget: e.target.value
    });
  }

  render() {
    return (
      <div>
        <BudgetBar budget={this.state.budget} onChange={this.onBudgetChange} />
        <ResultsMap />
        {/* and then the list of flights to the side somewhere here */}
      </div>
    );
  }
}

export default ResultScreen;
