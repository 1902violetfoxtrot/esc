import React, { Component } from 'react';
import { connect } from 'react-redux';
import { instagramThunk, instagramLocsThunk } from '../store/instagram';
import Slider from 'react-slick';
import TripInfoForm from './TripInfoForm';

class Instagram extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }
  async componentDidMount() {
    await this.props.getImages();
    await this.props.getLocs();
  }
  handleClicked = () => {
    this.setState({ clicked: true });
  };
  render() {
    const settings = {
      arrows: false,
      fade: true,
      autoplay: true,
      autoplaySpeed: 3000
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
          </div>
        )}
        <TripInfoForm
          clicked={this.state.clicked}
          handleClicked={this.handleClicked}
        />
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
  },
  getLocs: () => {
    dispatch(instagramLocsThunk());
  }
});

export default connect(mapState, mapDispatch)(Instagram);
