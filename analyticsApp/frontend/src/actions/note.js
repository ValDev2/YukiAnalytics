import {
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  ADD_NOTE_STARTED
} from './types.js';
import axios from 'axios';
import { getMatiereObject } from './matiere';


const addNoteStarted = () => ({
  type: ADD_NOTE_STARTED,
});

const addNoteFailure = (error) => ({
  type: ADD_NOTE_FAILURE,
  payload: {
    error: error
  }
});

const addNoteSuccess = (note_obj) => ({
  type: ADD_NOTE_SUCCESS,
  payload: note_obj
})


export const addNote = (note, coefficient, matiere_id) => dispatch => {
  dispatch(addNoteStarted());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const token = window.localStorage.getItem("token");
  if(token){
    const note_obj = {
      note: note,
      coefficient: coefficient,
      matiere : matiere_id
    };
    config.headers["Authorization"] = `Token ${token}`
    axios.post("/api/notes/create/", note_obj, config)
      .then( res => {
        dispatch(addNoteSuccess(res.data));
        dispatch(getMatiereObject("linear-algebra"));
      })
      .catch( err => {
        console.log(err);
        dispatch(addNoteFailure(err))
      })
  }
}
