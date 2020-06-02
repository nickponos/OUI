import {auth, firestore} from '../components/Firebase';
import navigationService from '../navigation/navigationService';
import screens from '../constants/screens';
import store from '../model/store';
import {getUser, logoutUser} from '../model/actions/userAC';
import {fetchInitialStoryUserList, initialStoryUsersObserve} from './story';
import {clearListeners, clearUserListener, hasListener, addListener, setUserListener} from './listeners';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

let firstAuth = true;

async function getUserInfo(authData) {
    // await firestore.collection('users').doc(authData.uid).get().then((sn) => {
    //   if (sn.exists) {
    //     store.dispatch(getUser(sn.data()));
    //   }
    // })
    let userSN = await firestore.collection('users').doc(authData.uid).get();
    console.log("User Data get manually, ", userSN.data());
    let currentState  = store.getState();
    let userListener = firestore.collection('users').doc(authData.uid).onSnapshot((sn) => {
      if (sn.exists) {
        store.dispatch(getUser(sn.data()));
      } else { //Signup
        let tempData = _.get(currentState, 'signup', {});
        let userData = _.pick(tempData, ['bio', 'birthday', 'city', 'email', 'facebookId', 'gender', 'name', 'occupation', 'phoneNumber', 'profile']);
        userData['userId'] = authData.uid;
        firestore.collection('users').doc(authData.uid).set(userData);
      }
    });
    setUserListener(userListener)
}

async function onAuthStateChanged (authData) {
  console.log('authData', authData);
  // navigationService.navigate(screens.AUTH);
  // let currentState  = store.getState();
  // let currentUser = _.get(currentState, 'user', {});
  // let currentSignupCourse = _.get(currentState, 'signup', {});
  // const appInstalled = await AsyncStorage.getItem('TwoOui');
  if (authData) {
    console.log('onAuthStateChanged authData is not null');
    await getUserInfo(authData);
    // fetchInitialStoryUserList();
    store.dispatch(initialStoryUsersObserve());
    navigationService.navigate(screens.APP);
  } else {
    console.log('onAuthStateChanged authData null')
    // if (_.isNil(currentSignupCourse) || currentSignupCourse.signupStarted == false) {
      console.log("Prepareing to Navigate Auth Page");
      clearListeners();
      clearUserListener();
      firstAuth = true;
      setTimeout(() => {
        navigationService.navigate(screens.AUTH);
      }, 1000);
      
      store.dispatch(logoutUser()); 
    // }
  }
}

export function appInitialized () {
  return async function (dispatch, getState) {
    try {
      console.log('appInitialized');
      auth.onAuthStateChanged(onAuthStateChanged)
    } catch (e) {
      console.log('app initialization error', e);
    }
  }
}