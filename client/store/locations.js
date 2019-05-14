import axios from 'axios';

const GET_FLIGHTS = 'GET_FLIGHTS';
const CLEAR_FLIGHTS = 'CLEAR_FLIGHTS';

const initialState = {
  returning: {},
  departing: {}
};

const getFlights = (departing, returning) => ({
  type: GET_FLIGHTS,
  departing,
  returning
});

export const clearFlights = () => ({
  type: CLEAR_FLIGHTS
});

const getSingleFlightUnqueued = async (
  from,
  to,
  date,
  direction,
  arr,
  backup,
  backup2
) => {
  const { data } = await axios.get(
    `/api/flights?origin=${from}&destination=${to}&departureDate=${date}&direction=${direction}&backup=${backup}&backup2=${backup2}`
  );
  if (data !== 'no') arr.push(data);
};

const getSingleFlight = queue(
  (...params) => getSingleFlightUnqueued(...params),
  700
);

export const getFlightsThunk = (
  origin,
  destinations,
  departureDate,
  returnDate,
  backup,
  backup2
) => async dispatch => {
  let toFlights = [];
  let fromFlights = [];
  destinations.map(destination => {
    getSingleFlight(
      origin,
      destination,
      departureDate,
      'to',
      toFlights,
      backup,
      backup2
    );
    getSingleFlight(
      destination,
      origin,
      returnDate,
      'from',
      fromFlights,
      backup,
      backup2
    );
  });

  setTimeout(() => dispatch(getFlights(toFlights, fromFlights)), 15000);
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_FLIGHTS:
      return initialState;
    case GET_FLIGHTS:
      const flightReducer = (total, flight) => {
        const flights = flight.ourBestFlights;
        if (flights.length) total[flight.vacationPlace] = flights;
        return total;
      };
      const newDepartingFlights = action.departing.reduce(flightReducer, {});
      const newReturningFlights = action.returning.reduce(flightReducer, {});

      const departingKeys =  Object.keys(newDepartingFlights);
      const returningKeys = Object.keys(newReturningFlights);
      const validDestinations = departingKeys.filter(code =>
        returningKeys.includes(code)
      );
      departingKeys.map(key => {
        if (!validDestinations.includes(key)) delete newDepartingFlights[key]
      });
      returningKeys.map(key => {
        if (!validDestinations.includes(key)) delete newReturningFlights[key]
      });

      return {
        ...state,
        departing: newDepartingFlights,
        returning: newReturningFlights
      };
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
