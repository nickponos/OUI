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
    ImageBackground,
    TouchableHighlight,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
    AsyncStorage,
    Animated
} from 'react-native';
import { Icon } from 'native-base'
// import { Actions } from 'react-native-router-flux';
import { RFValue } from "react-native-responsive-fontsize"
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
// import firebase from '@components/Firebase'
import testData from '../../../../assets/dumydata';
import EventFirst from '../../../../components/eventFirstStyle';
import EventFirst1 from '../../../../components/eventFirstStyle1'
import EventSecond from '../../../../components/eventSecondStyle'
import EventSecond1 from '../../../../components/eventSecondStyle1'
import EventThird from '../../../../components/eventThirdStyle'
import EventForth from '../../../../components/eventForthStyle'
import EventForth1 from '../../../../components/eventForthStyle1'
import EventFifth from '../../../../components/eventFifthStyle'
import moment from 'moment'
// import { getDateDisplay } from '../../../../services/utils';
// import { firestore } from '../../../../components/Firebase';
import _ from 'lodash';
import navigationService from '../../../../navigation/navigationService';
import screens from '../../../../constants/screens';
// import { fetchEventDetail, fetchEventStory } from '../../../../controllers/eventDetail';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultAnimationDialog: false,
            scaleAnimationDialog: false,
            eventSearchResult: [],
            clicks: 0,
            btnClicks: true,
            modalVisible: false,
            height: Dimensions.get('screen').height / 1.6,
            swipe: 'SWIPE_DOWN',
            goingbutton: false,
            yoursEvent: [],
            selectedEvent: '',
            yours: testData.yours,
            upcoming: testData.upcoming,
            past: testData.past,
            height: new Animated.Value(0),
            relatedEvents: testData.relatedEvents,
            events: testData.events,
            modalVisibleCreate: false,
            Events_stories: [],
            categories: testData.category,
            nextMonthCreated: testData.events,
            nextDayCreated: [],
            nextWeekCreated: [],
            nextDayLiked: [],
            nextWeekLiked: [],
            nextMonthLiked: [],
        }
    }
    componentDidMount() {
        // var ref_story_event = firebase.database().ref('Story/' + 'Events');
        // ref_story_event.on('value', (snapshot) => {
        //     let data2 = snapshot.val();
        //     if (data2) {
        //         this.setState({ Events_stories: Object.values(data2) });
        //     }
        // });
    }

    static getDerivedStateFromProps (props, state) {
        // const myEvents = props.events.my_events;
        // const nextDayEvents = props.events.init_next_day;
        // const nextWeekEvents = props.events.init_next_week;
        // const nextMonthEvents = props.events.init_next_month;
        // const nDayLikeEvents = props.events.init_nday_like;
        // const nWeekLikeEvents = props.events.init_nweek_like;
        // const nMonthLikeEvents = props.events.init_nmonth_like;
        // const upcomingEvents = props.events.upcoming;
        // const initPopularEvents = props.events.init_popular;
        // let resultMyEvents = [];
        // let resultNextDay = [];
        // let resultNextWeek = [];
        // let resultNextMonth = [];
        // let resultNDayLikes = [];
        // let resultNWeekLikes = [];
        // let resultNMonthLikes = [];
        // let resultUpcoming = [];
        // let resultPopular = [];

        // if (!_.isNil(myEvents)) {
        //     for(let key in myEvents) {
        //         let oneEvent = {};
        //         oneEvent.event = myEvents[key].category;
        //         oneEvent.place = myEvents[key].event_image;
        //         oneEvent.desc = myEvents[key].notes;
        //         oneEvent.date = getDateDisplay(myEvents[key].event_start, myEvents[key].event_end);
        //         oneEvent.time = myEvents[key].event_start;
        //         oneEvent.image = props.user.profile;
        //         oneEvent.personName = props.user.name;
        //         oneEvent.creatorId = props.user.userId;
        //         oneEvent.price = myEvents[key].budget.value + myEvents[key].budget.currency;
        //         oneEvent.key = key;
        //         resultMyEvents.push(oneEvent);
        //     }
        // }
        

        // if (!_.isNil(nextDayEvents)) {
        //     for (let key in nextDayEvents) {
        //         let oneEvent = {};
        //         // oneEvent.image = nextDayEvents[key].data.event_image;
        //         // oneEvent.category = nextDayEvents[key].data.category;
        //         // oneEvent.title = nextDayEvents[key].data.event_title;
        //         // oneEvent.titleColor = 'rgb(255,146,121)';
        //         // oneEvent.date = getDateDisplay(nextDayEvents[key].data.event_start, nextDayEvents[key].data.event_end);
        //         // oneEvent.time = nextDayEvents[key].data.event_start;
        //         // oneEvent.eventManager = {
        //         //     name: nextDayEvents[key].creator.name,
        //         //     image: nextDayEvents[key].creator.profile
        //         // };
        //         // oneEvent.price= nextDayEvents[key].data.budget.value + nextDayEvents[key].data.budget.currency
    
    
        //         oneEvent.event = nextDayEvents[key].category;
        //         oneEvent.place = nextDayEvents[key].event_image;
        //         oneEvent.desc = nextDayEvents[key].notes;
        //         oneEvent.date = getDateDisplay(nextDayEvents[key].event_start, nextDayEvents[key].event_end);
        //         oneEvent.time = nextDayEvents[key].event_start;
        //         // console.log("nextDayEvents ===== ", nextDayEvents[key].event_creater)
        //         // oneEvent.image = nextDayEvents[key].event_creater.image;
        //         // oneEvent.personName = nextDayEvents[key].event_creater.name;
        //         oneEvent.creatorId = nextDayEvents[key].creatorId;
        //         oneEvent.price = nextDayEvents[key].budget.value + nextDayEvents[key].budget.currency;
        //         oneEvent.key = key;
        //         oneEvent.like = nextDayEvents[key].liked.find(element => element == props.user.userId);
                
        //         resultNextDay.push(oneEvent);
        //     }
        // }
        

        // if (!_.isNil(nDayLikeEvents)) {
        //     for (let key in nDayLikeEvents) {
        //         let oneEvent = {};
        //         oneEvent.event = nDayLikeEvents[key].category;
        //         oneEvent.place = nDayLikeEvents[key].event_image;
        //         oneEvent.desc = nDayLikeEvents[key].notes;
        //         oneEvent.date = getDateDisplay(nDayLikeEvents[key].event_start, nDayLikeEvents[key].event_end);
        //         oneEvent.time = nDayLikeEvents[key].event_start;
        //         oneEvent.image = nDayLikeEvents[key].event_creater.image;
        //         oneEvent.creatorId = nDayLikeEvents[key].creatorId;
        //         oneEvent.personName = nDayLikeEvents[key].event_creater.name;
        //         oneEvent.price = nDayLikeEvents[key].budget.value + nDayLikeEvents[key].budget.currency;
        //         oneEvent.key = key;
        //         oneEvent.like = nDayLikeEvents[key].liked.find(element => element == props.user.userId);
        //         resultNDayLikes.push(oneEvent);
        //     }
        // }
        

        // if (!_.isNil(nextWeekEvents)) {
        //     for (let key in nextWeekEvents) {
        //         let oneEvent = {};
        //         oneEvent.image = nextWeekEvents[key].event_image;
        //         oneEvent.category = nextWeekEvents[key].category;
        //         oneEvent.title = nextWeekEvents[key].event_title;
        //         oneEvent.titleColor = 'rgb(255,146,121)';
        //         oneEvent.date = getDateDisplay(nextWeekEvents[key].event_start, nextWeekEvents[key].event_end);
        //         oneEvent.time = nextWeekEvents[key].event_start;
        //         oneEvent.eventManager = {
        //             name: nextWeekEvents[key].event_creater.name,
        //             image: nextWeekEvents[key].event_creater.image
        //         };
        //         oneEvent.creatorId = nextWeekEvents[key].creatorId;
        //         oneEvent.price= nextWeekEvents[key].budget.value + nextWeekEvents[key].budget.currency
        //         oneEvent.key = key
        //         oneEvent.like = nextWeekEvents[key].liked.find(element => element == props.user.userId);
        //         resultNextWeek.push(oneEvent);
        //     }
        // }
        

        // if (!_.isNil(nWeekLikeEvents)) {
        //     for (let key in nWeekLikeEvents) {
        //         let oneEvent = {};
        //         oneEvent.image = nWeekLikeEvents[key].event_image;
        //         oneEvent.category = nWeekLikeEvents[key].category;
        //         oneEvent.title = nWeekLikeEvents[key].event_title;
        //         oneEvent.titleColor = 'rgb(255,146,121)';
        //         oneEvent.date = getDateDisplay(nWeekLikeEvents[key].event_start, nWeekLikeEvents[key].event_end);
        //         oneEvent.time = nWeekLikeEvents[key].event_start;
        //         oneEvent.eventManager = {
        //             name: nWeekLikeEvents[key].event_creater.name,
        //             image: nWeekLikeEvents[key].event_creater.image
        //         };
        //         oneEvent.creatorId = nWeekLikeEvents[key].creatorId;
        //         oneEvent.price= nWeekLikeEvents[key].budget.value + nWeekLikeEvents[key].budget.currency
        //         oneEvent.key = key
        //         oneEvent.like = nWeekLikeEvents[key].liked.find(element => element == props.user.userId);
        //         resultNWeekLikes.push(oneEvent);
        //     }
        // }
        

        // if (!_.isNil(nextMonthEvents)) {
        //     for (let key in nextMonthEvents) {
        //         let oneEvent = {};
        //         // oneEvent.image = nextMonthEvents[key].data.event_image;
        //         // oneEvent.category = nextMonthEvents[key].data.category;
        //         // oneEvent.title = nextMonthEvents[key].data.event_title;
        //         // oneEvent.titleColor = 'rgb(255,146,121)';
        //         // oneEvent.date = getDateDisplay(nextMonthEvents[key].data.event_start, nextMonthEvents[key].data.event_end);
        //         // oneEvent.time = nextMonthEvents[key].data.event_start;
        //         // oneEvent.eventManager = {
        //         //     name: nextMonthEvents[key].creator.name,
        //         //     image: nextMonthEvents[key].creator.profile
        //         // };
        //         // oneEvent.price= nextMonthEvents[key].data.budget.value + nextMonthEvents[key].data.budget.currency
    
        //         oneEvent.event = nextMonthEvents[key].category;
        //         oneEvent.place = nextMonthEvents[key].event_image;
        //         oneEvent.desc = nextMonthEvents[key].event_title;
        //         oneEvent.date = getDateDisplay(nextMonthEvents[key].event_start, nextMonthEvents[key].event_end);
        //         oneEvent.time = nextMonthEvents[key].event_start;
                
        //         oneEvent.image = nextMonthEvents[key].event_creater.image;
        //         oneEvent.personName = nextMonthEvents[key].event_creater.name;
        //         oneEvent.creatorId = nextMonthEvents[key].creatorId;
        //         oneEvent.price = nextMonthEvents[key].budget.value + nextMonthEvents[key].budget.currency;
        //         oneEvent.key = key;
        //         oneEvent.like = nextMonthEvents[key].liked.find(element => element == props.user.userId);
        //         resultNextMonth.push(oneEvent);
        //     }
        // }
        

        // if (!_.isNil(nMonthLikeEvents)) {
        //     for (let key in nMonthLikeEvents) {
        //         let oneEvent = {};
        //         oneEvent.event = nMonthLikeEvents[key].category;
        //         oneEvent.place = nMonthLikeEvents[key].event_image;
        //         oneEvent.desc = nMonthLikeEvents[key].notes;
        //         oneEvent.date = getDateDisplay(nMonthLikeEvents[key].event_start, nMonthLikeEvents[key].event_end);
        //         oneEvent.time = nMonthLikeEvents[key].event_start;
        //         oneEvent.image = nMonthLikeEvents[key].event_creater.image;
        //         oneEvent.personName = nMonthLikeEvents[key].event_creater.name;
        //         oneEvent.creatorId = nMonthLikeEvents[key].creatorId;
        //         oneEvent.price = nMonthLikeEvents[key].budget.value + nMonthLikeEvents[key].budget.currency;
        //         oneEvent.key = key;
        //         oneEvent.like = nMonthLikeEvents[key].liked.find(element => element == props.user.userId);
        //         resultNMonthLikes.push(oneEvent);
        //     }
        // }
        
        // if (!_.isNil(upcomingEvents)) {
        //     for (let key in upcomingEvents) {
        //         let oneEvent = {};
        //         oneEvent.event = upcomingEvents[key].category;
        //         oneEvent.place = upcomingEvents[key].event_image;
        //         oneEvent.desc = upcomingEvents[key].notes;
        //         oneEvent.date = getDateDisplay(upcomingEvents[key].event_start, upcomingEvents[key].event_end);
        //         oneEvent.time = upcomingEvents[key].event_start;
        //         oneEvent.image = upcomingEvents[key].event_creater.image;
        //         oneEvent.personName = upcomingEvents[key].event_creater.name;
        //         oneEvent.creatorId = upcomingEvents[key].creatorId;
        //         oneEvent.price = upcomingEvents[key].budget.value + upcomingEvents[key].budget.currency;
        //         oneEvent.key = key;
        //         oneEvent.like = upcomingEvents[key].liked.find(element => element == props.user.userId);
        //         resultUpcoming.push(oneEvent);
        //     }
        // }

        // if (!_.isNil(initPopularEvents)) {
        //     for (let key in initPopularEvents) {
        //         let oneEvent = {};
        //         oneEvent.event = initPopularEvents[key].category;
        //         oneEvent.place = initPopularEvents[key].event_image;
        //         oneEvent.desc = initPopularEvents[key].notes;
        //         oneEvent.date = getDateDisplay(initPopularEvents[key].event_start, initPopularEvents[key].event_end);
        //         oneEvent.time = initPopularEvents[key].event_start;
        //         oneEvent.image = initPopularEvents[key].event_creater.image;
        //         oneEvent.personName = initPopularEvents[key].event_creater.name;
        //         oneEvent.creatorId = initPopularEvents[key].creatorId;
        //         oneEvent.price = initPopularEvents[key].budget.value + initPopularEvents[key].budget.currency;
        //         oneEvent.key = key;
        //         oneEvent.like = initPopularEvents[key].liked.find(element => element == props.user.userId);
        //         resultPopular.push(oneEvent);
        //     }
        // }

        // if (_.isNil(initPopularEvents)) {
        //     resultPopular = [];
        // }

        // if(_.isNil(upcomingEvents)) {
        //     resultUpcoming = [];
        // }

        // if (_.isNil(nMonthLikeEvents)) {
        //     resultNMonthLikes = [];
        // }

        // if (_.isNil(nextMonthEvents)) {
        //     resultNextMonth = [];
        // }

        // if (_.isNil(nWeekLikeEvents)) {
        //     resultNWeekLikes = [];
        // }

        // if (_.isNil(nextWeekEvents)) {
        //     resultNextWeek = [];
        // }

        // if (_.isNil(nDayLikeEvents)) {
        //     resultNDayLikes = [];
        // }

        // if (_.isNil(nextDayEvents)) {
        //     resultNextDay = [];
        // }

        // console.log("nextMonthLiked Length >>>>>>>>>>>>> =")
        // return {
        //     nextDayCreated: resultNextDay,
        //     nextWeekCreated: resultNextWeek,
        //     nextMonthCreated : resultNextMonth,
        //     nextDayLiked: resultNDayLikes,
        //     nextWeekLiked: resultNWeekLikes,
        //     nextMonthLiked: resultNMonthLikes
        // }

    }

    setModalVisible(visible) {//data , selectedEvent: data
        this.setState({ modalVisible: visible });
    }
    setModalVisibleCreateEvent(visible) {
        this.setState({ modalVisibleCreate: visible });
    }

    _moveEventDetail = (eventId) => {
        const { dispatch } = this.props;
        // dispatch(fetchEventDetail(eventId));
        // dispatch(fetchEventStory(eventId));
        
    }

    _reanderStory(image) {
        return (
            <ImageBackground source={image} style={{ width: '100%', height: '100%' }} resizeMode='stretch'>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.headerView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => { this.setModalVisible(!this.state.modalVisible) }}
                                style={{ paddingHorizontal: 10 }}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: 'white', fontSize: 30 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity>
                                <Image source={require('@images/message1.png')} style={{ height: 25, width: 25, marginRight: 15 }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name={'favorite'} type='MaterialIcons' style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
    _desc() {
        return (
            <View style={{ width: '100%', alignSelf: 'center', marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor: '#9246e6' }} source={require('@images/calender.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>9 - 10 Sep,2019</Text>
                        <Text style={styles.fulldescTimeText}>At 11:00 P.M EST</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor: '#9246e6' }} source={require('@images/pinpoint.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>Place de la Nation</Text>
                        <Text style={styles.fulldescTimeText}>75011 Paris, France</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor: '#9246e6' }} source={require('@images/price.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>200$ budget</Text>
                        <Text style={styles.fulldescTimeText}>The budget is splitted</Text>
                    </View>
                </View>
            </View>
        )
    }
    _yourEventModel() {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                }}>
                <View style={{ height: Platform.OS == 'ios' ? Dimensions.get('screen').height / 2.5 : Dimensions.get('screen').height / 3.3 }}>
                    <Swiper
                        dotColor='#cbcbcb'
                        activeDotColor='#ffffff'
                        activeDotStyle={{ borderWidth: 2, borderColor: '#cbcbcb', width: 12, height: 12, borderRadius: 6 }}
                        showsButtons={false}>
                        {this._reanderStory(require('@images/location_2.jpg'))}
                        {this._reanderStory(require('@images/location_3.jpg'))}
                        {this._reanderStory(require('@images/location_4.jpg'))}
                    </Swiper>
                </View>
                <View style={{ width: '100%', alignSelf: 'center', height: Platform.OS == 'ios' ? Dimensions.get('screen').height * 1 / 2.5 : Dimensions.get('screen').height * 1.8 / 3.3, backgroundColor: 'white', position: 'absolute', bottom: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: 'hidden' }}>
                    <View style={{ marginTop: 15, marginBottom: 5, paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: RFValue(15.64), color: 'rgb(239,113,184)', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>MOVIES</Text>
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: RFValue(23.8), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Harry Potter Marathon at the cinema</Text>
                    </View>
                    <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
                        {this._desc()}
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 20, width: '100%', alignSelf: 'center', justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#f2f3f5' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 20, width: '40%' }}>
                            <TouchableOpacity onPress={() => { navigationService.navigate(screens.EDIT_EVENT), this.setState({ modalVisible: false }) }} style={{ backgroundColor: '#f2f3f5', padding: 12, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                                <Image style={{ height: 20, width: 20, tintColor: '#000' }} source={require('@images/edit.png')} />
                                <Text style={{ color: '#000', fontSize: RFValue(14.28), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', paddingLeft: 5, alignSelf: 'center' }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 20, width: '40%', marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => { navigationService.navigate(screens.INVITE_GUEST), this.setState({ modalVisible: false }) }} style={{ backgroundColor: '#9246e6', padding: 12, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                                <Image style={{ height: 20, width: 20, tintColor: '#fff' }} source={require('@images/guest.png')} />
                                <Text style={{ color: '#fff', fontSize: RFValue(14.28), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', paddingLeft: 5, alignSelf: 'center' }}>Guests</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    _createdEvent = () => {
        if (this.state.events.length > 0) {
            return (
                <View style={{ width: '100%', marginTop: 5 }}>
                    <ScrollView style={{ marginBottom: 100 }}>
                        {
                            this.state.nextDayCreated.length > 0 ? 
                            <EventFirst1
                                onPress={(eventDetail, index, type) => {
                                    type == 1 ?
                                        // Actions.Event()
                                        navigationService.navigate(screens.EVENT)
                                        :
                                        // Actions.Profile({
                                        //     image: eventDetail,
                                        //     name: index,
                                        //     prof: ""
                                        // })
                                        navigationService.navigate(screens.PROFILE, {
                                              image: eventDetail,
                                              name: index,
                                              prof: ""
                                          })

                                }}
                                title="Next days"
                                events={this.state.nextDayCreated}
                            /> :
                            null
                        }
                        {
                            this.state.nextWeekCreated.length > 0 ? 
                            <EventSecond1
                                onPress={(eventDetail, index, type) => {
                                    type == 1 ?
                                        navigationService.navigate(screens.EVENT)
                                        :
                                        // Actions.Profile({
                                        //     image: eventDetail,
                                        //     name: index,
                                        //     prof: ""
                                        // })
                                        navigationService.navigate(screens.PROFILE, {
                                          image: eventDetail,
                                          name: index,
                                          prof: ""
                                      })

                                }}
                                title="Next week"
                                relatedEvents={this.state.nextWeekCreated}
                            /> :
                            null
                        }
                        {
                            this.state.nextMonthCreated.length > 0 ?
                            <EventFifth
                                // onPress={() => Actions.Event()}
                                title="Next Month"
                                subtitle="This week"
                                events={this.state.nextMonthCreated}
                                onEvDetail={(eventId) => {this._moveEventDetail(eventId)}}
                                onPrDetail={(userId) => console.log("Profile Detail Page Navigation = ", userId)}
                            /> : 
                            null
                        }
                        <TouchableOpacity style={{ width: '100%', marginVertical: 20 }} onPress={() => { }}>
                            <Text style={{ color: '#9246e6', textAlign: 'center' }}>More related events</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RFValue(18.36), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No saved events yet</Text>
                    <Text style={{ fontSize: RFValue(17), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>You don't have any saved events yet </Text>
                </View>
            )
        }
    }
    _SearchSection = () => {
        const marginTop = this.state.height.interpolate({
            inputRange: [100, 150, 200],
            outputRange: [0, -25, -55],
            extrapolate: 'clamp'
        })
        return (
            <View style={{ width: '100%', marginTop: 5 }}>
                <View style={[styles.searchView]}>
                    <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ fontSize: RFValue(17), color: '#8a42e8', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'left', marginLeft: 15 }}>Bordeaux -59 km  </Text>
                        <Icon name='ios-arrow-down' type='Ionicons' style={{ color: '#8a42e8', marginBottom: 2 }} />
                    </View>
                    <TouchableOpacity onPress={() => navigationService.navigate(screens.MAP)} style={{ padding: 2 }}><Image source={require('@images/map.png')} style={{ height: 25, width: 25, tintColor: "#8a42e8" }} /></TouchableOpacity>
                    <TouchableOpacity style={{ padding: 2 }} onPress={() => navigationService.navigate(screens.FILTER)}><Image source={require('@images/filter.png')} style={{ height: 25, width: 25, tintColor: "#8a42e8" }} /></TouchableOpacity>
                </View>
                <ScrollView style={{ marginBottom: 180 }}>
                    <EventFirst
                        onPress={(eventDetail, index, type) => {
                            type == 1 ?
                                // Actions.Event()
                                navigationService.navigate(screens.EVENT)
                                :
                                // Actions.Profile({
                                //     image: eventDetail,
                                //     name: index,
                                //     prof: ""
                                // })
                                navigationService.navigate(screens.PROFILE, {
                                    image: eventDetail,
                                    name: index,
                                    prof: ""
                                })

                        }}
                        title="Your upcoming events"
                        events={testData.events}
                    />
                    <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.headingText}>{"Explore Bordeaux"}</Text>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ height: 12, width: 12, marginRight: 4 }} source={require('@images/navigation.png')} />
                                <Text style={{ fontSize: RFValue(15.64), color: '#9246e6' }}>{"Change this"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ paddingHorizontal: 10, width: '100%', paddingTop: 8 }}>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.categories}
                                extraData={this.state}
                                scrollEnabled={false}
                                initialNumToRender={this.state.categories.length}
                                renderItem={({ item, index }) => {
                                    return <TouchableOpacity onPress={() => { }} style={{ alignItems: 'center', marginLeft: 5 }}>
                                        <View style={{ paddingHorizontal: 8, borderRadius: 20, paddingVertical: 2, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f6f7f8' }}>
                                            <Image style={{ height: 36, width: 36 }} source={item.image} />
                                            <Text style={{ fontSize: 12 }}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }}
                            />
                        </View>
                    </ScrollView>
                    {this.state.Events_stories.length > 0 ?
                        <EventThird
                            onPress={(storyDetail) => navigationService.navigate(screens.TESTSTORY_DETAIL, { storyDetail })}
                            title="Yours past events"
                            events={this.state.Events_stories}
                            type="event"
                        />
                        : null}
                    <EventSecond
                        onPress={(eventDetail, index, type) => {
                            type == 1 ?
                                // Actions.Event()
                                navigationService.navigate(screens.EVENT)
                                :
                                // Actions.Profile({
                                //     image: eventDetail,
                                //     name: index,
                                //     prof: ""
                                // })
                                navigationService.navigate(screens.PROFILE, {
                                  image: eventDetail,
                                  name: index,
                                  prof: ""
                                })

                        }}
                        title="Daily recommendations"
                        relatedEvents={testData.relatedEvents}
                    />
                    <EventForth
                        onPress={() => navigationService.navigate(screens.EVENT)}
                        title="Suggested events"
                        events={testData.events}
                    />
                    <TouchableOpacity style={{ width: '100%', marginVertical: 20 }} onPress={() => { }}>
                        <Text style={{ color: '#9246e6', textAlign: 'center' }}>More related events</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        )
    }
    _savedEvents = () => {
        if (this.state.events.length > 0) {
            return (
                <View style={{ width: '100%', marginTop: 5 }}>
                    <ScrollView style={{ marginBottom: 100 }}>
                        {
                            this.state.nextDayLiked.length > 0 ?
                            <EventFirst1
                                onPress={(eventDetail, index, type) => {
                                    type == 1 ?
                                        // Actions.Event()
                                        navigationService.navigate(screens.EVENT)
                                        :
                                        // Actions.Profile({
                                        //     image: eventDetail,
                                        //     name: index,
                                        //     prof: ""
                                        // })
                                        navigationService.navigate(screens.PROFILE, {
                                          image: eventDetail,
                                          name: index,
                                          prof: ""
                                        })

                                }}
                                title="Next days"
                                events={this.state.nextDayLiked}
                            /> : 
                            null
                        }
                        {
                            this.state.nextWeekLiked.length > 0 ? 
                            <EventSecond1
                                onPress={(eventDetail, index, type) => {
                                    type == 1 ?
                                        // Actions.Event()
                                        navigationService.navigate(screens.EVENT)
                                        :
                                        // Actions.Profile({
                                        //     image: eventDetail,
                                        //     name: index,
                                        //     prof: ""
                                        // })
                                        navigationService.navigate(screens.PROFILE, {
                                          image: eventDetail,
                                          name: index,
                                          prof: ""
                                        })

                                }}
                                title="Next week"
                                relatedEvents={this.state.nextWeekLiked}
                            /> :
                            null
                        }
                        {
                            this.state.nextMonthLiked.length > 0 ? 
                            <EventFifth
                                // onPress={() => Actions.Event()}
                                title="Next Month"
                                subtitle="This week"
                                events={this.state.nextMonthLiked}
                                onEvDetail={(eventId) => console.log("Event Detail Page Navigation = ", eventId)}
                                onPrDetail={(userId) => console.log("Profile Detail Page Navigation = ", userId)}
                            /> :
                            null
                        }
                        
                        
                        <TouchableOpacity style={{ width: '100%', marginVertical: 20 }} onPress={() => { }}>
                            <Text style={{ color: '#9246e6', textAlign: 'center' }}>More related events</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: 'center', marginTop: '30%', flex: 1, width: '95%' }}>
                    <Text style={{ paddingBottom: 10, fontSize: RFValue(18.36), color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', textAlign: 'center' }}>No saved events yet</Text>
                    <Text style={{ fontSize: RFValue(17), color: '#d8d7dd', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'center' }}>You don't have any saved events yet </Text>
                </View>
            )
        }
    }
    _goAddEvent = () => {
        this.setState({ modalVisibleCreate: false })
        // Actions.AddEvent()
        navigationService.navigate(screens.ADD_EVENT);
    }
    _button(name, content, icon, onPress, iconstyle, textColor) {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{ width: '100%', padding: 5, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.2, borderBottomColor: 'grey' }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '10%', paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={icon} style={[iconstyle]} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10 }}>
                        <View style={{ width: '100%', paddingHorizontal: 5 }}>
                            <Text style={{ fontSize: RFValue(19.04), color: textColor, fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', marginBottom: 3 }}>{name}</Text>
                            <Text style={{ fontSize: RFValue(14.96), color: 'gray', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>{content}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _searchList() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                    {this.state.eventSearchResult.length > 0 ? <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular', fontSize: RFValue(23.8), color: 'black' }}>Events</Text>
                        <TouchableOpacity onPress={() => navigationService.navigate(screens.SEARCH, { data: this.state.events })}><Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular', fontSize: RFValue(15.64), color: '#a65ae1' }}>See all</Text></TouchableOpacity>
                    </View> : null}
                    <View style={{ width: '90%', padding: 5 }}>
                        <FlatList
                            extraData={this.state}
                            data={this.state.eventSearchResult}
                            renderItem={({ item, index }) =>
                                <View style={styles.relatedEventsMainView}>
                                    <View style={styles.relatedEventsCardView}>
                                        <View style={{ width: '35%' }}>
                                            <Image resizeMode='cover' source={item.image} style={{ height: 125, width: '100%' }} />
                                        </View>
                                        <View style={styles.relatedEventsDetailsView}>
                                            <View style={{ width: '100%' }}>
                                                <View style={styles.relatedEventsCategoryView}>
                                                    <Text style={[styles.relatedEventsCategoryText, { color: item.titleColor }]}>{item.category.toLocaleUpperCase()}</Text>
                                                    <Image source={require('@images/saved.png')} style={{ height: 16, width: 18, tintColor: index % 2 != 0 ? '#f05d87' : null }} />
                                                </View>
                                                <View style={{ width: '90%' }}>
                                                    <Text style={styles.relatedEventsTitle}>{item.title}</Text>
                                                    <Text style={styles.relatedEventsSubtitle}>{item.date}{dot}{item.time}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.relatedEventsHandlerView}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                                    <Image source={item.eventManager.image} style={{ height: 25, width: 25, borderRadius: 12.5 }} />
                                                    <Text style={{ marginLeft: 5, color: 'black', fontSize: RFValue(13.6), }}>{item.eventManager.name}</Text>
                                                </View>
                                                <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', fontSize: RFValue(13.6) }}>{item.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>}
                            keyExtractor={(index) => index.toString()}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
    _search(search) {
        var eventSearchResult = []
        if (search) {
            eventSearchResult = this.state.relatedEvents.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
            console.log(eventSearchResult.length);
            this.setState({ eventSearchResult: eventSearchResult })
        }
        else {
            this.setState({ eventSearchResult: [] })
        }
    }
    _createdEventModal() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.modalVisibleCreate}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisibleCreate)
                }}>
                <TouchableOpacity style={styles.participateModalView} onPressOut={() => { this.setModalVisible(!this.state.modalVisibleCreate) }}>
                    <TouchableWithoutFeedback>
                        <View style={styles.participateView}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 3, paddingHorizontal: 15 }}>
                                <View style={{ height: 5, width: 80, backgroundColor: '#e5e4ea', alignSelf: 'center', marginTop: 10, borderRadius: 50 }}></View>
                                {this._button(
                                    'Create private event',
                                    'Only invited guests will see your event. You can choose to let guests invite friends',
                                    require('@images/private600.png'),
                                    () => { this._goAddEvent() },
                                    { width: 20, height: 20, tintColor: 'black' }, 'black'
                                )}
                                {this._button(
                                    'Create public event',
                                    "Anyone will be able to see your event and search for it, even if you aren't friends ",
                                    require('@images/public600.png'),
                                    () => { this._goAddEvent() },
                                    { width: 20, height: 20, tintColor: '#31DAA8' }, '#31DAA8'
                                )}
                                {this._button(
                                    'Create group event',
                                    'Anyone who can see the group will be able to see the event',
                                    require('@images/group600.png'),
                                    () => { this._goAddEvent() },
                                    { width: 20, height: 20, tintColor: '#EB8BDA' }, '#EB8BDA'
                                )}
                                <TouchableOpacity onPress={() => this.setState({ modalVisibleCreate: false })}>
                                    <View style={styles.ButtonStyle}>
                                        <Text style={styles.ButtonTextStyle}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <View style={{ paddingTop: 10 }}>
                    <View style={{ alignSelf: 'flex-end', marginHorizontal: 20, }}>
                        <TouchableOpacity style={styles.backView}
                            onPress={() => { this.setModalVisibleCreateEvent(!this.state.modalVisibleCreate) }}>
                            <Image source={require('@images/addEvent.png')} style={{ height: 20, width: 19, tintColor: '#9246e6', resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.subContainerView}>
                    <View style={{
                        marginTop: 0,
                        marginBottom: 0,
                        marginHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        width: '90%',
                        height: 50,
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{ fontSize: RFValue(22.44), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#000' }}>Events</Text>
                        {this.state.clicks == 0 ?
                            <View style={[styles.searchinputcontainer, { alignItems: 'flex-end', alignSelf: 'center', justifyContent: 'center' }]}>
                                <TouchableOpacity onPress={() => { navigationService.navigate(screens.SEARCH) }}>
                                    <Icon name='search1' type='AntDesign' style={{ color: '#000000', fontSize: 20, marginRight: 4 }} />
                                </TouchableOpacity>
                            </View>
                            : null
                        }
                    </View>
                    <View style={{ paddingVertical: 3, borderBottomWidth: 1, borderColor: '#f2f3f5', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 13, marginHorizontal: 20, marginTop: 3 }}>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 0 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 0 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 0 ? '#fff' : '#000' }]}>Search</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 1 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 1 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 1 ? '#fff' : '#000' }]}>Created</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 2 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 2 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 2 ? '#fff' : '#000' }]}>Liked</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.eventSearchResult.length > 0 ?
                        this._searchList() : this.state.clicks == 0 ? this._SearchSection() : this.state.clicks == 1 ? this._createdEvent() : this._savedEvents()}
                </View>
                {this._yourEventModel()}
                {this._createdEventModal()}
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
        height: '100%',
    },
    backView: {
        width: 30,
    },
    eventBtn: {
        width: '33%',
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
        width: '95%',
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
    relatedEventsCardContent: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '65%',
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
        paddingVertical: 3,
    },
    relatedEventsCategoryText: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontSize: RFValue(10.88),
    },
    relatedEventsTitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RFValue(14.96),
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
        fontSize: RFValue(1.9),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        paddingBottom: 3,
        //width:'80%',
    },
    followDescText: {
        fontSize: RFValue(11.56),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#aeadba'
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        paddingVertical: Platform.OS == 'ios' ? 30 : 20,
    },
    fulldescText: {
        color: '#000',
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
    },
    fulldescTimeText: {
        color: '#a2a0af',
        fontSize: RFValue(14.28),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        marginTop: 3
    },
    ButtonStyle: {
        width: Dimensions.get('window').width * 0.8,
        height: 38,
        backgroundColor: '#9246e6',
        marginTop: 10,
        paddingTop: 3,
        borderRadius: 18,
        //marginBottom:10
    },
    ButtonTextStyle: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white'
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    searchinputcontainer: {
        // flexDirection: 'row',
        //alignItems: 'center',
        // backgroundColor: '#f2f3f5',
        height: 40,
        width: '60%',
        borderRadius: 10,
        // padding: 10,
        // justifyContent: 'space-between',
        // marginTop: 12
    },
    text: {
        padding: 0,
        width: '85%',
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        marginLeft: 5,
        color: '#000000'
    },
    participateModalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    participateView: {
        alignItems: 'center',
        // justifyContent: 'flex-start',
        backgroundColor: "#fff",
        paddingBottom: 30,
        // height: '45%',
        marginBottom: 30,
        alignSelf: 'center',
        width: '90%',
        elevation: 2,
        borderRadius: 15,
    },
    headingText: {
        fontSize: RFValue(19.04),
        color: '#000',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        marginLeft: 5
    },
});

const mapStateToProps = state => ({
    // user: state.session.user,
    // user: state.user,
    // userStory: state.userStory,
    // myStory: state.myStory,
    // events: state.events
})
export default connect(mapStateToProps)(Event);
