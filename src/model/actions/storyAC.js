import * as types from '../actionType';
import {auth} from '../../components/Firebase';

export function getInitStoryUserList(users) {
  return {
    type: types.RECEIVE_INIT_STORY_USER_LIST,
    users
  }
}

export function getUserStory(userId, story) {
  return {
    type: types.RECEIVE_USER_STORY,
    userId,
    story
  }
}

export function checkMyStory(exist) {
  return {
    type: types.CHECK_MY_STORY_EXIST,
    exist
  }
}

export function readUserStory(userId) {
  return {
    type: types.READ_USER_STORY,
    userId
  }
}

export function takeStoryUser(userId) {
  return {
    type: types.TAKE_STORY_USER,
    userId
  }
}
