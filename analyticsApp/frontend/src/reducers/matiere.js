import {
  GET_MATIERES_SUCCESS,
  GET_MATIERES_STARTED,
  GET_MATIERES_FAILURE,
  GET_MATIERE_DETAIL_SUCCESS
 } from '../actions/types.js';


const initialState = {
  matieres: [],
  loading: false,
  error: null
}

export default function(state=initialState, action){
  switch (action.type) {
    case GET_MATIERES_STARTED:
      return {
        ...state,
        loading: true
      };
    case GET_MATIERES_SUCCESS:
      return {
        ...state,
        matieres:  action.payload,
        loading: false
      };
    case GET_MATIERES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case GET_MATIERE_DETAIL_SUCCESS:
      return {
        matieres: state.matieres.map( matiere_obj => matiere_obj.id === action.payload.id ? action.payload : matiere_obj)
      }
    default:
      return state;
  }
}
