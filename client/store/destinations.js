import axios from 'axios';

const GET_LOCATIONS = 'GET_LOCATIONS';
const CLEAR_LOCATIONS = 'CLEAR_LOCATIONS';
const GET_FLIGHTS = 'GET_FLIGHTS';

const initialState = {
  destinationInfo: {}
};

const getLocations = locations => ({
  type: GET_LOCATIONS,
  locations
});

export const clearLocations = () => ({
  type: CLEAR_LOCATIONS
});

export const filesThunk = filesToSend => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/uploads', filesToSend);
      dispatch(getLocations(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_LOCATIONS:
      return initialState;
    case GET_LOCATIONS:
      let newInfo = action.locations.reduce((info, location) => {
        const { longitude, latitude, name } = location;
        info[location.code] = {
          longitude,
          latitude,
          name: capitalizeCity(name)
        };
        return info;
      }, {});
      return { ...state, destinationInfo: newInfo };
    case GET_FLIGHTS:
      const flightReducer = (total, flight) => {
        const flights = flight.ourBestFlights;
        if (flights.length) total[flight.vacationPlace] = flights;
        return total;
      };
      const newDepartingFlights = action.departing.reduce(flightReducer, {});
      const newReturningFlights = action.returning.reduce(flightReducer, {});
      const departingKeys = Object.keys(newDepartingFlights);
      const returningKeys = Object.keys(newReturningFlights);
      const validDestinations = departingKeys.filter(code =>
        returningKeys.includes(code)
      );
      const newDestinationInfo = { ...state.destinationInfo };
      Object.keys(newDestinationInfo).map(key => {
        if (!validDestinations.includes(key)) delete newDestinationInfo[key];
      });
      return { ...state, destinationInfo: newDestinationInfo };
    default:
      return state;
  }
}

const capitalizeCity = name => {
  let capName = name[0].toUpperCase() + name.slice(1);
  if (name.includes(' ')) {
    const spaceIndex = name.indexOf(' ');
    capName =
      capName.slice(0, spaceIndex + 1) +
      capName[spaceIndex + 1].toUpperCase() +
      capName.slice(spaceIndex + 2);
  }
  return capName;
};
