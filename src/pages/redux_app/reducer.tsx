import { combineReducers } from 'redux';

const initialState = {
  page: "login",
  name: "zhangSan",
  password: "123456"
}

function loginPageData(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case 'CHANGE_NAME':
      return Object.assign({}, state, {
        name: data.name
      });
    case 'CHANGE_PWD':
      return Object.assign({}, state, {
        password: data.password
      });
    default:
      return state;
  }
}
// ... other reducer methods
const otherPageData = (state = { page: 'others' }, action) => {
  return state
}

export default combineReducers({
  loginPageData,
  // ... other reducers
  otherPageData
})