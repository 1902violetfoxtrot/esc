import axios from 'axios';

const filesState = [];

/**
 * ACTION TYPES
 */
const SET_FILES = 'SET_FILES';

/**
 * ACTION CREATORS
 */
export const getFiles = file => ({ type: SET_FILES, file });

export const filesThunk = fileToSend => {
  return async dispatch => {
    try {
      const { data } = await axios.post('api/uploads/', fileToSend);
      dispatch(getFiles(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const filesReducer = (state = filesState, action) => {
  switch (action.type) {
    case SET_FILES:
      return [...state, action.files];
    default:
      return state;
  }
};

export default filesReducer;
