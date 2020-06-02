import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity,
    Image, TextInput, ScrollView, Dimensions
} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { Header, Icon, CheckBox } from 'native-base';
// import { Actions } from 'react-native-router-flux';
// import { DatePicker } from 'react-native-wheel-datepicker';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import navigationService from '../../../../../navigation/navigationService';
import screens from '../../../../../constants/screens';

var moment = require('moment');
const width = Dimensions.get('window').width

export default class AddEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guest: 4,
            gender: 'any',
            age: [18, 32],
            filter_age: [18, 32],
        }
        this._setGuestsData = this._setGuestsData.bind(this)
    }

    _renderList(title, value, onclick) {
        return (
            <TouchableOpacity style={styles.filterContainer} onPress={onclick}>
                <View style={styles.filterView}>
                    <Text style={[styles.itemText, { color: '#000' }]}>{title}</Text>
                    <View style={{ right: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 150, marginRight: 10, }}>
                            <Text numberOfLines={1} style={[styles.itemText, { color: '#a5a4b2', textAlign: 'right' }]}>{value}</Text>
                        </View>
                        <Icon name='angle-right' type='FontAwesome' style={{ color: 'grey', fontSize: 25 }} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _setGuestsData(type, value) {
        console.log("type value ", type, value[0])
        if (type == 'guest') {
            this.setState({ guest: value[0] })
        }
        else if (type == 'gender') {
            this.setState({ gender: value })
        }
        else if (type == 'age') {
            this.setState({ age: value })
        }
    }
    _next() {

        this.props.eventDetails.guest = this.state.guest
        this.props.eventDetails.gender = this.state.gender
        this.props.eventDetails.age = this.state.filter_age
        // Actions.SetBudget({ eventDetails: this.props.eventDetails, serachData: this.props.serachData })
        navigationService.navigate(screens.SET_BUDGET, { eventDetails: this.props.eventDetails, serachData: this.props.serachData });
    }
    _renderGuest = () => {
        return (
            <View style={styles.filterContainer} >
                <View style={styles.filterView}>
                    <Text style={[styles.itemText, { color: '#000' }]}>{"Guest"}</Text>
                    <View style={{ right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => {
                            if (this.state.guest > 1)
                                this.setState({ guest: --this.state.guest })
                        }}>
                            <Image source={require('@images/minus_button.png')} style={{ height: 32, width: 32 }} />
                        </TouchableOpacity>
                        <View style={{ width: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Text numberOfLines={1} style={[styles.itemText, { color: '#a5a4b2', textAlign: 'center' }]}>{this.state.guest}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ guest: ++this.state.guest })}>
                            <Image source={require('@images/add_button.png')} style={{ height: 32, width: 32 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    _renderGender = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                {this._GenderList('Any')}
                {this._GenderList('Female')}
                {this._GenderList('Male')}
                {this._GenderList('Other')}
            </View>
        )
    }
    _GenderList = (title) => {
        return (
            <TouchableOpacity onPress={() => this.setState({ gender: title })} >
                <View style={styles.genderView}>
                    <Text style={styles.itemText}>{title}</Text>
                    <View style={{ right: 10, }}>
                        <CheckBox color='#8a4cea'
                            checked={this.state.gender == title ? true : false}
                            onPress={() => this.setState({ gender: title })}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _renderAge = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Text style={{ color: '#000', fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Age</Text>
                    <Text style={{ marginLeft: '5%', marginTop: 20, marginBottom: 20, color: '#000', fontSize: RFValue(13.6), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>{this.state.filter_age[0]} - {this.state.filter_age[1]} y.o</Text>
                </View>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <MultiSlider
                        values={[this.state.filter_age[0], this.state.filter_age[1]]}
                        min={15}
                        max={100}
                        onValuesChange={(value) => this.setState({ filter_age: value })}
                        sliderLength={width - 30}
                        selectedStyle={{
                            backgroundColor: "#9246e6",
                        }}
                        unselectedStyle={{
                            backgroundColor: "#F3F3F5",
                        }}
                        containerStyle={{
                            height: 40,
                        }}
                        trackStyle={{
                            height: 8,
                            backgroundColor: "red",
                        }}
                        markerStyle={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            backgroundColor: '#9246e6',
                            borderWidth: 0.5,
                            borderColor: '#9246e6',
                            marginTop: 10
                        }}
                        touchDimensions={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            slipDisplacement: 40,
                        }}
                    />
                </View>
            </View>
        )
    }
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />

                <View style={styles.subContainerView}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}>
                            <View style={{ alignSelf: 'flex-start', width: '10%', }}>
                                <TouchableOpacity style={styles.backView}
                                    onPress={() => navigationService.pop()}>
                                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[styles.headerText, { color: '#afaebc', }]}>Step 3 of 5</Text>
                                <TouchableOpacity
                                    style={{ width: 50, alignItems: 'flex-end' }} onPress={() => this._next()}>
                                    <Text style={[styles.headerText, { color: '#9246e6', }]}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '90%', alignSelf: 'center', paddingVertical: 15 }}>
                            <Text style={{ color: '#000', fontSize: RFValue(20.4), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Set your guests</Text>
                        </View>
                    </View>
                    {this._renderGuest()}
                    <View style={{ justifyContent: 'flex-start', width: '90%', alignSelf: 'center', paddingVertical: 10, }}>
                        <Text style={{ color: '#000', fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Gender</Text>
                    </View>
                    {this._renderGender()}

                    {this._renderAge()}
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FFF',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        //  paddingHorizontal:20,
        height: '100%'
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
    itemText: {
        fontSize: RFValue(14.96),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    },
    filterView: {
        width: '90%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    filterContainer: {
        borderBottomWidth: 1,
        borderColor: '#f2f3f5'
    },
    genderView: {
        width: '90%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },

});
