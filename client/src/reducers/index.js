import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import animal from './animal';

export default combineReducers({
  alert,
  auth,
  animal,
});
