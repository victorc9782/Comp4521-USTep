import { database } from "firebase";

export const FETCH_USERINFO = 'FETCH_USERINFO';
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const fetchUserInfo = (payload) => ({ type: FETCH_USERINFO, payload });
export const updateUserInfoState = (payload) => ({ type: UPDATE_USERINFO, payload });

export function getUserInfo() {
  return dispatch => {
    const users = [];
    database.ref('/users').once('value', snap => {
      snap.forEach(child =>
        users.push(child.val()));
    }).then(dispatch(fetchUserInfo(users)));
  }
}

export function updateUserInfo() {
  return dispatch => {
    database.ref('/users').on('value', snap => {
      const users = [];
      snap.forEach(child =>
        users.push(child.val()));
      dispatch(updateUserInfo(users))
    });
  }
}


const userInfo = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_USERINFO:
      return payload;
    case UPDATE_EVENTS:
      return payload;
    default:
      return state;
  }
}
export default userInfo;