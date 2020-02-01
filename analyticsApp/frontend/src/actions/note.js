import {
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  ADD_NOTE_STARTED
} from './types.js';
import axios from 'axios';
import { getMatieres } from './matiere';


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
      note: 15,
      coefficient: 1,
      matiere : 2//matiere_id
    };
    config.headers["Authorization"] = `Token ${token}`
    axios.post("/api/notes/create/", note_obj, config)
      .then( res => {
        console.log(res.data);
      })
      .catch( err => {
        console.log(err.response.data);
      })
  }
}
