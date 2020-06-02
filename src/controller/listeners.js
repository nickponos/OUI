import _ from 'lodash'

let listeners = {}

export function addListener (key, l) {
  // console.log('add listener', l)
  listeners[key] = l
}

export function hasListener (key) {
  return _.has(listeners, key)
}

export function clearListeners () {
  console.log('clear listeners:')
  for (const key in listeners) {
    console.log('unsubscribe:', key, l)
    const l = _.get(listeners, key)
    if (l) {
      l()
      delete listeners[key]
    }
  }

  listeners = {}
}

export function offListener (key) {
  const l = _.get(listeners, key)
  if (l) {
    l()
    delete listeners[key]
  }
}

export function offListenerWithPrefix(prefix) {
  
  for (const key in listeners) {
    if (key.indexOf(prefix) > -1) {
      const l = listeners[key]
      // console.log('unsubscribe:', l)
      // l()
      offListener(key);
    }  
  }
  
}

let userRef

export function setUserListener (ref) {
  userRef = ref
}

export function clearUserListener () {
  console.log("clearUserListener !!!!");
  if (userRef) userRef()
  userRef = null;
}

let myStoryListener;

export function setMyStoryListener (listener) {
  myStoryListener = listener;
}

export function clearMyStoryListener () {
  if (myStoryListener)
    myStoryListener();
  myStoryListener = null;
}

let storyUsersListener;

export function setInitStoryUsersListener (listener) {
  storyUsersListener = listener;
}

export function clearInitStoryUsersListener () {
  if (storyUsersListener)
    storyUsersListener();
  storyUsersListener = null;
}
