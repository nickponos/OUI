import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Platform, StyleSheet, Text, View, SafeAreaView, Image, StatusBar, Dimensions, Animated } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize"
import Explore from './explore';
import PeopleProfile from './profile'
import Profile from './profile/index'
import SubProfile from './profile/profile'
import EditProfile from './profile/editprofile'
import Saved from './saved'
import Activity from './profile/activity'
import People from './profile/people'
import Setting from './profile/setting'
import Upgrade from './profile/upgrade'
import Message from './message'
import Event from './event/createEvent'
import Button from '../../components/button'
import { AsyncStorage } from "react-native";

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0,
      index: 0,
      tab1: '',
      tab5: '',
      tab2: '',
      subpage: 'Home',
      animation: new Animated.Value(0),
      animatedSearch: new Animated.Value(0),
      height: new Animated.Value(0),
    }
    this._pageNavigate = this._pageNavigate.bind(this)

  }

  _pageNavigate(tab, subPage, data) {
    if (tab == 4) {
      if (subPage == 'view') {
        this.setState({ tab5: <SubProfile userData={data} _pageNavigate={this._pageNavigate} /> })
      }
      else if (subPage == 'edit') {
        this.setState({ tab5: <EditProfile userData={data} _pageNavigate={this._pageNavigate} /> })
      }
      else if (subPage == 'setting') {
        this.setState({ tab5: <Setting userData={data} _pageNavigate={this._pageNavigate} /> })
      } else if (subPage == 'upgrade') {
        this.setState({ tab5: <Upgrade userData={data} _pageNavigate={this._pageNavigate} /> })
      }
      else if (subPage == 'Last activity') {
        this.setState({ tab5: <Activity userData={data} _pageNavigate={this._pageNavigate} /> })
      }
      else if (subPage == 'people') {
        this.setState({ tab5: <People userData={data} _pageNavigate={this._pageNavigate} /> })
      }
      else {
        this.setState({ tab5: <Profile userData={data} _pageNavigate={this._pageNavigate} /> })
      }
    }
    if (tab == 0) {
      if (subPage == 'profile') {
        this.setState({ tab1: <PeopleProfile data={data} _pageNavigate={this._pageNavigate} />, subpage: 'profile' })
      }
      else {
        this.setState({ tab1: <Explore ref={(ref) => this.exploreRef = ref} _pageNavigate={this._pageNavigate} />, subpage: 'explore' })
      }
    }
    if (tab == 1) {
      if (subPage == 'profile') {
        this.setState({ tab2: <PeopleProfile data={data} _pageNavigate={this._pageNavigate} />, subpage: 'profile' })
      }
      else {
        this.setState({ tab2: <Saved _pageNavigate={this._pageNavigate} />, subpage: 'explore' })
      }
    }
  }//marginBottom:-3

  handleClose = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  handleOpen = () => {
    AsyncStorage.setItem("isFirstLogin", "true");
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  componentDidMount() {
    AsyncStorage.getItem('isFirstLogin').then((value) => {
      if (value != 'true')
        this.handleOpen();
    })
      .then(res => {
        //do something else
      });
  }


  render() {
    const screenHeight = Dimensions.get("window").height;
    const backdrop = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 0.01],
            outputRange: [screenHeight, 0],
            extrapolate: "clamp",
          }),
        },
      ],
      opacity: this.state.animation.interpolate({
        inputRange: [0.01, 0.5],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
    };
    const slideUp = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0.01, 1],
            outputRange: [0, -1 * screenHeight],
            extrapolate: "clamp",
          }),
        },
      ],
    };
    console.log('Props', this.props.userData)
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
        <Tabs locked initialPage={this.state.activeTab} onChangeTab={(tab) => this.setState({ index: tab.i }, () => { tab.i == 0 && tab.from == 0 ? this.state.subpage == 'explore' ? this.exploreRef._scrolltoTop() : null : null })} tabBarUnderlineStyle={{ backgroundColor: 'transparent' }} tabBarPosition='bottom' >
          <Tab heading={<TabHeading style={styles.tabHeading} >
            <Image source={require('@images/explore.png')} style={{ height: 20, width: 20, tintColor: this.state.index == 0 ? '#9246e6' : null, marginVertical: 2 }} />
            <Text style={[styles.tabTitle, { color: this.state.index == 0 ? '#9246e6' : '#a8a7b5' }]}>Home</Text>
          </TabHeading>}>
            {this.state.tab1 ? this.state.tab1 : <Explore ref={(ref) => this.exploreRef = ref} _pageNavigate={this._pageNavigate} />}
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading} >
            <Image source={require('@images/people.png')} style={{ height: 22, width: 22, tintColor: this.state.index == 1 ? '#9246e6' : null, marginVertical: 2 }} />
            <Text style={[styles.tabTitle, { color: this.state.index == 1 ? '#9246e6' : '#a8a7b5' }]}>People</Text>
          </TabHeading>}>
            {this.state.tab2 ? this.state.tab2 : <Saved _pageNavigate={this._pageNavigate} />}
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading}>
            <View>
              <View style={{ zIndex: 99, width: 16, height: 16, backgroundColor: '#804AC4', marginLeft: 14, marginBottom: -15, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={[styles.tabTitle, { color: 'white', fontSize: 10 }]}>+9</Text>
              </View>
              <Image source={require('@images/events.png')} style={{ height: 20, width: 20, tintColor: this.state.index == 2 ? '#9246e6' : null, marginVertical: 2, marginLeft: 4, }} />
            </View>
            <Text style={[styles.tabTitle, { color: this.state.index == 2 ? '#9246e6' : '#a8a7b5' }]}>Events</Text>
          </TabHeading>}>
            <Event />
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading}>
            <View>
              <Image source={require('@images/messages.png')} style={{ height: 20, width: 21, tintColor: this.state.index == 3 ? '#9246e6' : null, marginVertical: 2 }} />
            </View>
            <Text style={[styles.tabTitle, { color: this.state.index == 3 ? '#9246e6' : '#a8a7b5' }]}>Messages</Text>
          </TabHeading>}>
            <Message />
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading}>
            <Image source={require('@images/profile.png')} style={{ height: 20, width: 18, tintColor: this.state.index == 4 ? '#9246e6' : null, marginVertical: 2 }} />
            <Text style={[styles.tabTitle, { color: this.state.index == 4 ? '#9246e6' : '#a8a7b5' }]}>Profile</Text>
          </TabHeading>}>
            {this.state.tab5 ? this.state.tab5 : <Profile userData={this.props.userData} _pageNavigate={this._pageNavigate} />}
          </Tab>
        </Tabs>
        <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
          <View style={[styles.sheet]}>
            <Animated.View style={[styles.popup, slideUp]}>
              <ScrollView style={{ height: 440, width: '100%' }}>
                <View style={{ flex: 1, padding: 16, alignItems: 'center' }}>
                  <View style={{ width: 72, height: 4, backgroundColor: '#E5E5E9', borderRadius: 8 }} />
                  <Image source={require('@images/popup_img.png')} style={{ height: 136, width: 136, alignSelf: 'center', marginTop: 36 }} />
                  <Text style={{ marginTop: 16, color: '#000000', fontSize: RFValue(20.4), fontWeight: '600' }}>Activate localization</Text>
                  <Text style={{ paddingHorizontal: 16, marginTop: 8, color: '#000000', fontSize: RFValue(16.32), textAlign: 'center' }}>Your location will be used to help find events near you as well as profiles.</Text>
                  <View style={{ width: '100%', marginTop: 32 }}>
                    <Button buttonText='Apply' onClick={() => { this.handleClose() }} colors={['#a65ae1', '#8a4cea']} style={{ width: '100%' }} />
                  </View>
                </View>
              </ScrollView>
            </Animated.View>
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabHeading: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  tabTitle: {
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    marginVertical: 2,
    fontSize: RFValue(10.88)
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
  sheet: {
    position: "absolute",
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
  },
  popup: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
    marginHorizontal: 16,
    marginBottom: 32
  },
});
