import {
  LOGIN_STARTED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  AUTH_LOGOUT,
  USER_LOADED,
  USER_LOADING,
  USER_LOADING_FAIL,
  REGISTER_STARTED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
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

const authLoginSuccess = (token, user_id) => ({
  type: LOGIN_SUCCESS,
  payload: {
    token: token,
    user_id: user_id
  }
});

const userLoaded = user => ({
  type: USER_LOADED,
  payload: user
})

const userLoadingFail = () => ({
  type: USER_LOADING_FAIL
})

const registerStarted = () => ({
  type: REGISTER_STARTED
})

const registerSuccess = token => ({
  type: REGISTER_SUCCESS,
  payload: token
})

const registerFailure = error => ({
  type: REGISTER_FAILURE,
  payload: {
    error: error
  }
})


export const authRegister = (username, email, password1, password2) => dispatch => {
  dispatch(registerStarted());
  const user_obj = {
    username: username,
    email: email,
    password1: password1,
    password2: password2
  }
  axios.post("/rest-auth/registration/", user_obj)
    .then(res => {
      console.log(res.data)
      const token = res.data.key;
      const user_id = res.data.user_id;
      const expirationDate = new Date().getTime() + 3600 * 1000
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user_id", user_id);
      window.localStorage.getItem("expirationDate", expirationDate);
      dispatch(registerSuccess(token))
      dispatch(authLoginSuccess(token, user_id))
      dispatch(loadUser());
      dispatch(checkAuthTimeouT(3600));
    })
    .catch(err => {
      console.log(err.response);
      dispatch(registerFailure(err.response))
    })
}



export const logout = () => {
  window.localStorage.setItem("token", null);
  window.localStorage.setItem("expirationDate", null);
  window.localStorage.setItem("user_id", null);
  return {
    type: AUTH_LOGOUT
  }
}

export const authLogin = (username, password) => dispatch => {
  dispatch(authLoginStarted());
  axios.post("/rest-auth/login/",
  {
    username: username,
    password: password
  })
  .then( res => {
    console.log(res);
    const token = res.data.key;
    const user_id = res.data.user_id;
    const expirationDate = new Date().getTime() + 3600 * 1000
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("expirationDate", expirationDate);
    window.localStorage.setItem("user_id", user_id);
    dispatch(authLoginSuccess(token, user_id));
    dispatch(loadUser());
    dispatch(checkAuthTimeouT(3600));
  })
  .catch( err => {
    dispatch(authLoginFailure(err.response.data));
  })
}

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });
  //Getting the Token
  const token = getState().authentication.token;
  const user_id = getState().authentication.user_id;

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  //if token => add to header
  if(token){
    config.headers["Authorization"] = `Token ${token}`;
    axios.get(`/api/users/${user_id}/`, config)
      .then(res => {
        const user = res.data
        dispatch(userLoaded(user));
      })
      .catch(err => {
        dispatch(authLoginFailure(err.response.data));
      })
  }
  else {
    dispatch(userLoadingFail());
  }
}

const checkAuthTimeouT = expirationTime => dispatch =>  {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000)
}

export const authCheckState = () => (dispatch, getState) => {
  const token = window.localStorage.getItem("token");
  if(token === null){
    dispatch(logout());
  } else {
    const expirationDate = window.localStorage.getItem("expirationDate");
    if(new Date(expirationDate) <= new Date()){
      dispatch(logout());
    } else {
      const user_id = window.localStorage.getItem("user_id");
      dispatch(authLoginSuccess(token, user_id));
      checkAuthTimeouT((new Date(expirationDate).getTime() - new Date().getTime()) / 1000);
    }
  }
  const expirationDate = window.localStorage.getItem("expirationDate");

}
