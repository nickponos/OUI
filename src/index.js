/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {AppContainer} from './navigation/index';
import navigationService from './navigation/navigationService';
import store from './model/store';

console.ignoredYellowBox = ['Warning'];

const App: () => React$Node = () => {

  let init = async () => {
    //do something async tasks
  };

  let onAppContainerMounted = (ref) => navigationService.setTopLevelNavigator(ref);

  let navigationChanged = () => {
    console.log("Navigation Changed");
  }

  useEffect(() => {
    init().finally(() => {
      SplashScreen.hide();
    });
  }, []);
  
  return (
      <Provider store={store} >
        <AppContainer
          onNavigationStateChange={navigationChanged}
          ref={onAppContainerMounted}
        />
      </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
