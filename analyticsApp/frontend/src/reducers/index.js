import { combineReducers } from 'redux';
import authentication from './authentication';
import matieres from './matiere';


export default combineReducers({
  matieres,
  authentication
});
