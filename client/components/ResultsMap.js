import React, { Component } from 'react';
import { connect } from 'react-redux';
import { awsMapThunk } from '../store/awsFile';
import {
  geoAzimuthalEquidistant,
  geoInterpolate,
} from 'd3-geo';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';

class ResultsMap extends Component {
  constructor(props) {
    super(props);
    this.projection = this.projection.bind(this);
  }
  projection() {
    return geoAzimuthalEquidistant()
      .scale(100)
      .translate([800 / 2, 450 / 2]);
  }
  async componentDidMount() {
    await this.props.getMap();
  }
  render() {
    const { mapData } = this.props;

    if (!mapData.objects) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    } else {

      const londonLonLat = [0.1278, 51.5074];
      const newYorkLonLat = [-74.0059, 40.7128];
      const geoInterpolator = geoInterpolate(londonLonLat, newYorkLonLat);
      let increment = 0;

      increment += 0.01;
      if (increment > 1) {
        increment = 0;
      }
      return (
        <div>
          <ComposableMap>
            <ZoomableGroup>
              <Geographies geography={mapData}>
                {geographies =>
                  geographies.map((geography, i) => (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={this.projection()}
                      fill={`rgba(128,128,0,0.5)`}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      );
    }
  }
}

const mapState = state => ({
  mapData: state.awsFile
});

const mapDispatch = dispatch => ({
  getMap: () => {
    dispatch(awsMapThunk());
  }
});

export default connect(mapState, mapDispatch)(ResultsMap);
