import * as types from '../actionType';

export function saveUserInfo (userInfo) {
  return {
    type: types.SIGNUP_USERINFO,
    userInfo
  }
}

export function saveUserProfile (profile) {
  return {
    type: types.SIGNUP_PROFILE,
    profile
  }
}

export function saveGender (gender) {
  return {
    type: types.SIGNUP_GENDER,
    gender
  }
}

export function saveBirthday(birthday) {
  return {
    type: types.SIGNUP_BIRTHDAY,
    birthday
  }
}

export function savePhonenumber(number) {
  return {
    type: types.SIGNUP_PHONENUMBER,
    number
  }
}

export function finishSignup() {
  return {
    type: types.SIGNUP_FINISHED
  }
}