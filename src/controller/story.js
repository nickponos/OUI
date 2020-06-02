import {auth, firestore} from '../components/Firebase';
import store from '../model/store';
import {getUserStory, getInitStoryUserList, checkMyStory} from '../model/actions/storyAC';
import {clearListeners, clearUserListener, hasListener, addListener} from './listeners';

export async function fetchInitialStoryUserList() {
    await firestore.collection('users').orderBy('lastStoryUpdated', 'DESC').limit(10).get().then((sn) => {
      if (sn.docs.length > 0) {
        let users = {};
        sn.forEach((doc) => {
          users[doc.id] = doc.data();
        })
        console.log("Init Story Users List == ", users);
        store.dispatch(getInitStoryUserList(users));
      }
    })
}

export function initialStoryUsersObserve() {
  return async function (dispatch, getState) {
    if (!hasListener('story_users_init')) {
      let storyUsersListener = firestore.collection('users').orderBy('lastStoryUpdated', 'DESC').limit(10).onSnapshot((sn) => {
        if (sn.docs.length > 0) {
          let users = {};
          sn.forEach((doc) => {
            let userData = doc.data();
            userData['read'] = false;
            users[doc.id] = userData;

          })
          console.log("Init Story Users List == ", users);
          dispatch(getInitStoryUserList(users));
        }
      });
      addListener('story_users_init', storyUsersListener);
    }
  }
}

export function fetchUserStory(userId) {
  return async function (dispatch, getState) {
    try {
      if (!hasListener('user_story_' + userId)) {
        let userStoryListener = firestore.collection('users').doc(userId).collection('stories').onSnapshot((sn) => {
          let stories = {};
          sn.forEach((doc) => {
            let storyDoc = doc.data();
            let storyId = doc.id;
            stories[storyId] = storyDoc;
          })
          dispatch(getUserStory(userId, stories));
          console.log('Fetch Stories Result ', stories)
        })
        addListener('user_story_' + userId, userStoryListener);
      } 
    } catch (e) {
      console.log("Fetch My Story Error = ", e);
    }
  }
}