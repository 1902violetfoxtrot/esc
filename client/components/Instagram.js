import React, { Component } from 'react';
import { connect } from 'react-redux';
import { instagramThunk } from '../store/instagram';

class Instagram extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getImages();
  }
  render() {
    const { images } = this.props;

    if (!images) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    } else {
      return (
        <div>
          {images.map(image => {
            return (
              <ul key={image}>
                <img src={image} height="200" width="200" />
              </ul>
            );
          })}
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
