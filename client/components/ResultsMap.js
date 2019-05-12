import React, { Component } from 'react';
import { connect } from 'react-redux';
import { awsMapThunk } from '../store/awsFile';
import { geoAzimuthalEquidistant, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

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
      const mapInfo = feature(
        mapData,
        mapData.objects.ne_110m_admin_0_countries
      ).features;

      return (
        <svg width={800} height={450} viewBox="0 0 800 450">
          <g className="countries">
            {mapInfo.map((d, i) => (
              <path
                key={`path-${i}`}
                d={geoPath().projection(this.projection())(d)}
                className="country"
                fill={`rgba(128,128,0,0.5)`}
                stroke="#FFFFFF"
                strokeWidth={0.5}
              />
            ))}
          </g>
        </svg>
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
