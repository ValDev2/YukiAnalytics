import { authLogin } from '../actions/authentication';
import {
  LOGIN_STARTED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  token: null
}

export default function(state=initialState, action){
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loading: true
      }
    case LOGIN_FAILURE:
      return {
        token: null,
        loading: false,
        error: action.payload.error
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload
      }
    default:
      return state
  }
}
