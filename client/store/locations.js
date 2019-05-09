import axios from 'axios';

const GET_FLIGHTS = 'GET_FLIGHTS';

const getFlights = flights => ({
  type: GET_FLIGHTS,
  flights
});

export const getFlightsThunk = (origin, destination, departureDate) => async dispatch => {
  const { data } = await axios.get('/api/flights', {origin, destination, departureDate});
  dispatch(getFlights(data));
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_FLIGHTS:
      console.log('action:', action)
      return action.flights;
    default:
      return state;
  }
}
