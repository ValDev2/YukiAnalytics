import {
  LOGIN_STARTED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from './types'
import axios from 'axios';


const authLoginStarted = () => ({
  type: LOGIN_STARTED
});

const authLoginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: {
    error: error
  }
});

const authLoginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: token
});


export const authLogin = (username, password) => dispatch => {
  dispatch(authLoginStarted());
  console.log("DISPATCHED START")
  axios.post("/rest-auth/login/",
  {
    username: username,
    password: password
  })
  .then( res => {
    console.log(res);
    const token = res.data.key;
    window.localStorage.setItem("token", token);
    dispatch(authLoginSuccess(token));
  })
  .catch( err => {
    dispatch(authLoginFailure(err.response.data));
  })
}
