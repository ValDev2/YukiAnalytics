import { combineReducers } from 'redux';
import notes from './notes';
import matieres from './matiere';


export default combineReducers({
  notes,
  matieres
});
