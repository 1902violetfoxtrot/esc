import React, { Component } from 'react';
import { connect } from 'react-redux';
import { instagramThunk } from '../store/instagramImages';
import Slider from 'react-slick';

class Instagram extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getImages();
  }
  render() {
    const settings = {
      arrows: false,
      fade: true
    };
    const { images } = this.props;

    if (!images) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    } else {
      return (
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
      );
    }
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
