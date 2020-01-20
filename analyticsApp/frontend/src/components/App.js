import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store.js';
import LoginPage from './MasterAuthForm/AuthenticationPage';
import { loadUser } from '../actions/authentication';

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return(
      <Provider store={store}>
        <div>
          <LoginPage />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
