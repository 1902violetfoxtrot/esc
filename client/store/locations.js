import axios from 'axios';

const GET_LOCATIONS_IATA = 'GET_LOCATIONS_IATA'
const GET_FLIGHTS = 'GET_FLIGHTS';

const initialState = {
  returning: [],
  departing: []
};

const getLocationsIATA = (codes) => ({
  type: GET_LOCATIONS_IATA,
  codes
})

const getFlights = (flights, isReturn) => ({
  type: GET_FLIGHTS,
  flights,
  isReturn
});

export const getLocationsThunk = imageData => async dispatch => {
  const { data } = await axios.post('/api/uploads', imageData);
  dispatch(getLocationsIATA(data))
}

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
