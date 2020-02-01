import {
  GET_MATIERES_SUCCESS,
  GET_MATIERES_STARTED,
  GET_MATIERES_FAILURE,
  ADD_MATIERE_STARTED,
  GET_MATIERE_DETAIL_SUCCESS,
  GET_MATIERE_DETAIL_STARTED,
  GET_MATIERE_DETAIL_FAILURE,
  GET_MATIERE_OBJECT_STARTED,
  GET_MATIERE_OBJECT_SUCCESS,
  GET_MATIERE_OBJECT_FAILURE
} from './types.js';
import axios from 'axios';
import { slugify } from '../utils/slug.js';


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

const getMatiereDetail = matiere_obj => ({
  type: GET_MATIERE_DETAIL_SUCCESS,
  payload: matiere_obj
})

const getMatiereDetailStarted = () => ({
  type: GET_MATIERE_DETAIL_STARTED,
})

const getMAtiereDetailFailure = err => ({
  type: GET_MATIERE_DETAIL_FAILURE,
  payload: {
    error: error
  }
})

const getMatiereObjectStated = () => ({
  type: GET_MATIERE_OBJECT_STARTED,
})

const getMatiereObjectSuccess = matiere_obj => ({
  type: GET_MATIERE_OBJECT_SUCCESS,
  payload: matiere_obj
})

const getMatiereObjectFailure = error => ({
  type: GET_MATIERE_OBJECT_FAILURE,
  payload: {
    error: error
  }
})

export const getMatiereObject = slug => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  const token = window.localStorage.getItem("token");
  config.headers["Authorization"] = `Token ${token}`
  dispatch(getMatiereObjectStated());
  axios.get(`/api/matieres/${slug}/`, config)
    .then( res => {
      dispatch(getMatiereObjectSuccess(res.data))
    })
    .catch( err => {
      console.log(err.response)
      dispatch(getMatiereObjectFailure(err.reponse));
    })
}


export const getMatieres = () => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  dispatch(getMatieresStarted());
  const token = window.localStorage.getItem("token");
  config.headers["Authorization"] = `Token ${token}`
  axios.get("/api/matieres/", config)
    .then(res => {
      const matieres = res.data;
      dispatch(getMatieresSuccess(res.data));
      for(let matiere of matieres){
        dispatch(getMatiereDetailStarted());
        axios.get(matiere.url, config)
          .then(res => {
            dispatch(getMatiereDetail(res.data));
          })
          .catch(err => {
            console.log(err);
            dispatch(getMAtiereDetailFailure(err));
          })
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(err.response.data)
    })
}
