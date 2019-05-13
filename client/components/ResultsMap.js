import React, { Component } from 'react';
import { connect } from 'react-redux';
import { awsMapThunk } from '../store/awsFile';
import { geoAzimuthalEquidistant, geoInterpolate } from 'd3-geo';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Lines,
  Line,
  Marker,
  Markers
} from 'react-simple-maps';

class ResultsMap extends Component {
  constructor(props) {
    super(props);
    this.projection = this.projection.bind(this);
    this.buildCurves = this.buildCurves.bind(this);
  }
  projection() {
    return geoAzimuthalEquidistant()
      .scale(100)
      .translate([800 / 2, 450 / 2]);
  }
  buildCurves(start, end) {
    const x0 = start[0];
    const x1 = end[0];
    const y0 = start[1];
    const y1 = end[1];
    const mpx = (x1 + x0) * 0.5;
    const mpy = (y1 + y0) * 0.5;

    // angle of perpendicular to line:
    const theta = Math.atan2(y1 - y0, x1 - x0) - Math.PI / 2;

    // distance of control point from mid-point of line:
    const offset = -30;

    // location of control point:
    const c1x = mpx + offset * Math.cos(theta);
    const c1y = mpy + offset * Math.sin(theta);

    // construct the command to draw a quadratic curve
    const curve =
      'M' + x0 + ' ' + y0 + ' Q ' + c1x + ' ' + c1y + ' ' + x1 + ' ' + y1;
    return curve;
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
      const newYorkLonLat = [-74.0059, 40.7128];
      const londonLonLat = [0.1278, 51.5074];

      return (
        <div>
          <ComposableMap projection={this.projection}>
            <ZoomableGroup>
              <Geographies geography={mapData}>
                {(geographies, projection) =>
                  geographies.map((geography, i) => (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      fill={`rgba(128,128,0,0.5)`}
                    />
                  ))
                }
              </Geographies>
              <Lines>
                <Line
                  line={{
                    coordinates: {
                      start: londonLonLat,
                      end: newYorkLonLat
                    }
                  }}
                  style={{
                    default: {
                      stroke: 'blue',
                      fill: 'transparent'
                    }
                  }}
                  buildPath={this.buildCurves}
                />
              </Lines>
              <Markers>
                <Marker
                  marker={{ coordinates: londonLonLat }}
                  style={{
                    default: { fill: 'blue' }
                  }}
                >
                  <circle cx={0} cy={0} r={2} />
                </Marker>
                <Marker
                  marker={{ coordinates: newYorkLonLat }}
                  style={{
                    default: { fill: 'blue' }
                  }}
                >
                  <circle cx={0} cy={0} r={2} />
                </Marker>
              </Markers>
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
