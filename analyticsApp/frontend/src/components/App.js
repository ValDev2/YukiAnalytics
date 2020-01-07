import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store.js';
import NotesStream from './NotesStream.js';

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <h1>Hello ! </h1>
        <h1> Notes ! </h1>
        <NotesStream />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
