import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store.js';
import NotesStream from './NotesStream.js';
import AddNote from './AddNote.js';

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <h1>Fuck Ui Interface.com </h1>
        <h1> Notes ! </h1>
        <div>
          <AddNote />
          <NotesStream />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
