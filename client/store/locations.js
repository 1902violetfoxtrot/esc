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

const getSingleFlightUnqueued = async (from, to, date, direction) => {
  const { data } = await axios.get(
    `/api/flights?origin=${from}&destination=${to}&departureDate=${date}&direction=${direction}`
  );
  console.log('returning:', data);
  return data;
};

const getSingleFlight = queue(
  async (...params) => getSingleFlightUnqueued(...params),
  120
);

export const getFlightsThunk = (
  origin,
  destinations,
  departureDate,
  returnDate
) => async dispatch => {

  const toFlights = await Promise.all(
    destinations.map(destination =>
      getSingleFlight(origin, destination, departureDate, 'to')
    )
  );
  const fromFlights = await Promise.all(
    destinations.map(destination =>
      getSingleFlight(destination, origin, returnDate, 'from')
    )
  );

  console.log(toFlights, fromFlights)

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

function queue(func, waitTime) {
  var funcQueue = [];
  var isWaiting;
  var executeFunc = function(...params) {
    isWaiting = true;
    const toReturn = func(...params);
    setTimeout(play, waitTime);
    return toReturn;
  };
  var play = function() {
    isWaiting = false;
    if (funcQueue.length) {
      var params = funcQueue.shift();
      return executeFunc(...params);
    }
  };
  return function(...params) {
    if (isWaiting) {
      funcQueue.push(params);
    } else {
      return executeFunc(...params);
    }
  };
}
