import axios from 'axios';

const GET_FLIGHTS = 'GET_FLIGHTS';

const initialState = {
  returning: [],
  departing: []
};

const getFlights = (flights, isReturn) => ({
  type: GET_FLIGHTS,
  flights,
  isReturn
});

export const getFlightsThunk = (
  origin,
  destination,
  flyDate,
  isReturn
) => async dispatch => {
  const { data } = await axios.get(
    `/api/flights?origin=${origin}&destination=${destination}&departureDate=${flyDate}`
  );
  dispatch(getFlights(data, isReturn));
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FLIGHTS:
      if (action.isReturn) return {...state, returning: action.flights};
      return {...state, departing: action.flights};
    default:
      return state;
  }
}
