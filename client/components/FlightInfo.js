import React from 'react';

const FlightInfo = props => {
  const { flightsInfoArr } = props;
  if (!flightsInfoArr.length) {
    return (
      <div className="ui centered medium header">
        There are no flights at this price
      </div>
    );
  }
  return (
    <div className="flights">
      {flightsInfoArr.map(element => {
        return (
          <div key={element.city}>
            <div>
              <label className="ui large blue header">{element.city}</label>
            </div>
            <label role="list" className="ui list container">
              <label className="ui medium header">
                <div className="icon">
                  <i className="fas fa-plane-departure" />
                </div>
                Departing
              </label>

              {element.departing.map((departure, i) => {
                return (
                  <div key={i} role="listitem" className="ui container segment">
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
                  <div key={i} role="listitem" className="ui container segment">
                    <div className="content">
                      <div>Airline: {returns.carrier}</div>
                      <div>Class: {returns.class}</div>
                      <div>${returns.price} / seat</div>
                    </div>
                  </div>
                );
              })}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default FlightInfo;
