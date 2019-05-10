import axios from 'axios';

const instagramImagesState = [];

const SET_IMAGES = 'SET_IMAGES';

export const getImages = images => ({
  type: SET_IMAGES,
  images
});

//instagram Thunk handler
export const instagramThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/users/instagram');
      dispatch(getImages(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//Reducer
export default function(state = instagramImagesState, action) {
  switch (action.type) {
    case SET_IMAGES:
      return action.images;
    default:
      return state;
  }
}
