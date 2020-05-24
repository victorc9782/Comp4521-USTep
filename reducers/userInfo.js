import { database } from "../config/config";

export const FETCH_USERINFO = 'FETCH_USERINFO';
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const fetchUserInfo = (payload) => ({ type: FETCH_USERINFO, payload });
export const updateUserInfoState = (payload) => ({ type: UPDATE_USERINFO, payload });

/* export function getUserInfo() {
  return dispatch => {
    const users = [];
    database.ref('/users').once('value', (snapshot) => {
        snapshot.forEach(
            child => {
              users.push(child.val());
            });
    }).then(() => dispatch(fetchUserInfo(users)));
  }
} */

export function updateUserInfo() {
  return (dispatch) => {
    database.ref('/users').on('value', (snapshot)  => {
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

const initialState = {
  loading: true,
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