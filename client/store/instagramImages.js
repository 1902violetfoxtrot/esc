import axios from 'axios';

const instagramState = {};

const SET_DATA_INSTAGRAM = 'SET_DATA_INSTAGRAM';

const getDataInstagram = data => ({
  type: SET_DATA_INSTAGRAM,
  data
});

//instagram Thunk handler
export const instagramThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/users/instagram');
      dispatch(getDataInstagram(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//Reducer
export default function(state = instagramState, action) {
  switch (action.type) {
    case SET_DATA_INSTAGRAM:
      return action.data;
    default:
      return state;
  }
}
