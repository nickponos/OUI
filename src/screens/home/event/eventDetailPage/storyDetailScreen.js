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
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize"
import Swiper from 'react-native-swiper';
import SlidingUpPanel from 'rn-sliding-up-panel';
import styles from './styles'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GestureRecognizer, { swipeDirections } from '../../../../lib/react-native-swiper-gestures-master';
import Video from 'react-native-video';
import Button from '../../../../components/button'

const { width, height } = Dimensions.get('window');
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
            Guests: [
                {
                    image: require('@images/user_10.jpg'),
                },
                {
                    image: require('@images/user_2.jpg'),
                },
                {
                    image: require('@images/user_5.jpg'),
                },
                {
                    image: require('@images/user_4.jpg'),
                },
            ],
            peoples: [
                {
                    event: 'Travel',
                    place: require('@images/event_1.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date: '27-31 July . 11:00 UTC+2',
                    image: require('@images/user_9.jpg'),
                    personName: 'Anje',
                    price: '2000$',
                    like: 0,
                },
                {
                    event: 'Science',
                    place: require('@images/event_2.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date: '31 July . 11:00 UTC+2',
                    image: require('@images/user_11.jpg'),
                    personName: 'Leo',
                    price: '3000$',
                    like: 0,
                },
                {
                    event: 'Travel',
                    place: require('@images/user_3.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date: '27-31 July . 11:00 UTC+2',
                    image: require('@images/user_9.jpg'),
                    personName: 'Anje',
                    price: '2000$',
                    like: 0,
                },
                {
                    event: 'Travel',
                    place: require('@images/user_4.jpg'),
                    desc: 'Trip to Plam Shores Beaches',
                    date: '27-31 July . 11:00 UTC+2',
                    image: require('@images/user_9.jpg'),
                    personName: 'Anje',
                    price: '2000$',
                    like: 0,
                },
            ],
            height: Dimensions.get('window').height / 5.5,
            swipe: 'SWIPE_DOWN',
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    setRateModalVisible(visible) {
        this.setState({ ratemodalVisible: visible });
    }
    onStarRatingPress(rating) {
        this.setState({ starCount: rating });
    }
    _participateModal() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                }}>
                <TouchableOpacity style={styles.participateModalView} onPressOut={() => { this.setModalVisible(!this.state.modalVisible) }}>
                    <TouchableWithoutFeedback>
                        <View style={styles.participateView}>
                            <View style={{ height: 5, width: 80, backgroundColor: '#e5e4ea', alignSelf: 'center', marginTop: 10, borderRadius: 50 }}></View>
                            <View style={{ marginVertical: 30 }}>
                                <Text style={[styles.descText, { color: '#000', marginBottom: 5 }]}>Participate to this event</Text>
                                <Text style={[styles.cartText, { color: '#000', textAlign: 'center' }]}>Send a request to the host</Text>
                            </View>
                            <TouchableOpacity style={[styles.buttoncontainer]} onPress={() => { this.setModalVisible(!this.state.modalVisible), this.setState({ goingbutton: true }) }}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                                    <Text style={[styles.cartText, { color: 'white', }]}>Confirm</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }
    UpdateRating(key) {
        this.setState({ starCount: key });
    }
    _renderList(star) {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 30, marginBottom: 5 }}>
                {star.map((index) =>
                    <TouchableOpacity key={index} onPress={() => this.setState({ starCount: index })}>
                        <Image style={styles.starStyle} source={this.state.starCount >= index ? require('@images/star.png') : require('@images/emptystar.png')} />
                    </TouchableOpacity>
                )}
            </View>
        )
    }
    _rateModal() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.ratemodalVisible}
                onRequestClose={() => {
                    this.setRateModalVisible(!this.state.ratemodalVisible)
                }}>
                <TouchableOpacity style={styles.participateModalView} onPressOut={() => { this.setRateModalVisible(!this.state.ratemodalVisible) }}>
                    <TouchableWithoutFeedback>
                        <View style={styles.participateView}>
                            <View style={{ height: 5, width: 80, backgroundColor: '#e5e4ea', alignSelf: 'center', marginTop: 10, borderRadius: 50 }}></View>
                            <View style={{ paddingVertical: 25 }}>
                                <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={require('@images/user_10.jpg')} />
                            </View>
                            <View style={{}}>
                                <Text style={[styles.descText, { color: '#000', marginBottom: 5 }]}>Trip to Palm Shores Beaches</Text>
                                <Text style={[styles.cartText, { color: '#000', textAlign: 'center' }]}>Please rate your experience</Text>
                            </View>
                            {this._renderList([1, 2, 3, 4, 5])}
                            <TouchableOpacity style={[styles.buttoncontainer]} disabled={this.state.starCount ? false : true}
                                // onPress={() => Actions.reset('Home')}
                                >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={this.state.starCount ? ['#a65ae1', '#8a4cea'] : ['#e3cdf8', '#e3cdf8']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                                    <Text style={[styles.cartText, { color: 'white', }]}>Submit</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }
    fullView = () => {
        const eventDetail = this.props.storyDetail.event_Information;
        return (
            <SafeAreaView style={{ backgroundColor: '#fff', paddingBottom: 84 }}>
                <ScrollView contentContainerStyle={{}} >
                    {/* ============================= Main Title ============================== */}
                    <View style={{ marginTop: 24, marginBottom: 5, paddingHorizontal: 20, justifyContent: 'center' }}>
                        <Text style={{ fontSize: RFValue(14.28), color: '#6CA7FB', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>{(eventDetail.category).toUpperCase()}</Text>
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: RFValue(23.8), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>{eventDetail.event_title}</Text>
                    </View>
                    {/* ============================= Desc ============================== */}
                    <View style={{ width: '90%', alignSelf: 'center', marginVertical: 10, }}>
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
                                <Text style={styles.fulldescTimeText}>The host take care of it</Text>
                            </View>
                        </View>
                    </View>
                    {/* ============================= Guests ============================== */}
                    <View style={{ width: '100%', alignSelf: 'center', marginVertical: 10 }}>
                        <Text style={[styles.fullViewHeadingText, { paddingHorizontal: 20 }]}>Guests</Text>
                        <Text style={[styles.fulldescText, { paddingVertical: 5, marginTop: 15, paddingHorizontal: 20 }]}>Up to {eventDetail.guest} mixed guests</Text>
                        <View style={{ marginTop: 5 }}>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.Guests}
                                extraData={this.state}
                                renderItem={({ item, index }) =>
                                    <View style={{ paddingHorizontal: 5 }}>
                                        <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={item.image} />
                                    </View>
                                }
                            />
                        </View>
                    </View>
                    {/* ============================= Note ============================== */}
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={[styles.fullViewHeadingText, { paddingHorizontal: 20 }]}>Notes</Text>
                        <Text style={{ width: '90%', alignSelf: 'center', textAlign: 'justify', color: 'black', marginTop: 10, fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>
                            {eventDetail.notes}
                        </Text>
                    </View>
                    {/* ============================= Location ============================== */}
                    <View style={{ justifyContent: 'center', marginTop: 10 }}>
                        <Text style={[styles.fullViewHeadingText, { paddingHorizontal: 20 }]}>Location</Text>
                        <Text style={{ width: '90%', alignSelf: 'center', textAlign: 'justify', color: 'black', marginTop: 10, fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>
                            Hotel Riu Palace Aruba, Noord, Aruba
                  </Text>
                        <View style={{ marginTop: 10, height: Dimensions.get('window').width / 3.5, borderRadius: 10, overflow: 'hidden', width: '90%', alignSelf: 'center' }}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                region={{
                                    latitude: eventDetail.serachData.location.lat,
                                    longitude: eventDetail.serachData.location.lng,
                                    latitudeDelta: 0.0009656971472811193,
                                    longitudeDelta: 0.003112368285670186,
                                }}>
                                <Marker
                                    coordinate={{
                                        latitude: 12.5665,
                                        longitude: -70.0475,
                                    }}>
                                    <Image source={require('@images/locationicon.png')} style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }} />
                                </Marker>
                            </MapView>
                        </View>
                    </View>
                    {/* ============================= Hostedby ============================== */}
                    <View style={{ justifyContent: 'center', marginTop: 10 }}>
                        <Text style={[styles.fullViewHeadingText, { paddingHorizontal: 20 }]}>Hosted by</Text>
                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#e5e4ea' }}>
                            <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', alignItems: "center", justifyContent: 'space-between', paddingVertical: 5, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('@images/user_10.jpg')} style={{ height: 30, width: 30, borderRadius: 15, }} />
                                    <View style={{ paddingLeft: 10 }}>
                                        <Text style={[styles.cartText, { fontSize: RFValue(16.32), color: 'black' }]}>Anje</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require('@images/star.png')} style={{ height: 20, width: 20, borderRadius: 15, }} />
                                            <Text style={[styles.cartText, { fontSize: RFValue(15.64), color: 'black' }]}>4.7 (48)</Text>
                                        </View>
                                    </View>
                                </View>
                                <Icon name='angle-right' type='FontAwesome' style={{ color: 'grey', fontSize: 20 }} />
                            </View>
                        </View>
                    </View>
                    {/* ============================= Similer Event ============================== */}
                    <View style={{ justifyContent: 'center', marginTop: 20 }}>
                        <Text style={[styles.fullViewHeadingText, { paddingHorizontal: 20 }]}>Similar events</Text>
                        {this._popularPeople()}
                    </View>
                </ScrollView>
                <View style={{ height: 78, position: 'absolute', bottom: 8, left: 0, right: 0, width: '100%', flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#e5e4ea' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <View style={{ paddingLeft: 24 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#11D59C' }} />
                                <Text style={[styles.relatedEventsTitle, { fontSize: 18, color: '#000000', marginLeft: 6 }]}>Free Event!</Text>
                            </View>
                            <Text style={[styles.relatedEventsTitle, { fontSize: 14, color: '#000000' }]}>The host take care of it</Text>
                        </View>
                        <View style={{ paddingRight: 8 }}>
                            <Button buttonText='Participate'
                                colors={['#5BBDFB', '#8484FA']} style={styles1.buttoncontainer} />
                        </View>
                    </View>
                </View>
            </SafeAreaView >
        )
    }
    _popularPeople() {
        return (
            <View style={{ width: '100%', paddingLeft: 20 }}>
                <View style={{ width: '100%' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.peoples}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.card}>
                                <TouchableOpacity style={styles.cartContainer}>
                                    <ImageBackground source={item.place} style={{ height: 200, width: 300, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 20 }}>
                                            <TouchableOpacity onPress={() => this.setState(state => (this.state.peoples[index].like = !this.state.peoples[index].like, state))}>
                                                <Icon name={this.state.peoples[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#fff' }} />
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                                    <View style={{ width: '100%', padding: 10, }}>
                                        <Text style={[styles.cartText, { paddingBottom: 5 }]}>{(item.event).toUpperCase()}</Text>
                                        <Text style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>{item.desc}</Text>
                                        <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5' }]}>{item.date}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={item.image} style={{ height: 30, width: 30, borderRadius: 15, }} />
                                                <Text style={[styles.cartText, { marginLeft: 7, color: '#000' }]}>{item.personName}</Text>
                                            </View>
                                            <Text style={[styles.descText, { color: '#000' }]}>{item.price}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>
            </View>
        )
    }
    onSwipeUp(gestureState) {
        console.log("swiped Up")
    }

    onSwipeDown(gestureState) {
        console.log("swiped Down")
    }
    onSwipe(gestureName, gestureState) {
        const { SWIPE_UP, SWIPE_DOWN } = swipeDirections;
        console.log("gestureName : ", gestureName)
        console.log("gestureState : ", gestureState)
        switch (gestureName) {
            case SWIPE_UP:
                this.setState({ height: (Dimensions.get('window').height * 0.5) + 48, swipe: 'SWIPE_UP' });
                break;
            case SWIPE_DOWN:
                this.setState({ height: Dimensions.get('window').height / 5.5, swipe: 'SWIPE_DOWN' });
                break;
        }
    }
    _reanderStory = (item) => {
        return (
            // items.map((item, index) => {
            <ImageBackground source={{ uri: item }} style={{ width: '100%', height: '100%' }} resizeMode='stretch'>
                <View style={styles.container}>
                    <View style={styles.headerView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ swipe: 'SWIPE_DOWN', height: Dimensions.get('window').height / 6 })}
                                style={{ paddingHorizontal: 10, marginLeft: -10 }}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: 'white', fontSize: 35 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {this.state.goingbutton == true ?
                                <TouchableOpacity>
                                    <Image source={require('@images/message1.png')} style={{ height: 25, width: 25, marginRight: 15 }} />
                                </TouchableOpacity>
                                : null
                            }
                            <TouchableOpacity>
                                <Icon name={'favorite'} type='MaterialIcons' style={{ color: 'rgb(239,113,184)' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            // })
        )
    }
    _yourStory() {
        const { story_creater, date } = this.props.storyDetail;
        const { user } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <View style={styles.storyView}>
                        <Image source={{ uri: story_creater.image }} style={styles.storyImg} />
                        <View style={{ width: '70%' }}>
                            <Text style={styles.yourStoryShareText}>{story_creater.name == user.name ? "Your Story" : story_creater.name}</Text>
                            <Text style={[styles.yourStoryShareText, { fontSize: RFValue(12.24) }]}>
                                {
                                    date == undefined ? "" : date
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.iconView}>
                        <TouchableOpacity>
                            <Icon name='dots-horizontal' type="MaterialCommunityIcons" style={{ color: '#fff', fontSize: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          // onPress={() => { Actions.reset('Home', { tab: 1 }) }} 
                          style={{ marginLeft: 2 }}>
                            <Icon name='close' type="MaterialCommunityIcons" style={{ color: '#fff', fontSize: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 50
        };
        const eventDetail = this.props.storyDetail.event_Information;
        const { storyDetail } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {this.state.swipe == 'SWIPE_DOWN' ?
                    <View style={{ flex: 5 }}>
                        {storyDetail.fileType == "image" ?
                            <ImageBackground source={{ uri: storyDetail.story[0] }} style={styles.imageBackground}>
                                {this._yourStory()}
                            </ImageBackground>
                            :
                            <View style={{ flex: 1, backgroundColor: 'white' }}>
                                <Video source={{ uri: storyDetail.story }}   // Can be a URL or a local file.
                                    style={styles.backgroundVideo}
                                    muted={false}
                                    repeat={true}
                                    resizeMode={"cover"}           // Callback when video cannot be loaded
                                />
                                <View style={{ position: 'absolute', alignSelf: 'center', width: '95%' }}>
                                    {this._yourStory()}
                                </View>
                            </View>
                        }
                    </View> :
                    <View style={{ height: Platform.OS == 'ios' ? Dimensions.get('window').height / 2.5 : (Dimensions.get('window').height * 0.5) - 48 }}>
                        <Swiper
                            dotColor='#cbcbcb'
                            activeDotColor='#ffffff'
                            paginationStyle={{ position: 'absolute', bottom: 52 }}
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
                            alignItems: 'center', position: 'absolute', right: 12, borderRadius: 8, top: (Dimensions.get('window').height * 0.5) - 104,
                            elevation: 0.7,
                            shadowOffset: { width: 0, height: 1, },
                            shadowOpacity: 0.3,
                            shadowRadius: 1,
                            backgroundColor: '#ffffff',
                            paddingHorizontal: 16,
                            paddingVertical: 4
                        }}>
                            <Text style={[styles.cartText, { paddingBottom: 5, alignItems: 'center', fontSize: 14 }]}>Budget</Text>
                            <Text style={[styles.descText, { color: '#6CA7FB', fontSize: 16 }]}>{eventDetail.budget.value + eventDetail.budget.currency}</Text>
                        </View>
                    </View>}
                <GestureRecognizer
                    onSwipe={(direction, state) => this.onSwipe(direction, state)}
                    onSwipeUp={(state) => this.onSwipeUp(state)}
                    onSwipeDown={(state) => this.onSwipeDown(state)}
                    config={config}
                    style={{
                        flex: 1,
                        backgroundColor: this.state.backgroundColor
                    }}
                >
                    <View style={{ width: '100%', alignSelf: 'center', height: this.state.height, backgroundColor: 'white', position: 'absolute', bottom: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: 'hidden' }}>
                        <View style={{ height: 5, width: 80, backgroundColor: '#e5e4ea', alignSelf: 'center', marginTop: 10, borderRadius: 50 }}></View>
                        {this.state.swipe == 'SWIPE_DOWN' ?
                            <View style={{ width: '90%', alignSelf: 'center' }}>
                                <Text style={{ marginTop: 10, color: '#68a8fa', fontSize: RFValue(15.64), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}> {(eventDetail.category).toUpperCase()} </Text>
                                <Text style={{ marginTop: 7, width: Platform.OS == 'ios' ? '75%' : '65%', color: '#000', fontSize: RFValue(23.8), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold' }}>{eventDetail.event_title}</Text>
                            </View> :
                            this.fullView()
                        }
                    </View>
                </GestureRecognizer>
                {this._participateModal()}
                {this._rateModal()}
            </View>
        );
    }
}


const mapStateToProps = state => ({
    // user: state.session.user,
})
export default connect(mapStateToProps)(eventDetailscreen);


