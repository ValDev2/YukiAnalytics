import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store.js';
import LoginPage from './MasterAuthForm/AuthenticationPage';

class App extends Component {
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
