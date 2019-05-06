import axios from 'axios';

//files Thunk handler
export const filesThunk = filesToSend => {
  return async () => {
    try {
      await axios.post('api/uploads/', filesToSend);
    } catch (error) {
      console.error(error);
    }
  };
};

