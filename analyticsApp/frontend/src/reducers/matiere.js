import {
  GET_MATIERES_SUCCESS,
  GET_MATIERES_STARTED,
  GET_MATIERES_FAILURE
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
      }
    case GET_MATIERES_SUCCESS:
      return {
        ...state,
        matieres: [...state.matieres, action.payload],
        loading: false
      }
    case GET_MATIERES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state
  }
}
