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

const getSingleFlight = async (from, to, date, direction, backup, backup2) => {
  const { data } = await axios.get(
    `/api/flights?origin=${from}&destination=${to}&departureDate=${date}&direction=${direction}&backup=${backup}&backup2=${backup2}`
  );
  return data;
};

export const getFlightsThunk = (
  origin,
  destinations,
  departureDate,
  returnDate,
  backup,
  backup2
) => async dispatch => {
  const toFlights = (await Promise.all(
    destinations.map(destination =>
      getSingleFlight(origin, destination, departureDate, 'to', backup, backup2)
    )
  )).filter(f => f !== 'no');

  const fromFlights = (await Promise.all(
    destinations.map(destination =>
      getSingleFlight(destination, origin, returnDate, 'from', backup, backup2)
    )
  )).filter(f => f !== 'no');
  dispatch(getFlights(toFlights, fromFlights));
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

      const departingKeys = Object.keys(newDepartingFlights);
      const returningKeys = Object.keys(newReturningFlights);
      const validDestinations = departingKeys.filter(code =>
        returningKeys.includes(code)
      );
      departingKeys.map(key => {
        if (!validDestinations.includes(key)) delete newDepartingFlights[key];
      });
      returningKeys.map(key => {
        if (!validDestinations.includes(key)) delete newReturningFlights[key];
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
