import axios from 'axios';

const GET_FLIGHTS = 'GET_FLIGHTS';
const GET_LOCATIONS = 'GET_LOCATIONS';

const initialState = {
  returning: {},
  departing: {},
  destinationCodes: []
};

const getFlights = (departing, returning) => ({
  type: GET_FLIGHTS,
  departing,
  returning
});

const getLocations = locations => ({
  type: GET_LOCATIONS,
  locations
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

const getSingleFlight = (from, to, date, direction) => {
  return axios.get(
    `/api/flights?origin=${from}&destination=${to}&departureDate=${date}&direction=${direction}`
  );
};

export const getFlightsThunk = (
  origin,
  destinations,
  departureDate,
  returnDate
) => async dispatch => {
  const toFlightPromises = destinations.map(destination =>
    getSingleFlight(origin, destination, departureDate, 'to')
  );
  const toFlights = (await Promise.all(toFlightPromises)).map(res => res.data);

  const fromFlightPromises = destinations.map(destination =>
    getSingleFlight(destination, origin, returnDate, 'from')
  );
  const fromFlights = (await Promise.all(fromFlightPromises)).map(
    res => res.data
  );

  dispatch(getFlights(toFlights, fromFlights));
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FLIGHTS:
      const newDepartingFlights = {};
      action.departing.forEach(
        flight =>
          (newDepartingFlights[flight.vacationPlace] = flight.ourBestFlights)
      );

      const newReturningFlights = {};
      action.returning.forEach(
        flight =>
          (newReturningFlights[flight.vacationPlace] = flight.ourBestFlights)
      );
      return {
        ...state,
        departing: newDepartingFlights,
        returning: newReturningFlights
      };
    case GET_LOCATIONS:
      return { ...state, destinationCodes: action.locations };
    default:
      return state;
  }
}
