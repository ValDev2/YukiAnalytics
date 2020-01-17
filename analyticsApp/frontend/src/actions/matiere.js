import {
  GET_ALL_MATIERE,
  ADD_MATIERE_STARTED,
  ADD_MATIERE_SUCCESS,
  ADD_MATIERE_FAILURE
} from './types.js';
import axios from 'axios';
import { slugify } from '../utils/slug.js';

const header = {
  Authorization : "Token "+window.localStorage.getItem("token")
}


export const get_all_matieres = () => dispatch => {
  axios.get("/api/matieres", {headers:header})
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_ALL_MATIERE,
        payload: res.data
      })
    })
    .catch( err => console.log(err))
}


export const addMatiere = matiere_obj => dispatch => {
  console.log(matiere_obj);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  dispatch(addMatiereStarted());
  axios.post("/api/matieres", matiere_obj, config)
    .then(res => {
      console.log(res.data);
      dispatch(addMatiereSuccess(matiere_obj))
    })
    .catch(err => {
      dispatch(addMatiereFailure(err))
    })
}

const addMatiereStarted = () => ({
  type: ADD_MATIERE_STARTED
})

const addMatiereSuccess = matiere => ({
  type: ADD_MATIERE_SUCCESS,
  payload: matiere
});

const addMatiereFailure = err => ({
  type: ADD_MATIERE_FAILURE,
  payload: err
})
