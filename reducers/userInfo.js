import { database } from "../config/config";

export const FETCH_USERINFO = 'FETCH_USERINFO';
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const fetchUserInfo = (payload) => ({ type: FETCH_USERINFO, payload });
export const updateUserInfoState = (payload) => ({ type: UPDATE_USERINFO, payload });

/* export function getUserInfo() {
  return dispatch => {
    const users = [];
    database.ref('/users').once('value', snap => {
      snap.forEach(child =>
        users.push(child.val()));
    }).then(dispatch(fetchUserInfo(users)));
  }
} */

export function watchUserInfoChange() {
  return dispatch => {
    database.ref('/users').on('value', snap => {
      dispatch(updateUserInfoState(snap.val()))
    });
  }
}

const initialState = {
  loading: true,
}

const userInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USERINFO:
      return {
        users: payload,
        loading: false
      };
    default:
      return state;
  }
}
export default userInfo;