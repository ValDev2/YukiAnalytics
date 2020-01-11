import {
  GET_NOTES,
  ADD_NOTE_FAILURE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_STARTED
} from '../actions/types.js';

const initialState = {
  notes: [],
  loading: false,
  error: null
}

export default function(state=initialState, action){
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload
      }
    case ADD_NOTE_STARTED:
      return {
        ...state,
        loading: true,
        error: null
      }
    case ADD_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notes: [...state.notes, action.payload]
      }
    default:
      return state;
  }
}
