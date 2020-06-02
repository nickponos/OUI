import * as types from '../actionType';

export function getUser(user) {
  return {
    type: types.RECEIVE_USER,
    user
  }
}

export function logoutUser () {
  return {
    type: types.LOGOUT
  }
}

export function clear (user) {
  return {
    type: types.CLEAR
  }
}