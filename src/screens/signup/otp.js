import React, { Component } from 'react';
import {
    Platform, Dimensions, StyleSheet, Text, View, SafeAreaView, StatusBar,
    TextInput, TouchableOpacity, ScrollView, Modal, Alert, AsyncStorage
} from 'react-native';
import { Icon } from 'native-base';
// import { Actions } from 'react-native-router-flux';
import Button from '../../components/button'
import MessageBar from '../../components/messageBar'
import RNfirebase from 'react-native-firebase'
import { auth, db, firestore, storage } from '../../components/Firebase';
import navigationService from '../../navigation/navigationService';
import {connect} from 'react-redux';
import {finishSignup} from '../../model/actions/signupAC';
import screens from '../../constants/screens';
import _ from 'lodash';


class OTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            msg: '',
            success: '',
            btnloading: false,
        }
    }
    uploadImage = () => {
        const ext = this.props.signup.profile.split('.').pop(); // Extract image extension
        const filename = `${Date.now()}.${ext}`; // Generate unique name
        this.setState({ uploading: true });
        
                
        // this.props.userData.profile = res.downloadURL
        if (this.props.signup.facebookId) {
            console.log('Facebook ID !!!', this.props.userData)
            const userRef = firestore.collection('users').doc();
            const userID = userRef.id;
            // this.props.userData.userId = userID;
            user.userId = userID;
            // user = firebase.database().ref().child('Users').push(this.props.userData).key
            // this.props.userData.userId = user
            // AsyncStorage.setItem('userData', JSON.stringify(this.props.userData))
            // Actions.reset("Home", { userData: this.props.userData })
        } else {
            auth.createUserWithEmailAndPassword(this.props.signup.email, this.props.signup.password)
                .then((result) => {
                    console.log('Email Signup Result !!!', result)
                    var user = auth.currentUser
                    // let userId = user.uid;
                    // let tempData = this.props.signup;
                    
                    // let userData = _.pick(tempData, ['bio', 'birthday', 'city', 'email', 'facebookId', 'gender', 'name', 'occupation', 'phoneNumber', 'profile', 'userId']);
                    // userData['userId'] = userId;
                    // console.log('userData : ', userData);
                    // firestore.collection('users').doc(userId).set(userData);
                    user.sendEmailVerification()
                        .then((res) => {
                            this.setState({ btnloading: false })
                            console.log('Email Verification sent !!!', res);
                            userData.userId = userId;
                            // const {dispatch} = this.props;
                            // dispatch(finishSignup());

                            if (res == undefined) {
                                this.setState({ msg: 'Email is Wrong', success: false });
                                this.messagebar._animateMessage();
                            // navigationService.reset(screens.APP);
                            } else {
                                this.setState({ msg: 'Verification Email Sent', success: true })
                                this.messagebar._animateMessage()
                                
                                // navigationService.reset(screens.APP);
                            }
                            
                        }).catch((error) => {
                            this.setState({ btnloading: false })
                            console.log("Email Verification Error!!!! = ", error);
                            this.setState({ msg: 'Email Verification Sent Error', success: false })
                            this.messagebar._animateMessage()
                        })
                })
                .catch((error) => {
                    console.log('User Register error', error)
                    this.setState({ msg: error.message, success: false, btnloading: false })
                    this.messagebar._animateMessage()
                })
        }
            
    };
    _continue() {
        this.setState({ btnloading: true })
        confirmResult = this.props.signup.confirmResult
        let { text1, text2, text3, text4, text5, text6 } = this.state
        var code = text1 + text2 + text3 + text4 + text5 + text6
        if (confirmResult && code.length) {
            var credential = RNfirebase.auth.PhoneAuthProvider.credential(confirmResult.verificationId, code) ;
            if (credential.secret == code) {
                // user = firebase.database().ref().child('Users')
                // this.props.signup.phoneNumber = this.props.phoneNumber

                // this.props.userData.id = user.push().key
                console.log("Verification Code Does Match!!!!");
                 this.uploadImage()
                
            }
            else {
                this.setState({ msg: 'Verification Code Does not Match !', success: false, btnloading: false })
                this.messagebar._animateMessage()
            }
        }
    }
    render() {
        console.log("Signup Props ====== ", this.props.signup);
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                <TouchableOpacity style={[styles.backView, { marginHorizontal: 20 }]}
                    onPress={() => navigationService.pop()}>
                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ paddingBottom: '5%' }}>
                    <View style={{ width: '100%', paddingHorizontal: 20, flex: 1 }}>
                        <View style={{ marginTop: 35, marginBottom: 18, width: '100%', }}>
                            <Text style={styles.phoneText}>What's the verification code?</Text>
                        </View>
                        <View style={{ marginBottom: 30, width: '100%', alignItems: 'center' }}>
                            <Text style={styles.descText}>Check your SMS messages, we've sent you the code at {this.props.signup.phoneNumber}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', paddingHorizontal: 50, }}>

                            <View style={[styles.textinputcontainer,]}>
                                <TextInput
                                    style={styles.text}
                                    placeholder=''
                                    maxLength={1}
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    ref={(ref) => { this.text1 = ref; }}
                                    onChangeText={(text) => { this.setState({ text1: text }, () => this.text2.focus()) }}
                                >
                                </TextInput>
                            </View>
                            <View style={[styles.textinputcontainer,]}>
                                <TextInput
                                    style={styles.text}
                                    placeholder=''
                                    maxLength={1}
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    ref={(ref) => { this.text2 = ref; }}
                                    onChangeText={(text) => { this.setState({ text2: text }, () => this.text3.focus()) }}
                                >
                                </TextInput>
                            </View>
                            <View style={[styles.textinputcontainer,]}>
                                <TextInput
                                    style={styles.text}
                                    placeholder=''
                                    maxLength={1}
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    ref={(ref) => { this.text3 = ref; }}
                                    onChangeText={(text) => { this.setState({ text3: text }, () => this.text4.focus()) }}
                                >
                                </TextInput>
                            </View>
                            <View style={[styles.textinputcontainer,]}>
                                <TextInput
                                    style={styles.text}
                                    placeholder=''
                                    maxLength={1}
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    ref={(ref) => { this.text4 = ref; }}
                                    onChangeText={(text) => { this.setState({ text4: text }, () => this.text5.focus()) }}
                                >
                                </TextInput>
                            </View>
                            <View style={[styles.textinputcontainer,]}>
                                <TextInput
                                    style={styles.text}
                                    placeholder=''
                                    maxLength={1}
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    ref={(ref) => { this.text5 = ref; }}
                                    onChangeText={(text) => { this.setState({ text5: text }, () => this.text6.focus()) }}
                                >
                                </TextInput>
                            </View>
                            <View style={[styles.textinputcontainer,]}>
                                <TextInput
                                    style={styles.text}
                                    placeholder=''
                                    maxLength={1}
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    ref={(ref) => { this.text6 = ref; }}
                                    onChangeText={(text) => { this.setState({ text6: text }, () => this._continue()) }}
                                >
                                </TextInput>
                            </View>
                        </View>
                    </View>

                </ScrollView>
                <View style={styles.buttonView}>
                    <Button buttonText='Continue' onClick={() => this._continue()}
                        loading={this.state.btnloading}
                        disabled={this.state.text1 && this.state.text2 && this.state.text3 && this.state.text4 && this.state.text5 && this.state.text6 ? false : true}
                        colors={this.state.text1 && this.state.text2 && this.state.text3 && this.state.text4 && this.state.text5 && this.state.text6 ? ['#a65ae1', '#8a4cea'] : ['#e3cdf8', '#e3cdf8']} style={styles.buttoncontainer} />
                </View>
                <MessageBar success={this.state.success} ref={ref => this.messagebar = ref} error={this.state.msg} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainerView: {
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 5
    },
    phoneText: {
        fontSize: 25,
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        marginHorizontal: 30,
        textAlign: 'center',
    },
    descText: {
        fontSize: 15,
        width: '90%',
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        color: '#000',
        textAlign: 'center',
    },
    countrycontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f3f5',
        height: 50,
        width: '25%',
        justifyContent: 'space-around',
        borderRadius: 12,
        marginTop: 12,
        paddingHorizontal: 5
    },
    textinputcontainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4E4E4',
        height: 60,
        borderRadius: 12,
        marginTop: 12,
        marginHorizontal: 5

    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        color: '(rgba(0,0,0,1))',
        backgroundColor: '#E4E4E4'
    },
    buttonView: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        borderColor: '#f2f3f5',
        borderTopWidth: 1,
        paddingHorizontal: 20
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 50,
        width: '100%',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    }
});

const mapStateToProps = state => ({
    signup: state.signup
})
export default connect(mapStateToProps)(OTP);
