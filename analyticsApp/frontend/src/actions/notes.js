import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import {
  GET_NOTES,
  ADD_NOTE_FAILURE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_STARTED
} from './types.js';
import { slugify } from '../utils/slug.js';


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


export const addNote = note_obj => dispatch => {
  console.log({...note_obj, "user":1});
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  dispatch(addNoteStarted());
  axios.post("/api/notes", {...note_obj, "user": 1}, config)
    .then(res => {
      dispatch(addNoteSucces(res.data))
    })
    .catch(err => {
      console.log(err.response.data.message);
      dispatch(
        addNoteFailure(err.response.data.message)
      )
    })
}


const addNoteSucces = note => ({
  type: ADD_NOTE_SUCCESS,
  payload: {
    ...note
  }
});

const addNoteStarted = () => ({
  type: ADD_NOTE_STARTED
});

const addNoteFailure = error => ({
  type: ADD_NOTE_FAILURE,
  payload: {
    error
  }
});
