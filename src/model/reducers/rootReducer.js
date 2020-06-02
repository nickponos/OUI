import {combineReducers} from 'redux';
import user from './user';
import signup from './signup';
import story from './story';

export default combineReducers({
  user,
  signup,
  story
})