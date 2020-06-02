import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator
} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Button from '../../components/button';
import Swiper from 'react-native-swiper';
import { RFValue } from "react-native-responsive-fontsize";
// import { setUserData } from '../../actions/actioncreators/session'
// import store from '../../store'
// import { appInitialized } from '../../controllers/init'
// import { firestore } from '../../components/Firebase';
import navigationService from '../../navigation/navigationService';
import screens from '../../constants/screens';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }
  componentWillMount() {
    // var chatref = firebase.database().ref()
    // store.dispatch(appInitialized())    
    
    // AsyncStorage.getItem('userData').then(user => {
    //   user = JSON.parse(user)
    //   // console.log("First Page User @@@ : ",user)
    //   if (user) {
    //     // chatref.child('Users/' + user.userId)
    //     //   .once('value', (snapshot) => {
    //     //     console.log(snapshot.val());
    //     //     if (snapshot.val()) {
    //     //       var userData = snapshot.val()
    //     //       // userData.userId = snapshot.key
    //     //       this.props.setUserData(userData);
    //     //       this.setState({ loading: false })
    //     //       Actions.Home({ userData: userData })
    //     //     }
    //     //   })
    //     firestore.collection('newUsers').doc(user.userId).get().then(doc => {
          
    //       if (doc.exists) {
    //         console.log("User Data =", doc.data());
    //         let userData = doc.data();
    //         this.props.setUserData(userData);
    //         this.setState({loading: false})
    //         Actions.Home({ userData: userData });
    //       }
    //     })
    //   }
    //   else {
    //     this.setState({ loading: false })
    //   }
    // })
  }

  componentDidMount() {
    AsyncStorage.setItem('TwoOui', 'Installed');
  }

  _swiperContent(title, subtitle) {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.9, justifyContent: 'center' }}>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View>
            <Image style={{ height: 80, width: 80 }} source={require('../../assets/images/logo.png')} />
          </View>
          <View style={styles.textView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button buttonText='Sign up' colors={['#a65ae1', '#8a4cea']} style={styles.button}
              onClick={() => {navigationService.navigate(screens.SIGNUP)}} />
            <TouchableOpacity onPress={() => {navigationService.navigate(screens.LOGIN)}} style={styles.button}>
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
    <Swiper horizontal
        loop
        dotColor='#cbcbcb'
        dotStyle={{ bottom: 125 }}
        activeDotStyle={{ bottom: 125 }}
        activeDotColor='#ffffff' >
        <ImageBackground resizeMode='cover' source={require('../../assets/images/loginbackground1.png')} style={styles.imageBackground}>
        {this._swiperContent('Dating by events', 'The first mobile application to meet people by events.')}
        </ImageBackground>
        <ImageBackground source={require('../../assets/images/loginbackground2.png')} style={styles.imageBackground}>
        {this._swiperContent('Meet new people', 'Find new friends or maybe your love.')}
        </ImageBackground>
    </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  imageBackground: {
    width: null,
    height: null,
    flex: 1,
  },
  textView: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: RFValue(27.2),
    marginVertical: 3,
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFValue(15.64),
    width: '75%',
    marginVertical: 5,
    fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
  },
  buttonView: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
  }
});


const mapStateToProps = state => ({
//   user: state.session.user,
})
export default connect(mapStateToProps)(Login);
