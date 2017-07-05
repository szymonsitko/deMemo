import { combineReducers } from 'redux';
import DatabaseReducer from './DatabaseReducer';

export default combineReducers({
  database: DatabaseReducer,
});
