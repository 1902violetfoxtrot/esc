import axios from 'axios';

const instagramState = {
  images: [],
  locations: {}
};

const GET_IG_LOCATIONS = 'GET_IG_LOCATIONS';

const SET_INSTAGRAM_IMAGES = 'SET_INSTAGRAM_IMAGES';

const getInstagramImages = images => ({
  type: SET_INSTAGRAM_IMAGES,
  images
});

const getIGLocations = locations => ({
  type: GET_IG_LOCATIONS,
  locations
});

//instagram Thunk handler
export const instagramThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/users/instagram');
      dispatch(getInstagramImages(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const instagramLocsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/users/instagramLocs');
      dispatch(getIGLocations(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//Reducer
export default function(state = instagramState, action) {
  switch (action.type) {
    case SET_INSTAGRAM_IMAGES:
      return { ...state, images: action.images };
    case GET_IG_LOCATIONS:
      let newInfo = action.locations.reduce((info, location) => {
        const { longitude, latitude, name } = location;
        info[location.code] = { longitude, latitude, name };
        return info;
      }, {});
      return { ...state, locations: newInfo };
    default:
      return state;
  }
}
