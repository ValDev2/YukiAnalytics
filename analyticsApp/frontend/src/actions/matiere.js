import {
  GET_MATIERES_SUCCESS,
  GET_MATIERES_STARTED,
  GET_MATIERES_FAILURE
} from './types.js';
import axios from 'axios';
import { slugify } from '../utils/slug.js';

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
}

const getMatieresStarted = () => ({
  type: GET_MATIERES_STARTED
});

const getMatieresSuccess = matieres => ({
  type: GET_MATIERES_SUCCESS,
  payload: matieres
});

const getMatiereFailure = error => ({
  type: GET_MATIERES_FAILURE,
  payload: {
    error: error
  }
});

export const getMatieres = () => (dispatch, getState) => {
  dispatch(getMatieresStarted());
  const token = window.localStorage.getItem("token");
  config.headers["token"] = `Token ${token}`
  axios.get("/api/matieres/", config)
    .then(res => {
      console.log(res.data);
      dispatch(getMatieresSuccess(res.data));
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch(getMatiereFailure(err.response.data));
    })
}
