/*
#COMP 4521 
#Chu Chun Wai 20344464 cwvchu@connect.ust.hk
#Yip Pak Kin 20360422 pkyipab@connect.ust.hk
#Man Ho Yin 20306137 hymanae@connect.ust.hk
*/
import { combineReducers } from 'redux';
import {userInfo} from './userInfo';
import { events } from './events';


export const combinedStore = combineReducers({
  userInfo,
  events,
});
