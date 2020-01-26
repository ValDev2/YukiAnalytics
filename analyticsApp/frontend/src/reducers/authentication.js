import { authLogin } from '../actions/authentication';
import {
  LOGIN_STARTED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  AUTH_LOGOUT,
  USER_LOADING,
  USER_LOADED,
  USER_LOADING_FAIL,
  REGISTER_STARTED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions/types';

const initialState = {
  loading: false,
  loadingUser: false,
  error: null,
  token: null,
  user_id: null,
  isAuthenticated: null,
  user: null
}

export default function(state=initialState, action){
  console.log(action);
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loading: true
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        loading: false,
        error: action.payload.error
      }
    case LOGIN_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        user_id: action.payload.user_id
      }
    case AUTH_LOGOUT:
      return {
        isAuthenticated: null,
        user: null,
        loading: false,
        token: null,
        error: null
      }
    case USER_LOADING:
      return {
        ...state,
        loadingUser: true
      }
    case USER_LOADED:
      return {
        ...state,
        loadingUser: false,
        user: action.payload
      }
    case USER_LOADING_FAIL:
      return {
        ...state,
        loadingUser: false
      }
    case REGISTER_STARTED:
      return {
        ...state,
        loading: true
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        isAuthenticated: true,
        token: action.payload,
      }
    default:
      return state
  }
}
