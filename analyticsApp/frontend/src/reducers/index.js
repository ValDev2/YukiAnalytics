import { combineReducers } from 'redux';
import notes from './notes';
import authentication from './authentication';
import matieres from './matiere';


export default combineReducers({
  notes,
  matieres,
  authentication
});
