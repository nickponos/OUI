import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { Header, Icon, CheckBox } from 'native-base';
// import { Actions } from 'react-native-router-flux';
import { DatePicker } from 'react-native-wheel-datepicker';
import navigationService from '../../../../navigation/navigationService';
// import { editEvent, deleteEvent} from '../../../../actions/actioncreators/FirebaseManagement';
var moment = require('moment');
const note = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales lorem ipsum dolor sit amet, consectetur adipiscing elit.'

export default class EditEvent extends Component {
    constructor(props) {
        super(props)
        const {
            event_title,
            meeting_place,
            notes,
            event_start_date,
            event_start_time,
            event_end_date,
            event_end_time
        } = this.props.eventDetail;
        this.state = {
            title: event_title,
            meetingplace: meeting_place,
            notes: notes,
            date1: new Date(event_start_date + " " + event_start_time),
            date2: new Date(event_end_date + " " + event_end_time),
            clickdate1: false,
            clickdate2: false
        }
    }

    _selectDate1(date1) {
        this.setState({ date1: date1 })
    }
    _selectDate2(date2) {
        this.setState({ date2: date2 })
    }
    _inputBox(name, onChange, mline, focus, value) {
        return (
            <View style={styles.textinputcontainer}>
                <View style={{ width: '35%', marginTop: 15 }}>
                    <Text style={{ fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>{name}</Text>
                </View>
                <View style={{ width: '65%', }}>
                    <TextInput
                        style={styles.text}
                        placeholder={name}
                        multiline={mline}
                        placeholderTextColor='#a8a7b5'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={value}
                        onFocus={focus}
                        keyboardType='email-address'
                        // autoFocus={true}
                        // returnKeyType={"next"}
                        //  onSubmitEditing={() => this.city.focus()}
                        onChangeText={onChange}
                    />
                </View>
            </View>
        )
    }
    _dateInput(title, onpress, datetext, timetext) {
        return (
            <View style={[styles.textinputcontainer, { paddingVertical: 15 }]}>
                <View style={{ width: '35%' }}>
                    <Text style={{ fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black' }}>{title}</Text>
                </View>
                <TouchableOpacity style={{ width: '65%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={onpress}>
                    <Text style={{ fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', color: 'black' }} >
                        {datetext}
                    </Text >
                    <Text style={{ fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', color: 'black' }}>
                        {timetext}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    _editDone=()=>{
         const {
            title,
            meetingplace,
            date1,
            date2
        } = this.state;
        const {eventID} = this.props;
        this.props.eventDetail.event_title = title;
        this.props.eventDetail.meeting_place = meetingplace;
        this.props.eventDetail.event_start_date = moment(date1.toJSON()).format('DD MMMM YYYY');
        this.props.eventDetail.event_start_time =  moment(date1.toJSON()).format('h:mm');
        this.props.eventDetail.event_start = date1.getTime();
        this.props.eventDetail.event_end_date = moment(date2.toJSON()).format('DD MMMM YYYY');
        this.props.eventDetail.event_end_time =  moment(date2.toJSON()).format('h:mm');
        this.props.eventDetail.event_end = date2.getTime();
        // editEvent(this.props.eventDetail,eventID )
        // Actions.reset('Home', { tab: 2 })
    } 
    _delete =()=>{
       const {eventID} = this.props;
      //  deleteEvent(eventID)
      //  Actions.reset('Home', { tab: 2 })
   } 
    render() {
        console.log('date====', this.state.date1)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                <View style={styles.subContainerView}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', paddingVertical: 5, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => navigationService.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 50, alignItems: 'flex-end' }} onPress={() =>this._editDone()}>
                                <Text style={[styles.headerText, { color: '#9246e6', }]}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '90%', alignSelf: 'center', paddingVertical: 15 }}>
                            <Text style={{ color: '#000', fontSize: RFValue(20.4), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Edit your event</Text>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ paddingBottom: '5%' }}>
                        <View style={[styles.textinputView, { paddingBottom: 10 }]}>
                            {this._inputBox('Title', (text) => { this.setState({ title: text }) }, true, () => { }, this.state.title)}
                        </View>
                        {this._dateInput('Dates', () => { this.setState({ clickdate1: true, clickdate2: false, }) }, moment(this.state.date1.toJSON()).format('DD MMMM YYYY'), moment(this.state.date1.toJSON()).format('h:mm'))}
                        <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#f2f3f5', }}>
                            {this.state.clickdate1 == true ?
                                <DatePicker
                                    textSize={15}
                                    date={this.state.date1}
                                    mode="datetime"
                                    onDateChange={date => this._selectDate1(date)}
                                    style={{ width: '100%', alignSelf: 'center', backgroundColor: 'transparent' }}
                                />
                                : null}
                        </View>
                        {this._dateInput('', () => { this.setState({ clickdate2: true, clickdate1: false, }) }, moment(this.state.date2.toJSON()).format('DD MMMM YYYY'), moment(this.state.date2.toJSON()).format('h:mm'))}
                        <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#f2f3f5', }}>
                            {this.state.clickdate2 == true ?
                                <DatePicker
                                    textSize={15}
                                    date={this.state.date2}
                                    mode='datetime'
                                    onDateChange={date => this._selectDate2(date)}
                                    style={{ width: '100%', alignSelf: 'center', backgroundColor: 'transparent' }}
                                />
                                : null}
                        </View>
                        <View style={[styles.textinputView]}>
                            {this._inputBox('Meeting place', (text) => { this.setState({ meetingplace: text }) }, true, () => this.setState({ clickdate2: false }), this.state.meetingplace)}
                        </View>
                        <View style={[styles.textinputView, { paddingBottom: 10 }]}>
                            {this._inputBox('Notes', (text) => { this.setState({ notes: text }) }, true, () => { }, this.state.notes)}
                        </View>
                        <View style={[styles.deletecontainer]}>
                            <TouchableOpacity  onPress={() =>this._delete()} style={{ width: '100%', justifyContent: "center", flexDirection: 'row', alignItems: 'center', }} >
                                <Text style={{ fontSize: RFValue(15.64), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#9246e6' }} >
                                    Delete event
                                </Text >
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
        //marginTop: 10,
        // marginBottom: 5
    },
    headerText: {
        // height: 40,
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        // color: '#afaebc',
        //marginTop: 10,
        //marginBottom: 5
    },
    textinputcontainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingBottom: 15,
        // borderColor: '#f2f3f5'
        // borderBottomWidth: 1,
    },
    deletecontainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        marginTop: 30,
        paddingVertical: 15,
        borderColor: '#f2f3f5',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    textinputView: {
        borderColor: '#f2f3f5', borderBottomWidth: 1,
    },
    text: {
        fontSize: RFValue(14.96),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000',
        marginTop: Platform.OS == 'ios' ? 12 : 5,
        // backgroundColor: 'gray'
    },

});
