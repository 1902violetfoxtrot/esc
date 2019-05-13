import axios from 'axios';

const GET_LOCATIONS = 'GET_LOCATIONS';

const initialState = {
  destinationInfo: {}
};

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

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      let newInfo = action.locations.reduce((info, location) => {
        const { longitude, latitude, name } = location;
        info[location.code] = { longitude, latitude, name };
        return info;
      }, {});
      return { ...state, destinationInfo: newInfo };
    default:
      return state;
  }
}
