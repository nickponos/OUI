import React, { Component } from 'react';
import {
    Platform,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground
} from 'react-native';
import { Icon } from 'native-base'
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import { RFValue } from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';
const up = require('@images/upArrow.png')
const wrong = require('@images/wrong.png')
const right = require('@images/right.png')
const image = require('@images/event_6.jpg')

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: true,
            allActivity: [
                {
                    image: require('@images/user_3.jpg'),
                    name: 'Alicia',
                    description: 'Followed you',
                    time: '1h',
                    type: 'user',
                    button: 'follow'
                },
                {
                    image: require('@images/event_4.jpg'),
                    name: 'Epicurean brunch in the heart of paris',
                    description: 'Your request has been sent',
                    time: '1h',
                    type: 'event',
                    button: 'upArrow'
                },
                {
                    image: require('@images/user_3.jpg'),
                    name: 'Alicia',
                    description: 'Saved your profile',
                    time: '1h',
                    type: 'user',
                    button: null
                },
                {
                    image: require('@images/event_5.jpg'),
                    name: 'Friendly golf tournament',
                    description: 'Your request has been sent',
                    time: '1h',
                    type: 'event',
                    button: 'upArrow'
                },
                {
                    image: require('@images/user_6.jpg'),
                    name: 'Virendra',
                    description: 'Followed you',
                    time: '1h',
                    type: 'user',
                    button: 'following'
                },
                {
                    image: require('@images/user_9.jpg'),
                    name: 'Izabella',
                    description: 'Edited her event',
                    time: '3j',
                    type: 'user',
                    button: 'img'
                },
                {
                    image: require('@images/event_7.jpg'),
                    name: ' Spa Day for mums, sisters and all ladies',
                    description: 'Your request has been rejected',
                    time: '3j',
                    type: 'event',
                    button: 'wrongBtn'
                },
                {
                    image: require('@images/event_1.jpg'),
                    name: 'Tips to Palm Shores Beaches',
                    description: 'Your request has been accepted',
                    time: '4j',
                    type: 'event',
                    button: 'rightBtn'
                },
                {
                    image: require('@images/user_8.jpg'),
                    name: 'Adaora',
                    description: 'Followed you',
                    time: '6j',
                    type: 'user',
                    button: 'follow'
                },
                {
                    image: require('@images/user_9.jpg'),
                    name: 'Izabella',
                    description: 'Invited you to her event',
                    time: '1sem',
                    type: 'user',
                    button: 'img'
                },
                {
                    image: require('@images/event_9.jpg'),
                    name: 'Travel to the land of fire and ice',
                    description: 'Your request has been rejected',
                    time: '1sem',
                    type: 'event',
                    button: 'wrongBtn'
                },
                {
                    image: require('@images/event_2.jpg'),
                    name: 'IE: Mysteries of the Mind',
                    description: 'Your request has been accepted',
                    time: '1sem',
                    type: 'event',
                    button: 'rightBtn'
                },
                {
                    image: require('@images/user_9.jpg'),
                    name: 'Izabella',
                    description: 'Followed you',
                    time: '2sem',
                    type: 'user',
                    button: 'following'
                },
                {
                    image: require('@images/user_9.jpg'),
                    name: 'Izabella',
                    description: 'Saved your profile',
                    time: '2sem',
                    type: 'user',
                    button: null
                },
            ],
            events: [
                {
                    image: require('@images/event_4.jpg'),
                    name: 'Epicurean brunch in the heart of paris',
                    description: 'Your request has been sent',
                    time: '1h',
                    type: 'event',
                    button: 'upArrow'
                },
                {
                    image: require('@images/event_5.jpg'),
                    name: 'Friendly golf tournament',
                    description: 'Your request has been sent',
                    time: '1h',
                    type: 'event',
                    button: 'upArrow'
                },
                {
                    image: require('@images/user_9.jpg'),
                    name: 'Izabella',
                    description: 'Edited her event',
                    time: '3j',
                    type: 'user',
                    button: 'img'
                },
                {
                    image: require('@images/event_7.jpg'),
                    name: ' Spa Day for mums, sisters and all ladies',
                    description: 'Your request has been rejected',
                    time: '3j',
                    type: 'event',
                    button: 'wrongBtn'
                },
                {
                    image: require('@images/event_1.jpg'),
                    name: 'Tips to Palm Shores Beaches',
                    description: 'Your request has been accepted',
                    time: '4j',
                    type: 'event',
                    button: 'rightBtn'
                },
                {
                    image: require('@images/user_9.jpg'),
                    name: 'Izabella',
                    description: 'Invited you to her event',
                    time: '1sem',
                    type: 'user',
                    button: 'img'
                },
                {
                    image: require('@images/event_9.jpg'),
                    name: 'Travel to the land of fire and ice',
                    description: 'Your request has been rejected',
                    time: '1sem',
                    type: 'event',
                    button: 'wrongBtn'
                },
                {
                    image: require('@images/event_2.jpg'),
                    name: 'IE: Mysteries of the Mind',
                    description: 'Your request has been accepted',
                    time: '1sem',
                    type: 'event',
                    button: 'rightBtn'
                },
            ],
        }
    }
    _allActivity() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        if (this.state.allActivity.length > 0) {
            return (
                <View style={{ width: '100%', }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.allActivity}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={{ flex: 1, width: '100%', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                                        {item.type == 'user' ?
                                            <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                            :
                                            <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 20 }} />
                                        }
                                        <View style={{ marginLeft: 10, width: '80%' }}>
                                            <View style={{ width: '90%' }}>
                                                <Text numberOfLines={1} style={styles.followNameText}>{item.name}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.followDescText}>{item.description}</Text>{dot}
                                                <Text style={styles.followDescText}>{item.time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '30%', }}>
                                        {item.button == 'upArrow' ?
                                            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }}>
                                                <Image source={up} style={{ height: 20, width: 20 }} />
                                            </View>
                                            :
                                            item.button == 'wrongBtn' ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }}>
                                                    <Image source={wrong} style={{ height: 20, width: 20 }} />
                                                </View>
                                                :
                                                item.button == 'rightBtn' ?
                                                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }}>
                                                        <Image source={right} style={{ height: 20, width: 20 }} />
                                                    </View>
                                                    :
                                                    item.button == 'following' ?
                                                        <TouchableOpacity style={[styles.buttoncontainer]}>
                                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#f5f6f8', '#f5f6f8']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                                                                <Text style={{ color: '#000', fontSize: RFValue(15.64), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Following</Text>
                                                            </LinearGradient>
                                                        </TouchableOpacity>
                                                        :
                                                        item.button == 'img' ?
                                                            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }}>
                                                                <Image source={image} style={{ height: 40, width: 40, borderRadius: 10 }} />
                                                            </View>
                                                            :
                                                            item.button == 'follow' ?
                                                                <TouchableOpacity style={[styles.buttoncontainer]}>
                                                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                                                                        <Text style={{ color: 'white', fontSize: RFValue(13.6), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Follow</Text>
                                                                    </LinearGradient>
                                                                </TouchableOpacity>
                                                                :
                                                                null
                                        }

                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RFValue(18.36), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No activity yet</Text>
                    <Text style={{ fontSize: RFValue(17), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>You don't have any notifications yet </Text>
                </View>
            )
        }
    }
    _events() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        if (this.state.events.length > 0) {
            return (
                <View style={{ width: '100%', }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.events}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={{ flex: 1, width: '100%', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                                        {item.type == 'user' ?
                                            <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                            :
                                            <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 20 }} />
                                        }
                                        <View style={{ marginLeft: 10, width: '80%' }}>
                                            <View style={{ width: '90%' }}>
                                                <Text numberOfLines={1} style={styles.followNameText}>{item.name}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.followDescText}>{item.description}</Text>{dot}
                                                <Text style={styles.followDescText}>{item.time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '30%', }}>
                                        {item.button == 'upArrow' ?
                                            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }}>
                                                <Image source={up} style={{ height: 20, width: 20 }} />
                                            </View>
                                            :
                                            item.button == 'wrongBtn' ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }}>
                                                    <Image source={wrong} style={{ height: 20, width: 20 }} />
                                                </View>
                                                :
                                                item.button == 'rightBtn' ?
                                                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }}>
                                                        <Image source={right} style={{ height: 20, width: 20 }} />
                                                    </View>
                                                    :
                                                    item.button == 'following' ?
                                                        <TouchableOpacity style={[styles.buttoncontainer]}>
                                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#f5f6f8', '#f5f6f8']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                                                                <Text style={{ color: '#000', fontSize: RFValue(15.64), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Following</Text>
                                                            </LinearGradient>
                                                        </TouchableOpacity>
                                                        :
                                                        item.button == 'img' ?
                                                            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }}>
                                                                <Image source={image} style={{ height: 40, width: 40, borderRadius: 10 }} />
                                                            </View>
                                                            :
                                                            item.button == 'follow' ?
                                                                <TouchableOpacity style={[styles.buttoncontainer]}>
                                                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 30, justifyContent: 'center' }}>
                                                                        <Text style={{ color: 'white', fontSize: RFValue(13.6), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Follow</Text>
                                                                    </LinearGradient>
                                                                </TouchableOpacity>
                                                                :
                                                                null
                                        }

                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RFValue(18.36), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No events yet</Text>
                    <Text style={{ fontSize: RFValue(17), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>You don't have any events yet </Text>
                </View>
            )
        }

    }
    render() {
        const {user} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <View style={{ alignSelf: 'flex-start', marginHorizontal: 20 }}>
                    <TouchableOpacity style={styles.backView}
                        onPress={() => this.props._pageNavigate(4, '', user)}>
                        <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.subContainerView}>
                    <View style={{ marginTop: 10, marginBottom: 7, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: RFValue(25.84), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#000' }}>Activity</Text>
                    </View>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f2f3f5', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 13, marginHorizontal: 20, marginTop: 3 }}>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: true }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == true ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == true ? '#fff' : '#000' }]}>All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: false }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == false ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == false ? '#fff' : '#000' }]}>Events</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        this.state.clicks ?
                            <View style={{ flex: 1 }}>
                                {this._allActivity()}
                            </View>
                            :
                            <View style={{ flex: 1 }}>
                                {this._events()}
                            </View>
                    }
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        //paddingHorizontal: 20,
        height: '100%'
    },
    backView: {
        width: 30,
    },
    eventBtn: {
        width: '50%',
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,

    },
    eventTxt: {
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        textAlign: 'center',
        alignSelf: 'center'
    },
    relatedEventsMainView: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 5,
        elevation: 0.8,
        borderRadius: 15,
        shadowOffset: { height: 0.5, width: 1.5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginTop: 15
    },
    relatedEventsCardView: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 15,
        backgroundColor: '#fff'
    },
    relatedEventsDetailsView: {
        width: '65%',
        justifyContent: 'space-between',
        paddingHorizontal: 8
    },
    relatedEventsCategoryView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 3
    },
    relatedEventsCategoryText: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontSize: RFValue(13.6),
    },
    relatedEventsTitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RFValue(17),
        color: 'black'
    },
    relatedEventsSubtitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Light' : 'Lato Light',
        //fontSize: 14, 
        fontSize: RFValue(13.6),
        width: '95%',
        marginVertical: 2
    },
    relatedEventsHandlerView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    cartContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 12,
        elevation: 0.7,
        shadowOffset: { width: 1, height: 1, },
        shadowColor: 'gray',
        shadowOpacity: 0.1,
        width: '100%',
    },
    descText: {
        fontSize: RFValue(19.04),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },
    cartText: {
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 100,
    },
    followNameText: {
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        paddingBottom: 3,
        //width:'80%',
    },
    followDescText: {
        fontSize: RFValue(11.56),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#aeadba'
    }
});

const mapStateToProps = state => ({
    user: state.session.user,
  })
  export default connect(mapStateToProps)(Activity);