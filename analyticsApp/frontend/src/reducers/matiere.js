import {
  GET_ALL_MATIERE,
  ADD_MATIERE_STARTED,
  ADD_MATIERE_SUCCESS,
  ADD_MATIERE_FAILURE
 } from '../actions/types.js';


const initialstate = {
  matieres: [],
  loading: false,
  error: null
}

export default function(state=initialstate, action){
  switch (action.type) {
    case GET_ALL_MATIERE:
      return {
        ...state,
        matieres: action.payload
      }
    case ADD_MATIERE_STARTED:
      return {
        ...state,
        loading: true,
        error: null
      }
    case ADD_MATIERE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case ADD_MATIERE_SUCCESS:
      return {
        matieres:  [...state, action.payload],
        loading: false,
        error: null
      }
    default:
      return state;
  }
}
