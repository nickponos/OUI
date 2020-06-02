import * as types from '../actionType';

const initialState = null

export default function user (state = initialState, action = '') {
  switch (action.type) {
    case types.SIGNUP_USERINFO:
      return {
        ...state,
        ...action.userInfo
      }
    case types.SIGNUP_PROFILE:
      return {
        ...state,
        ...action.profile
      }
    case types.SIGNUP_GENDER:
      return {
        ...state,
        ...action.gender
      }
    case types.SIGNUP_PHONENUMBER:
      return {
        ...state,
        ...action.number
      }
    case types.SIGNUP_BIRTHDAY:
      return {
        ...state,
        ...action.birthday
      }
    case types.SIGNUP_FINISHED:
      return {
        ...state,
        signupStarted: false
      }
    default :
      return state
  }
}