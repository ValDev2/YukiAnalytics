import axios from 'axios';
import { GET_NOTES } from './types.js';

export const getNotes = () => dispatch => {
  axios.get("/api/notes")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_NOTES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
}
