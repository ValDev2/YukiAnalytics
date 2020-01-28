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

const getMatieresSuccess = matiere => ({
  type: GET_MATIERES_SUCCESS,
  payload: matiere
});

const getMatieresFailure = error => ({
  type: GET_MATIERES_FAILURE,
  payload: {
    error: error
  }
});


export const getMatieres = () => (dispatch, getState) => {
  dispatch(getMatieresStarted());
  const token = window.localStorage.getItem("token");
  config.headers["Authorization"] = `Token ${token}`
  axios.get("/api/matieres/", config)
    .then(res => {
      const matieres = res.data
      //calling url-details
      for(let matiere of matieres){
        axios.get(matiere.url, config)
          .then(res => {
            console.log("TOUT BAIGNE ! ")
            dispatch(getMatieresSuccess(res.data));
          })
          .catch(err => {
            console.log(err)
            dispatch(getMatieresFailure(err.response));
          })
      }
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch(getMatieresFailure(err.response.data));
    })
}
