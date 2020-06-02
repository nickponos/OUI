import * as types from '../actionType';
import _ from 'lodash';

const initialState = null

export default function user (state = initialState, action = '') {
  switch (action.type) {
    case types.RECEIVE_INIT_STORY_USER_LIST:
      return {
        ...state,
        users: {
          ...action.users
        }
      }
    case types.RECEIVE_USER_STORY:
      return {
        ...state,
        stories: {
          ..._.get(state, 'stories', {}),
          [action.userId]: {
            ..._.get(state, ['stories', action.userId], {}),
            ...action.story
          }
        }
      }
    case types.CHECK_MY_STORY_EXIST: 
      return {
        ...state,
        myStoryExist: action.exist
      }
    case types.READ_USER_STORY: 
      return {
        ...state,
        users: {
          ..._.get(state, 'users', {}),
          [action.userId]: {
            ..._.get(state, ['users', action.userId], {}),
            read: true
          }
        }
      }
    case types.READ_MY_STORY:
      return {
        ...state,
        readMyStory: true,
      }
    case types.TAKE_STORY_USER:
      return {
        ...state,
        currentStoryCreator: action.userId
      }
    default :
      return state
  }
}