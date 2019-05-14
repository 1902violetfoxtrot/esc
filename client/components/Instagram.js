import React, { Component } from 'react';
import { connect } from 'react-redux';
import { instagramThunk } from '../store/instagram';
import Slider from 'react-slick';
import TripInfoForm from './TripInfoForm';

class Instagram extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }
  componentDidMount() {
    this.props.getImages();
  }
  handleClicked = () => {
    this.setState({ clicked: true });
  };
  render() {
    const settings = {
      arrows: false,
      fade: true
    };
    const { images } = this.props;
    return (
      <div>
        {!this.state.clicked ? (
          <div>
            <div className="ui center aligned container">
              <div className="ui huge header">Escape</div>
              {images.length === 0 ? (
                <div className="ui active centered inline loader">
                  <div className="content">
                    <div className="ui massive text loader">Loading</div>
                  </div>
                </div>
              ) : (
                <div className="ui center aligned big image">
                  <Slider {...settings}>
                    {images.map(image => {
                      return (
                        <ul key={image}>
                          <img src={image} />
                        </ul>
                      );
                    })}
                  </Slider>
                </div>
              )}
            </div>
            <TripInfoForm clicked={this.state.clicked}
              handleClicked={this.handleClicked}/>
          </div>
        ) : (
          <div className="ui segment">
            <div className="ui active transition visible inverted dimmer">
              <div className="content">
                <div className="ui large text loader">Loading</div>
              </div>
            </div>
            <div className="ui center aligned container">
              <div className="ui huge header">Escape</div>
              {images.length === 0 ? (
                <div className="ui active centered inline loader">
                  <div className="content">
                    <div className="ui massive text loader">Loading</div>
                  </div>
                </div>
              ) : (
                <div className="ui center aligned big image">
                  <Slider {...settings}>
                    {images.map(image => {
                      return (
                        <ul key={image}>
                          <img src={image} />
                        </ul>
                      );
                    })}
                  </Slider>
                </div>
              )}
            </div>
            <TripInfoForm clicked={this.state.clicked}
              handleClicked={this.handleClicked}/>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  images: state.instagram.images
});

const mapDispatch = dispatch => ({
  getImages: () => {
    dispatch(instagramThunk());
  }
});

export default connect(mapState, mapDispatch)(Instagram);
