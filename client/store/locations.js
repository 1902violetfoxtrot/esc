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

const getSingleFlightUnqueued = async (from, to, date, direction, arr) => {
  const { data } = await axios.get(
    `/api/flights?origin=${from}&destination=${to}&departureDate=${date}&direction=${direction}`
  );
  arr.push(data);
};

const getSingleFlight = queue(
  (...params) => getSingleFlightUnqueued(...params),
  500
);

export const getFlightsThunk = (
  origin,
  destinations,
  departureDate,
  returnDate
) => async dispatch => {

  let toFlights = [];
  let fromFlights = [];
  destinations.map(destination => {
    getSingleFlight(origin, destination, departureDate, 'to', toFlights);
    getSingleFlight(destination, origin, returnDate, 'from', fromFlights);
  });

  setTimeout(
  () => dispatch(getFlights(toFlights, fromFlights))
  , 10000);
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FLIGHTS:
      const flightReducer = (total, flight) => {
        total[flight.vacationPlace] = flight.ourBestFlights;
        return total;
      };
      const newDepartingFlights = action.departing.reduce(flightReducer, {});
      const newReturningFlights = action.returning.reduce(flightReducer, {});
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

function queue(func, waitTime) {
  const funcQueue = [];
  let isWaiting;
  const executeFunc = function(...params) {
    isWaiting = true;
    func(...params);
    setTimeout(play, waitTime);
  };
  const play = function() {
    isWaiting = false;
    if (funcQueue.length) {
      const params = funcQueue.shift();
      executeFunc(...params);
    }
  };
  return function(...params) {
    if (isWaiting) {
      funcQueue.push(params);
    } else {
      executeFunc(...params);
    }
  };
}
