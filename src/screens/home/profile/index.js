import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import { RFValue } from "react-native-responsive-fontsize"
import Swiper from 'react-native-swiper';
import navigationService from '../../../navigation/navigationService';
import screens from '../../../constants/screens';

const sc_height = Dimensions.get('window').height;

class ProfileIndex extends Component {
  constructor(props) {
    super(props)
    console.log("ProfileProps=", props);
    this.state = {
      lastActivity: [
        {
          event: true,
          eventTitle: 'Spa Day for mums, sisters, daughters &...',
          requestStatus: 'your request has been rejected - 3j',
          rejected: true,
          image: require('@images/event_7.jpg')
        },
        {
          event: true,
          eventTitle: 'Trip to Plam Shores Beaches',
          requestStatus: 'your request has been accepted - 4j',
          rejected: false,
          image: require('@images/event_1.jpg')
        },
        {
          event: false,
          name: 'Adaora',
          requestStatus: 'Followed you - 6j',
          image: require('@images/user_8.jpg')
        },
        {
          event: true,
          eventTitle: 'Trip to Plam Shores Beaches',
          requestStatus: 'your request has been accepted - 4j',
          rejected: false,
          image: require('@images/event_1.jpg')
        },
        {
          event: false,
          name: 'Adaora',
          requestStatus: 'Followed you - 6j',
          image: require('@images/user_8.jpg')
        }
      ],
      userData: ''
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('userData')
      .then((data) => {
        this.setState({ userData: JSON.parse(data) })
      })
  }
  _button(name, content, icon, onPress, iconstyle) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ marginTop: name == 'Add Media' ? sc_height * 0.04 : 0, padding: 8, flexDirection: 'column', alignItems: 'center', }}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ width: sc_height * 0.1, height: sc_height * 0.1, padding: 3, alignItems: 'center', justifyContent: 'center', borderRadius: sc_height * 0.05 }}>
            <Image source={icon} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 15 }}>
            <View style={{ paddingHorizontal: 5 }}>
              <Text style={{ fontSize: RFValue(13.6), color: name == 'Add Media' ? '#F87292' : '#ABABB8', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', marginBottom: 3 }}>{name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _swiper(title, image, content, style) {
    return (
      <View style={{ alignItems: 'center', height: sc_height * 0.16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={image} style={{ height: sc_height * 0.03, width: sc_height * 0.03 }} />
          <Text style={{
            marginLeft: 12, fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black', fontSize: RFValue(23.12)
          }}>{title}</Text>
        </View>
        <Text style={{ marginTop: 8, width: '80%', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', color: 'black', fontSize: RFValue(17), textAlign: 'center' }}>{content}</Text>
      </View>
    )
  }
  render() {
    const { user } = this.props;
    return (
      <ScrollView style={{ backgroundColor: '#F6F7F8' }}>
        <View style={styles.container}>
          <View style={{ width: '100%', height: sc_height * 0.5, backgroundColor: '#ffffff', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => this.props._pageNavigate(4, 'view', user)}
              style={{ backgroundColor: '#fff', width: '100%', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                <View>
                  {/* <Image source={{ uri: user.profile }} style={{ width: sc_height * 0.14, height: sc_height * 0.14, borderRadius: sc_height * 0.07 }} /> */}
                </View>
                <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                  <View>
                    <Text style={{ fontSize: RFValue(20.4), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', marginBottom: 3, textAlign: 'center' }}>Hey {'user.name'},</Text>
                    <Text style={{ fontSize: RFValue(14.96), color: '#9246e6', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>See and edit profile</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 8, backgroundColor: '#ffffff', flexDirection: 'row', alignSelf: 'center' }}>
              {this._button(
                'Settings', 'Modify and manage your account',
                require('@images/setting.png'),
                () => { this.props._pageNavigate(4, 'setting', user) },
                { width: 20, height: 19 }
              )}
              {this._button(
                'Add Media', 'Take a look at premium account advantages',
                require('@images/media.png'),
                () => { this.props._pageNavigate(4, 'Premium account', user) },
                { width: 22, height: 19 }
              )}
              {this._button(
                'My Activity', 'You have 54 new messages',
                require('@images/activite.png'),
                () => { this.props._pageNavigate(4, 'Last activity', user) },
                { width: 17, height: 18 },
              )}
            </View>
          </View>
          <View style={{ backgroundColor: '#F6F7F8', justifyContent: 'center', height: sc_height * 0.40 }}>
            <View style={{ height: sc_height * 0.20, width: '100%' }}>
              <Swiper horizontal style={{ flex: 1 }} dotStyle={{ backgroundColor: '#c299ef' }} activeDotStyle={{ backgroundColor: '#9c5ce7', height: 10, width: 10, borderRadius: 5, borderColor: '#c299ef', borderWidth: 2 }}>
                {this._swiper('Your event in the top list', require('../../../assets/images/profile_samll.png'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy', { height: 90, width: 160 })}
                {this._swiper('Users that match with you', require('../../../assets/images/user_match.png'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy', { height: 100, width: 88 })}
                {this._swiper('Your profile in the top list', require('../../../assets/images/event.png'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy', { height: 90, width: 170 })}
              </Swiper>
            </View>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigationService.navigate(screens.UPGRADE)} style={{ width: '90%', alignItems: 'center', height: 40, justifyContent: 'center', backgroundColor: 'white', borderRadius: 18 }}>
                <Text style={{ fontSize: RFValue(16.32), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', color: '#a65ae1' }}>2Oui Premium account</Text>
              </TouchableOpacity>
            </View>
            {/* </TouchableOpacity>
            </LinearGradient> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  followDescText: {
    fontSize: RFValue(12.24),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    color: '#aeadba'
  },
  buttoncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 80,
  },

});
//ProfileIndex

const mapStateToProps = state => ({
  // user: state.session.user,
})
export default connect(mapStateToProps)(ProfileIndex);
