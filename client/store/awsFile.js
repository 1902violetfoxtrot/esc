import axios from 'axios';

const fileState = {};

const SET_MAP_DATA = 'SET_MAP_DATA';

const getMapData = data => ({
  type: SET_MAP_DATA,
  data
});

//AWS file data
export const awsMapThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/AWS/');
      dispatch(getMapData(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//Reducer
export default function(state = fileState, action) {
  switch (action.type) {
    case SET_MAP_DATA:
      return action.data;
    default:
      return state;
  }
}
