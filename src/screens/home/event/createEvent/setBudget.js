import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, SafeAreaView,
    StatusBar, TouchableOpacity,
    Image, TextInput, ScrollView, ImageBackground,Switch
} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
// import Switch from '@components/customswitch';
import { Header, Icon, CheckBox } from 'native-base';
import navigationService from '../../../../navigation/navigationService';
import screens from '../../../../constants/screens';
// import { Actions } from 'react-native-router-flux';
//var Switch = require('react-native-material-switch');

export default class SetBudget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switch1Value: false,
            price: ''
        }
    }

    toggleSwitch1 = (value) => {
        this.setState({ switch1Value: value })
        console.log('Switch 1 is: ' + value)
    }
    _next() {
        this.props.eventDetails.budget = { currency: '€', value: this.state.price }
        this.props.eventDetails.budgetAmount = this.state.price
        this.props.eventDetails.budgetCurrency = '€'
        // Actions.ReviewAndPay({ eventDetails: this.props.eventDetails, serachData: this.props.serachData })
        navigationService.navigate(screens.REVIEWAND_PAY, { eventDetails: this.props.eventDetails, serachData: this.props.serachData })
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                <View style={styles.subContainerView}>
                    <ImageBackground resizeMode='cover' source={require('@images/setBudget.png')} style={{ height: 350, marginTop: 0, marginBottom: -1, width: '100%', borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}>
                            <View style={{ alignSelf: 'flex-start', width: '10%', }}>
                                <TouchableOpacity style={styles.backView}
                                    onPress={() => navigationService.pop()}>
                                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#fff', fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[styles.headerText, { color: '#fff', }]}>Step 4 of 5</Text>
                                <TouchableOpacity style={{ width: 50, alignItems: 'flex-end' }} onPress={() => this._next()}>
                                    <Text style={[styles.headerText, { color: '#fff', }]}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.textinputcontainer}>
                        <View style={{ width: '35%', height: 60, justifyContent: 'flex-end', }}>
                            <Text style={{ fontSize: RFValue(17), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>EUR</Text>
                        </View>
                        <View style={{ width: '65%', }}>
                            <TextInput
                                style={styles.textinputtext}
                                placeholder='0'
                                placeholderTextColor='#a8a7b5'
                                autoCapitalize='none'
                                autoCorrect={false}
                                // value={}
                                keyboardType='number-pad'
                                // autoFocus={true}
                                onChangeText={(text) => { this.setState({ price: text }) }}
                            />
                        </View>
                    </View>
                    <View style={{ height: 80, marginTop: -25,
                         marginBottom: 10, width: '102%', 
                         borderWidth: 0, justifyContent: 'space-between', 
                         alignItems: 'center', backgroundColor: '#fff', 
                         flexDirection: 'row', paddingHorizontal:10 }}>
                        <Text style={{ marginTop: 20, marginBottom: 20, marginLeft: '5%', color: '#000', fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', }}>Split budget</Text>
                         <Switch
                            onTintColor="#7E8BFA"
                            thumbTintColor={Platform.OS == 'android' ? "white" : ''}
                            style={{ marginRight: '3%', backgroundColor: 'white' }}
                            onValueChange={this.toggleSwitch1}
                            value={this.state.switch1Value} /> 
                      

                    </View>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                        <Text style={styles.text}>By adding a new event, 2oui takes 10% of your total budget</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        //  paddingHorizontal:20,
        justifyContent: 'flex-start',
        // height: '100%'
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 5
    },
    headerText: {
        // height: 40,
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        // color: '#afaebc',
        marginTop: 10,
        marginBottom: 5
    },

    text: {
        fontSize: RFValue(14.96),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#a8a7b5',
        // backgroundColor: 'gray'
    },
    textinputtext: {
        textAlign: 'right',
        //  height:60,
        fontSize: RFValue(40.8),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000',
        // backgroundColor: 'red'
    },
    textinputcontainer: {
        borderRadius: 26,
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        marginTop: -130,
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderColor: '#f2f3f5',
        backgroundColor: 'white',
        borderBottomWidth: 0,
        borderWidth: 1
    },

});
