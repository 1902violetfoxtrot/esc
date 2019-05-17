import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

class FlightInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 6 };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const { flightsInfoArr } = this.props;
    if (!flightsInfoArr.length) {
      return (
        <div className="ui centered medium header">
          There are no flights at this price
        </div>
      );
    }
    return (
      <Accordion styled={true}>
        {flightsInfoArr.map((element, i) => {
          return (
            <div key={element.city}>
              <Accordion.Title
                active={activeIndex === i}
                index={i}
                onClick={this.handleClick}
                style={{ fontSize: 28 }}
              >
                <Icon name="dropdown" />
                {element.city}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === i}>
                <label role="list" className="ui list container">
                  <label className="ui medium header">
                    <div className="icon">
                      <i className="fas fa-plane-departure" />
                    </div>
                    Departing
                  </label>

                  {element.departing.map((departure, i) => {
                    return (
                      <div
                        key={i}
                        role="listitem"
                        className="ui container segment"
                      >
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
                      <div
                        key={i}
                        role="listitem"
                        className="ui container segment"
                      >
                        <div className="content">
                          <div>Airline: {returns.carrier}</div>
                          <div>Class: {returns.class}</div>
                          <div>${returns.price} / seat</div>
                        </div>
                      </div>
                    );
                  })}
                </label>
              </Accordion.Content>
            </div>
          );
        })}
      </Accordion>
    );
  }
}

export default FlightInfo;
