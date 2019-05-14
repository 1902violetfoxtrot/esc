import React from 'react';

const BudgetBar = props => {
  return (
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
          value={props.budget}
          onChange={props.onChange}
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
          value={props.budget}
          onChange={props.onChange}
          required="required"
        />
      </div>
    </div>
  </div>
  )
}

export default BudgetBar;
