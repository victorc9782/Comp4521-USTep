import { combineReducers } from 'redux';
import userInfo from './userInfo';
import { events } from './events';


export const combinedStore = combineReducers({
  /* userInfo, */
  events,
});
