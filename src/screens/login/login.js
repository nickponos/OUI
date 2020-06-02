import React, { Component } from 'react';
import { Platform, StyleSheet, Dimensions, Text, AsyncStorage, TextInput, View, ScrollView, KeyboardAvoidingView, SafeAreaView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base'
// import { Actions } from 'react-native-router-flux';
import Button from '../../components/button';
// import { LoginManager, AccessToken } from "react-native-fbsdk";
import { connect } from 'react-redux';
// import RNfirebase from 'react-native-firebase';
import { auth } from '../../components/Firebase';
import MessageBar from '../../components/messageBar';
// import CryptoJS from "react-native-crypto-js";
// import { setUserData } from '../../actions/actioncreators/session'
import navigationService from '../../navigation/navigationService';
import screens from '../../constants/screens';
import Back from '../../components/icons/back';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            msg: '',
            success: '',
            loading: false
        }
    }
    _facebookSignUp() {
        // LoginManager.logOut()
        // LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        //     .then((result) => {
        //         if (result.isCancelled) {
        //             alert('Login cancelled');
        //         }
        //         else {
        //             AccessToken.getCurrentAccessToken().then((data) => {
        //                 const credential = RNfirebase.auth.FacebookAuthProvider.credential(data.accessToken);
        //                 auth.signInAndRetrieveDataWithCredential(credential)
        //                     .then((res) => {
        //                         console.log('facebook console', res)
        //                         // this.setState({ msg: 'Verification Email Sent', success: true })
        //                         // this.messagebar._animateMessage()
        //                         // setTimeout(() => {
        //                         if (res.additionalUserInfo.isNewUser) {
        //                             // var user = firebase.database().ref().child('Users')
        //                             const ref = firestore.collection('newUsers').doc();
        //                             const key = ref.id;
        //                             firestore.collection('newUsers').doc(key).set({
        //                                 facebookId: res.user.providerData[0].uid,
        //                                 // facebookId: result.id,
        //                                 name: res.user.displayName,
        //                                 email: res.user.email ? res.user.email : '',
        //                                 password: null,
        //                                 profile: res.user.photoURL
                                            
        //                             }).then((data) => {
        //                                 Actions.CompleteYourProfile({ userId: key })
        //                             }).catch((error) =>{

        //                             })
                                    
                                    
        //                         }
        //                         else {
        //                              this.setState({ msg: 'You are Successfully logged in', success: true })
        //                              this.messagebar._animateMessage()
        //                             firestore.collection('newUsers').get().then((snapShopts) => {
        //                                 snapShopts.forEach(user => {
        //                                    if (user.data().facebookId == res.additionalUserInfo.profile.id) {
        //                                        let userData = user.data();
        //                                        userData.userId = res.user.uid;
        //                                        AsyncStorage.setItem('userData', JSON.stringify(userData))
        //                                         Actions.reset('Home', { userData: userData })
        //                                    } 
        //                                 });
        //                             })
        //                             Actions.reset('Home')
        //                         }
        //                     }).catch((error) => {
        //                         console.log('error---', error)
        //                         this.setState({ msg: error.message, success: false })
        //                         this.messagebar._animateMessage()
        //                     })
        //             }).catch((error) => {
        //                 console.log('error---', error)
        //             })
        //         }
        //     })
    }
    _login() {
        this.setState({loading: true});
        auth.signInWithEmailAndPassword(this.state.emailId, this.state.password)
            .then((result) => {
                this.setState({loading: false});
                // firestore.collection('users').doc(result.user.uid).get().then((doc) => {
                //     if (doc.exists) {
                //         console.log("SignIn Data = ", doc.data());
                //         let userData = doc.data();
                //         this.props.setUserData(userData);
                //         AsyncStorage.setItem('userData', JSON.stringify(userData))
                //         Actions.reset('Home', { userData: userData })
                //     }
                // })
                console.log("Login Data === ", result);
                // navigationService.reset(screens.APP);
            })
            .catch((error) => {
                this.setState({loading: false});
                console.log('Login Error', error)
                this.setState({ msg: error.message, success: false })
                this.messagebar._animateMessage()
            })
        // navigationService.navigate(screens.APP);
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                
                    <View style={styles.subContainerView}>
                        <TouchableOpacity onPress={() => navigationService.pop()} style={styles.backView}>
                            <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                            {/* <Back size={35} /> */}
                        </TouchableOpacity>
                        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                            {/* <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null}> */}
                            <View style={{ marginTop: '10%', marginBottom: '10%', width: '100%', }}>
                                <Text style={styles.welcomText}>Welcome back</Text>
                            </View>
                            <View style={styles.textinputcontainer}>
                                <TextInput
                                    style={styles.text}
                                    placeholder='Email'
                                    placeholderTextColor='rgba(0,0,0,0.5)'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='email-address'
                                    autoFocus={true}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => this.pass.focus()}
                                    onChangeText={(text) => { this.setState({ emailId: text }) }}
                                >
                                </TextInput>
                            </View>
                            <View style={styles.textinputcontainer}>
                                <TextInput
                                    style={styles.text}
                                    placeholder='Password'
                                    placeholderTextColor='rgba(0,0,0,0.5)'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    ref={(ref) => { this.pass = ref; }}
                                    onChangeText={(text) => { this.setState({ password: text }) }}
                                //onChangeText={()=>this.setState({disableButton:false})}
                                >
                                </TextInput>
                            </View>
                            <Button onClick={() => this._login()} buttonText='Log in' disabled={this.state.emailId && this.state.password ? false : true} colors={this.state.emailId && this.state.password ? ['#a65ae1', '#8a4cea'] : ['#e3cdf8', '#e3cdf8']} style={[styles.buttoncontainer, { marginTop: 35 }]} />
                            <Button buttonText='Log in with Facebook' onClick={() => this._facebookSignUp()}
                                colors={['#4497de', '#4179bc']} style={[styles.buttoncontainer, { marginTop: 5 }]} />
                            <TouchableOpacity onPress={() => navigationService.navigate(screens.FORGOT_PASSWORD)} style={{ marginTop: '10%', alignItems: 'center' }}>
                                <Text style={{ height: 20, fontSize: 16, color: '#9246e6', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>Forgot password? </Text>
                            </TouchableOpacity>
                            {/* </KeyboardAvoidingView> */}
                        </ScrollView>
                    </View>
                    {
                    this.state.loading == true ? 
                    <View style={styles.loadingWrapper}>
                        <ActivityIndicator size={'large'} />
                    </View>
                    :
                    null
                }
                <MessageBar success={this.state.success} ref={ref => this.messagebar = ref} error={this.state.msg} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        //  alignItems: 'center',
        backgroundColor: '#fff',
    },
    subContainerView: {
        width: '90%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        height: '100%'
    },
    welcomText: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        height: 40,
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 5
    },
    textinputcontainer: {
        justifyContent: 'center',
        backgroundColor: '#f2f3f5',
        height: 50,
        width: '100%',
        borderRadius: 12,
        paddingLeft: 15,
        marginTop: 12
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        height: 50, width: '100%',
        borderRadius: 25,
    },
    text: {
        fontSize: 15,
        color: '(rgba(0,0,0,0.5))'
    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    },
    loadingWrapper: {
        position: 'absolute',
        top: 0, 
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    }
});

const mapStateToProps = state => ({
    // user: state.session.user,
})
export default connect(mapStateToProps)(Login);