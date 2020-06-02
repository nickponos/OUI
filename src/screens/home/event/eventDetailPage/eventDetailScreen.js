import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    FlatList,
    ImageBackground,
    ScrollView,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize"
import Swiper from 'react-native-swiper';
import styles from './styles'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Events from '../../../../components/testStyle';
import testdata from '../../../../assets/dumydata';
// import firebase from 'react-native-firebase';
import Button from '../../../../components/button'
import navigationService from '../../../../navigation/navigationService';
import screens from '../../../../constants/screens';


const styles1 = StyleSheet.create({
    aboutHeadingView: {
        width: '100%',
        paddingLeft: 16,
        alignSelf: 'center',
        paddingVertical: 20
    },
    headingText: {
        fontSize: RFValue(20.4),
        color: '#000',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    },
    aboutText: {
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000'
    },
    buttoncontainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 50,
        width: 140,
        borderRadius: 25,
    },
});


class eventDetailscreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            ratemodalVisible: false,
            goingbutton: false,
            starCount: '',
            events: [],
            eventKeys: [],
            modalVisibleCreate: false,
            displaySrc: null,
            relatedEvents: testdata.relatedEvents,
            Guests: [
                {
                    image: require('../../../../assets/images/user_10.jpg'),
                },
                {
                    image: require('../../../../assets/images/user_2.jpg'),
                },
                {
                    image: require('../../../../assets/images/user_5.jpg'),
                },
                {
                    image: require('../../../../assets/images/user_4.jpg'),
                },
                {
                    image: require('../../../../assets/images/user_6.jpg'),
                },
                {
                    image: require('../../../../assets/images/user_11.jpg'),
                },
                {
                    image: require('../../../../assets/images/user_7.jpg'),
                },
                {
                    image: require('../../../../assets/images/user_3.jpg'),
                },
                {
                    image: require('../../../../assets/images/user_8.jpg'),
                },
                {
                    image: require('../../../../assets/images/user_9.jpg'),
                },
            ],
            peoples: [
                {
                    event: 'Travel',
                    place: require('../../../../assets/images/event_1.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date: '27-31 July . 11:00 UTC+2',
                    image: require('../../../../assets/images/user_9.jpg'),
                    personName: 'Anje',
                    price: '2000$',
                    like: 0,
                },
                {
                    event: 'Science',
                    place: require('../../../../assets/images/event_2.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date: '31 July . 11:00 UTC+2',
                    image: require('../../../../assets/images/user_11.jpg'),
                    personName: 'Leo',
                    price: '3000$',
                    like: 0,
                },
                {
                    event: 'Travel',
                    place: require('../../../../assets/images/user_3.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date: '27-31 July . 11:00 UTC+2',
                    image: require('../../../../assets/images/user_9.jpg'),
                    personName: 'Anje',
                    price: '2000$',
                    like: 0,
                },
                {
                    event: 'Travel',
                    place: require('../../../../assets/images/user_4.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date: '27-31 July . 11:00 UTC+2',
                    image: require('../../../../assets/images/user_9.jpg'),
                    personName: 'Anje',
                    price: '2000$',
                    like: 0,
                },
            ],
            height: Dimensions.get('screen').height / 5.5,
            swipe: 'SWIPE_DOWN',
            intervalReference: null,
            time: new Date().toLocaleTimeString(),
            countdown: 0,
            index: 0
        }
        setInterval(() => {
            this.setState({ time: new Date().toLocaleTimeString() })
        }, 1000)
        this.startCountDown = this.startCountDown.bind(this)
    }

    componentDidMount() {
        // var ref = firebase.database().ref("Events");
        // ref.on('value', (snapshot) => {
        //     let data = snapshot.val();
        //     if (data) {
        //         this.setState({ events: Object.values(data), eventKeys: Object.keys(data) });
        //     }
        // });
    }

    async startCountDown(countdownTime = this.state.countdown) {
        clearInterval(this.state.intervalReference)
        console.log(`you pressed ${countdownTime}`)
        this.setState({ countdown: countdownTime, originalCountdown: countdownTime }, () => {
            let intervalReference = setInterval(() => {
                if (this.state.countdown < 10) {
                    this.setState({ countdown: ++this.state.countdown })
                } else {

                    this.setState({ countdown: -1 })
                }

            }, 1000)
            this.setState({ intervalReference: intervalReference })
        })
    }
    pause() {
        clearInterval(this.state.intervalReference)

    }
    resume() {
        // console.log(this.state)
        this.startCountDown(this.state.countdown)
    }
    reset() {
        this.pause();
    }
    _desc() {
        const { eventDetail } = this.props
        return (
            <View style={{ width: '100%', alignSelf: 'center', marginVertical: 5, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor: '#6CA7FB' }} source={require('@images/calender.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>{eventDetail.event_start_date}</Text>
                        <Text style={styles.fulldescTimeText}>{eventDetail.event_start_time}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor: '#6CA7FB' }} source={require('@images/pinpoint.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>{eventDetail.serachData.title}</Text>
                        <Text style={styles.fulldescTimeText}>{eventDetail.serachData.address}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor: '#6CA7FB' }} source={require('@images/price.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>{eventDetail.budget.value + eventDetail.budget.currency} budget</Text>
                        <Text style={styles.fulldescTimeText}>The budget is splitted</Text>
                    </View>
                </View>
            </View>
        )
    }
    _reanderStory(image) {
        return (
            <ImageBackground source={{ uri: image }} style={{ width: '100%', height: '100%' }} resizeMode='stretch'>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.headerView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => { navigationService.pop() }}
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
    _button = () => {
        const { eventDetail, user, eventID } = this.props
        if (user.name === eventDetail.event_creater.name)
            return <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%', alignSelf: 'center', justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#f2f3f5' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 20, width: '40%' }}>
                    <TouchableOpacity onPress={() => { navigationService.navigate(screens.EDIT_EVENT, { eventDetail, eventID }) }} style={{ backgroundColor: '#f2f3f5', padding: 12, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                        <Image style={{ height: 20, width: 20, tintColor: '#000' }} source={require('@images/edit.png')} />
                        <Text style={{ color: '#000', fontSize: RFValue(14.28), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', paddingLeft: 5, alignSelf: 'center' }}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 20, width: '40%', marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => { navigationService.navigate(screens.INVITE_GUEST) }} style={{ backgroundColor: '#9246e6', padding: 12, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                        <Image style={{ height: 18, width: 20, tintColor: '#fff' }} source={require('@images/guest.png')} />
                        <Text style={{ color: '#fff', fontSize: RFValue(14.28), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', paddingLeft: 5, alignSelf: 'center' }}>Guests</Text>
                    </TouchableOpacity>
                </View>
            </View>
    }
    setModalVisibleCreateEvent(visible, imageSrc) {
        this.setState({ modalVisibleCreate: visible, displaySrc: imageSrc });
    }
    _createdEventModal() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.modalVisibleCreate}
                onRequestClose={() => {
                    this.setState({ modalVisibleCreate: false });
                }}>
                <TouchableOpacity style={styles.participateModalView} onPressOut={() => { this.setState({ modalVisibleCreate: false }) }}>
                    <TouchableWithoutFeedback>
                        <View style={styles.participateView}>
                            <ImageBackground style={{ alignItems: 'flex-end', height: '100%', width: '100%', borderRadius: 3, resizeMode: "cover" }} source={this.state.displaySrc}>
                                <TouchableOpacity onPress={() => this.setState({ modalVisibleCreate: false })} style={{ width: 50 }}>
                                    <Text style={{ color: 'white', fontSize: 18, margin: 10 }}>✕</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }
    _about() {
        return (
            <View style={{ width: '100%', backgroundColor: '#ffffff' }}>
                <View style={[styles1.aboutHeadingView]}>
                    <Text style={styles1.headingText}>About</Text>
                </View>
                <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => this.setModalVisibleCreateEvent(!this.state.modalVisibleCreate, require('../../../../assets/images/about_1.jpg'))} style={{ marginLeft: 10, height: Dimensions.get('window').width * 0.67, width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: '100%', width: '100%', borderRadius: 8, resizeMode: "cover" }} source={require('../../../../assets/images/about_1.jpg')} />
                    </TouchableOpacity>
                    <View style={{ width: '35%', marginLeft: 10, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => this.setModalVisibleCreateEvent(!this.state.modalVisibleCreate, require('../../../../assets/images/about_2.jpg'))} style={{ height: (Dimensions.get('window').width) * 0.35 - 10, width: (Dimensions.get('window').width) * 0.35 - 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: '100%', width: '100%', borderRadius: 8, resizeMode: "cover" }} source={require('../../../../assets/images/about_2.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setModalVisibleCreateEvent(!this.state.modalVisibleCreate, require('../../../../assets/images/about_3.jpg'))} style={{ height: (Dimensions.get('window').width) * 0.35 - 10, width: (Dimensions.get('window').width) * 0.35 - 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: '100%', width: '100%', borderRadius: 8, resizeMode: "cover" }} source={require('../../../../assets/images/about_3.jpg')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', paddingHorizontal: 5, marginTop: 8 }}>
                    <Text style={styles1.aboutText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Text>
                </View>
            </View>
        )
    }

    _guest() {
        return (
            <View style={{ width: '100%', backgroundColor: '#ffffff' }}>
                <View style={[styles1.aboutHeadingView]}>
                    <Text style={styles1.headingText}>Guest</Text>
                    <Text style={styles1.aboutText}> Up to 10 mixed guest</Text>
                </View>
                <View style={{ width: '100%' }}>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.state.Guests.map((item, index) => {
                            return (<View style={{ height: 56, width: 56, paddingVertical: 4, marginLeft: 4 }}>
                                <Image style={{ height: 48, width: 48, borderRadius: 24 }} source={item.image} />
                            </View>)
                        })}
                    </ScrollView>

                </View>

            </View>
        )
    }

    _Location() {
        console.log("AnkitData " + this.state.Guests.length);
        return (
            <View style={{ width: '100%', backgroundColor: '#ffffff' }}>
                <View style={[styles1.aboutHeadingView]}>
                    <Text style={styles1.headingText}>Location</Text>
                    <Text style={[styles1.aboutText, { marginTop: 8 }]}> Up to 10 mixed guest</Text>
                </View>
                <View style={{ width: '100%', paddingHorizontal: 16 }}>
                    <View style={{ overflow: 'hidden', width: '100%', height: 112, backgroundColor: '#ff0000', borderRadius: 12, marginTop: 8 }}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{
                                flex: 1,
                                borderRadius: 16,

                            }}
                            region={{
                                latitude: 44.1628,
                                longitude: -77.3832,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: 44.1628,
                                    longitude: -77.3832,
                                }}>
                            </Marker>
                        </MapView>
                    </View>
                </View>

            </View>
        )
    }

    _HostedBy() {
        return (
            <View style={{ width: '100%', backgroundColor: '#ffffff' }}>
                <View style={[styles1.aboutHeadingView]}>
                    <Text style={styles1.headingText}>Hosted By</Text>
                </View>
                <View style={{ alignItems: 'center', paddingHorizontal: 16, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../../assets/images/user_9.jpg')} style={{ height: 48, width: 48, borderRadius: 24, }} />
                        <View style={{ marginLeft: 8 }}>
                            <Text style={[styles.cartText, { fontSize: RFValue(14.96), marginLeft: 7, color: '#000' }]}>{"Jack,31"}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ height: 16, width: 16 }} source={require('../../../../assets/images/star.png')} />
                                <Text style={[styles.relatedEventsTitle, { fontSize: RFValue(14.96), color: '#000000' }]}>4.9(48)</Text>
                            </View>
                        </View>
                    </View>
                    <Image source={require('../../../../assets/images/right_arrow.png')} style={{ height: 16, width: 16, }} />
                </View>

            </View>
        )
    }

    _finalView() {
        return (<View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ paddingLeft: 24 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#11D59C' }} />
                    <Text style={[styles.relatedEventsTitle, { fontSize: RFValue(20.4), color: '#000000', marginLeft: 6 }]}>Free Event!</Text>
                </View>
                <Text style={[styles.relatedEventsTitle, { fontSize: RFValue(14.96), color: '#000000' }]}>The host take care of it</Text>
            </View>
            <View style={{ paddingRight: 8 }}>
                <Button buttonText='Participate'
                    colors={['#5BBDFB', '#8484FA']} style={styles1.buttoncontainer} />
            </View>
        </View>)
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 50
        };
        const { eventDetail } = this.props
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: Platform.OS == 'ios' ? Dimensions.get('screen').height * 1.7 / 2.5 : Dimensions.get('screen').height * 1.2 / 3.3 }}>
                        <Swiper
                            dotColor='#cbcbcb'
                            autoplay={true}
                            autoplayTimeout={4}
                            autoplayDirection={true}
                            barEasing={"quad"}
                            activeDotColor='#ffffff'
                            activeDotStyle={{ borderWidth: 2, borderColor: '#cbcbcb', width: 12, height: 12, borderRadius: 6 }}
                            showsButtons={false}>
                            {this._reanderStory(eventDetail.place_images[0])}
                            {this._reanderStory(eventDetail.place_images[1])}
                            {this._reanderStory(eventDetail.place_images[2])}
                            {this._reanderStory(eventDetail.place_images[3])}
                            {this._reanderStory(eventDetail.place_images[4])}
                            {this._reanderStory(eventDetail.place_images[5])}
                            {this._reanderStory(eventDetail.place_images[6])}
                            {this._reanderStory(eventDetail.place_images[7])}
                            {this._reanderStory(eventDetail.place_images[8])}
                            {this._reanderStory(eventDetail.place_images[9])}
                        </Swiper>
                        <View style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0, height: 16,
                            backgroundColor: 'white',
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                        }} />
                        <View style={{
                            alignItems: 'center', position: 'absolute', right: 12, borderRadius: 8, bottom: 0,
                            elevation: 0.7,
                            shadowOffset: { width: 0, height: 1, },
                            shadowOpacity: 0.3,
                            shadowRadius: 1,
                            backgroundColor: '#ffffff',
                            paddingHorizontal: 16,
                            paddingVertical: 4
                        }}>
                            <Text style={[styles.cartText, { paddingBottom: 5, alignItems: 'center', fontSize: RFValue(13.6) }]}>Budget</Text>
                            <Text style={[styles.descText, { color: '#6CA7FB', fontSize: RFValue(19.04) }]}>{eventDetail.budget.value + eventDetail.budget.currency}</Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'center', width: '100%', alignSelf: 'center', backgroundColor: '#ffffff'
                    }}>
                        <View style={{ marginTop: 15, marginBottom: 5, paddingHorizontal: 20, justifyContent: 'center' }}>
                            <Text style={{ fontSize: RFValue(14.28), color: '#6CA7FB', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>{(eventDetail.category).toUpperCase()}</Text>
                        </View>
                        <View style={{ width: '100%', paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: RFValue(23.8), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>{eventDetail.event_title}</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            {this._desc()}
                            {this._about()}
                            {this._guest()}
                            {this._Location()}
                            {this._HostedBy()}
                            {this.state.events.length > 0 ?
                                <Events
                                    onPress={(eventDetail, index) => navigationService.navigate(screens.TESTEVENT_DETAIL, { eventDetail, eventID: this.state.eventKeys[index] })}
                                    title="Similar events"
                                    events={this.state.events}
                                    keys={this.state.eventKeys}
                                /> : null}
                            {this._finalView()}
                            <View style={{ height: 20, width: 20 }} />

                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    // user: state.session.user,
})
export default connect(mapStateToProps)(eventDetailscreen);


