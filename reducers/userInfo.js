
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const updateUserInfoState = (infoList) => {
  console.log("updateUserInfoState")
  console.log(infoList)
  return {
      type: UPDATE_USERINFO,
      payload: { infoList }
  }
}
const initalState = {
    infoList: null,
  };

const userInfo = (state = initalState, { type, payload })  =>{
    switch (type) {
        case UPDATE_USERINFO: 
          return {
            ...state,
            infoList: payload.infoList,
          };
        default:
          return state;
      }
}
export default userInfo;