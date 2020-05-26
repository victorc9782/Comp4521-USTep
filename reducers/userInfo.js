/*
#COMP 4521 
#Chu Chun Wai 20344464 cwvchu@connect.ust.hk
#Yip Pak Kin 20360422 pkyipab@connect.ust.hk
#Man Ho Yin 20306137 hymanae@connect.ust.hk
*/
import { database } from "../config/config";

export const FETCH_USERINFO = 'FETCH_USERINFO';
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const fetchUserInfo = (payload) => ({ type: FETCH_USERINFO, payload });
export const updateUserInfoState = (payload) => ({ type: UPDATE_USERINFO, payload });

export function getUserInfo() {
  return (dispatch) => {
    database.ref('/users').on('value', (snapshot) => {
      dispatch(fetchUserInfo(snapshot.val()));
    })
  }
}

export function updateUserInfo() {
  return (dispatch) => {
    database.ref('/users').on('value', (snapshot) => {
      var users = {};
      snapshot.forEach(
        child => {
          var obj = {}
          obj[child.key] = child.val()
          users = Object.assign(users, obj)
        });
      dispatch(updateUserInfoState(users))
    });
  }
}

export function userInfo(state = [], { type, payload }) {
  switch (type) {
    case FETCH_USERINFO:
      return payload;
    case UPDATE_USERINFO:
      return payload;
    default:
      return state;
  }
}