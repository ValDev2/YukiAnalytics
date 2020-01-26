import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import ProtectedRoute from './commons/ProtectedRoute';
import store from '../store.js';
import { loadUser, authCheckState } from '../actions/authentication';
import LoginPage from './Authentication/AuthenticationPage';
import Dashboard from './Dashboard/Dashboard';


class App extends Component {
  componentDidMount(){
    store.dispatch(authCheckState());
    store.dispatch(loadUser());
  }

  render(){
    return(
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/login">
                  <LoginPage />
                </Route>
                <ProtectedRoute exact path="/" component={Dashboard} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
