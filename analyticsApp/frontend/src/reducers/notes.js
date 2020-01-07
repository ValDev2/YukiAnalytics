import { GET_NOTES } from '../actions/types.js';

const initialState = {
  notes: []
}

export default function(state=initialState, action){
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload
      }
      break;
    default:
      return state;
  }
}
