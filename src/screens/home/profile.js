import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Modal,
    SafeAreaView, StatusBar, ScrollView, Dimensions,
    TouchableOpacity, Image, FlatList, Animated,
    TouchableWithoutFeedback, ImageBackground
} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize"
// import Lightbox from 'react-native-lightbox'
import navigationService from '../../navigation/navigationService';
import screens from '../../constants/screens';

var Data = ''
const sc_width = Dimensions.get('window').width * 0.85
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: false,
            following: false,
            scrollY: new Animated.Value(0),
            modalVisibleCreate: false,
            displaySrc: null,
            relatedEvents: [
                {
                    image: require('../../assets/images/event_6.jpg'),
                    category: 'Art',
                    title: 'Art Club: Introduction to Painting',
                    titleColor: 'rgb(239,113,184)',
                    date: '4 May',
                    time: '14:00 UTC+2',
                    eventManager: {
                        name: 'Izabella',
                        image: require('../../assets/images/user_9.jpg')
                    },
                    price: '150$'
                },
                {
                    image: require('../../assets/images/event_8.jpg'),
                    category: 'Travel',
                    title: 'Retreat in the clam mountains',
                    titleColor: 'rgb(108,171,247)',
                    date: '18 Feb',
                    time: '9:00 UTC+2',
                    eventManager: {
                        name: 'Izabella',
                        image: require('../../assets/images/user_9.jpg')
                    },
                    price: '800$'
                }
            ]
        }

    }
    componentWillMount() {
        Data = this.props.data
    }
    _profile() {
        return (
            <View style={styles.profileMainView}>
                <View style={[styles.profileImageView, { backgroundColor: '#ffffff', alignItems: 'center' }]}>
                    <View style={{ width: Dimensions.get('window').width, marginVertical: 24, alignItems: 'center', paddingHorizontal: 12 }}>
                        <Image
                            resizeMode={'cover'}
                            source={require('../../assets/images/about_1.jpg')}
                            style={{ width: '100%', height: 360, borderRadius: 12 }} />
                        <View style={[styles.headerView, { position: 'absolute', top: 0, left: 8, right: 0 }]}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => navigationService.pop()}>
                                <Icon name='close' type='MaterialIcons' style={{ color: '#fff', }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => navigationService.pop()}>
                                <Icon name='dots-horizontal' type='MaterialCommunityIcons' style={{ color: '#ffffff', fontSize: 30 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'absolute', left: 24, bottom: 12 }}>
                            <Text style={{ fontSize: RFValue(23.12), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#fff' }}>{'alena'}</Text>
                            <Text style={[styles.aboutText, { color: '#fff' }]}>{'nabrova'}</Text>
                            <Text style={[styles.aboutText, { color: '#fff' }]}>{'Harbelie, France'}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.profileImageView, { justifyContent: 'space-around', flexDirection: 'row', marginTop: 12 }]}>
                    <View style={{ paddingBottom: 5, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 20, width: 20 }} source={require('../../assets/images/star.png')} />
                            <Text style={[styles.relatedEventsTitle, { color: '#9246e6' }]}>4.9</Text>
                        </View>
                        <Text style={styles.profileText}>Reviews</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.relatedEventsTitle, { textAlign: 'center', color: '#9246e6' }]}>4890</Text>
                        <Text style={styles.profileText}>Followers</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.relatedEventsTitle, { textAlign: 'center', color: '#9246e6' }]}>43</Text>
                        <Text style={styles.profileText}>Following</Text>
                    </View>
                </View>
            </View>
        )
    }

    setFollow(visible) {
        this.setState({ following: visible });
    }
    setSave(save) {
        this.setState({ saved: save });
    }

    _inviteButton() {
        return (
            <View style={styles.inviteMainView}>
                <View style={styles.inviteSubView}>
                    <TouchableOpacity style={{ alignItems: 'center', width: '25%' }}
                        onPress={() => { this.setFollow(!this.state.following) }}>
                        <Image style={{ height: 55, width: 55, }} source={this.state.following ? require('../../assets/images/following.png') : require('../../assets/images/follow.png')} />
                        <Text style={[styles.inviteText, { color: this.state.following ? 'black' : '#8941e6', }]}>{this.state.following ? 'Following' : 'Follow'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', width: '25%' }}
                        onPress={() => { this.setSave(!this.state.saved) }}>
                        <Image style={{ height: 55, width: 55, }} source={this.state.saved ? require('../../assets/images/saved_1.png') : require('../../assets/images/save.png')} />
                        <Text style={[styles.inviteText, { color: this.state.saved ? 'black' : '#8941e6', }]}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', width: '25%' }}>
                        <Image style={{ height: 55, width: 55, }} source={require('../../assets/images/message.png')} />
                        <Text style={[styles.inviteText, { color: '#8941e6', }]}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', width: '25%' }}>
                        <Image style={{ height: 55, width: 55, }} source={require('../../assets/images/invite.png')} />
                        <Text style={[styles.inviteText, { color: '#8941e6', }]}>Invite</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
                <View style={[styles.aboutHeadingView]}>
                    <Text style={styles.headingText}>About</Text>
                </View>
                <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => this.setModalVisibleCreateEvent(!this.state.modalVisibleCreate, require('../../assets/images/about_1.jpg'))} style={{ marginLeft: 10, height: Dimensions.get('window').width * 0.67, width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: '100%', width: '100%', borderRadius: 8, resizeMode: "cover" }} source={require('../../assets/images/about_1.jpg')} />
                    </TouchableOpacity>
                    <View style={{ width: '35%', marginLeft: 10, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => this.setModalVisibleCreateEvent(!this.state.modalVisibleCreate, require('../../assets/images/about_2.jpg'))} style={{ height: (Dimensions.get('window').width) * 0.35 - 10, width: (Dimensions.get('window').width) * 0.35 - 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: '100%', width: '100%', borderRadius: 8, resizeMode: "cover" }} source={require('../../assets/images/about_2.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setModalVisibleCreateEvent(!this.state.modalVisibleCreate, require('../../assets/images/about_3.jpg'))} style={{ height: (Dimensions.get('window').width) * 0.35 - 10, width: (Dimensions.get('window').width) * 0.35 - 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: '100%', width: '100%', borderRadius: 8, resizeMode: "cover" }} source={require('../../assets/images/about_3.jpg')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.aboutDescView, { paddingHorizontal: 5, display: 'none' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 14, height: 16, }} source={require('../../assets/images/profile.png')} />
                        <Text style={[styles.aboutText, { paddingLeft: 10, }]}>22 Yo</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 25, alignItems: "center" }}>
                        <Image style={{ width: 20, height: 20, }} source={require('../../assets/images/pinpoint.png')} />
                        <Text style={[styles.aboutText, { paddingLeft: 10, }]}>Paris, France</Text>
                    </View>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', paddingHorizontal: 5,marginTop:8 }}>
                    <Text style={styles.aboutText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Text>
                </View>
                {this._createdEventModal()}
            </View>
        )
    }

    _relatedEvents() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        return (
            <View style={{ width: '100%' }}>
                <View style={{ width: '90%', alignSelf: 'center', paddingVertical: 20 }}>
                    <Text style={styles.headingText}>Events</Text>
                </View>
                <FlatList
                    data={this.state.relatedEvents}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={styles.card}>
                            <View style={styles.cartContainer}>
                                <View style={{ height: 120, width: sc_width }}>
                                    <Image resizeMode='cover' source={item.image}
                                        style={{ height: 120, width: sc_width, borderRadius: 12 }} />

                                    <Image source={require('../../assets/images/saved.png')} style={{ position: 'absolute', top: 12, right: 12, height: 16, width: 18, tintColor: '#f05d87' }} />
                                </View>

                                <View style={{ width: sc_width, padding: 10 }}>
                                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.descText, { paddingBottom: 5, color: '#000', width: '75%' }]}>{item.title}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={item.eventManager.image} style={{ height: 24, width: 24, borderRadius: 12, }} />
                                        <Text style={[styles.cartText, { fontSize: RFValue(14.96), marginLeft: 7, color: '#000' }]}>{item.eventManager.name}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 4, bottom: 8 }}>
                                        <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.date}</Text>
                                        {dot}
                                        {/* <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.time}</Text> */}
                                        <Text style={[styles.cartText, { color: '#6CA7FB', paddingBottom: 5 }]}>{item.category.toLocaleUpperCase()}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    alignItems: 'center', position: 'absolute', right: 8, top: 88, borderRadius: 8,
                                    elevation: 0.7,
                                    shadowOffset: { width: 0, height: 1, },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 1,
                                    backgroundColor: '#ffffff',
                                    paddingHorizontal: 16,
                                    paddingVertical: 4
                                }}>
                                    <Text style={[styles.cartText, { paddingBottom: 5, alignItems: 'center', fontSize: RFValue(13.6) }]}>Budget</Text>
                                    <Text style={[styles.descText, { color: '#000', fontSize: RFValue(19.04) }]}>{item.price}</Text>
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>

        )
    }

    render() {
        const profileOpacity = this.state.scrollY.interpolate({
            inputRange: [50, 60],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        const profileHeight = this.state.scrollY.interpolate({
            inputRange: [0, 70],
            outputRange: [60, 35],
            extrapolate: 'clamp',
        });
        const profileWidth = this.state.scrollY.interpolate({
            inputRange: [0, 70],
            outputRange: [60, 35],
            extrapolate: 'clamp',
        });
        const profileLeft = this.state.scrollY.interpolate({
            inputRange: [0, 70],
            outputRange: [0, 30],
            extrapolate: 'clamp',
        });
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                <ScrollView
                    showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: '5%' }}>
                    {this._profile()}
                    {this._inviteButton()}
                    {this._about()}
                    {this._relatedEvents()}
                    <View style={{ marginTop: 8, width: '100%', backgroundColor: '#aaaaaa', height: StyleSheet.hairlineWidth, opacity: 0.25 }} />

                    <View style={{ width: '100%', paddingTop: 14, paddingHorizontal: 20, flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => { }}>
                            <Icon name={1 ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#13DA9F' }} />
                        </TouchableOpacity>
                        <View style={{ height: 12, width: 1, backgroundColor: '#DDD', marginTop: 10 }} />
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                            <Icon name='close' type='MaterialIcons' style={{ color: '#F84055', }} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 4,
        alignItems: 'center'
    },
    backView: {
        //backgroundColor:'red',
        width: '15%',
        alignItems: 'center',
    },
    profileText: {
        color: '#aeadba',
        fontSize: RFValue(12.24),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
    },
    inviteText: {
        fontSize: RFValue(12.24),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
    },
    headingText: {
        fontSize: RFValue(20.4),
        color: '#000',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    },
    relatedEventsMainView: {
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 5,
        elevation: 0.8,
        borderRadius: 15,
        shadowOffset: { height: 0.5, width: 1.5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    relatedEventsCardView: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 15,
        backgroundColor: 'white'
    },
    relatedEventsCategoryView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 3
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
        color: '#a8a7b5',
        marginVertical: 2
    },
    relatedEventsHandlerView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    relatedEventsDetailsView: {
        width: '65%',
        justifyContent: 'space-between',
        paddingHorizontal: 8
    },
    aboutText: {
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000'
    },
    aboutDescView: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    aboutHeadingView: {
        width: '100%',
        paddingLeft: 16,
        alignSelf: 'center',
        paddingVertical: 20
    },
    inviteMainView: {
        width: '100%',
        marginVertical: 6,
    },
    inviteSubView: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 5,
        flexDirection: 'row',
        // justifyContent: 'space-around' 
    },
    profileMainView: {
        flex: 1
    },
    profileImageView: {
        width: '100%',
    },
    participateModalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    participateView: {
        alignItems: 'center',
        // justifyContent: 'flex-start',
        backgroundColor: "#fff",
        paddingBottom: 0,
        // height: '45%',
        margin: 0,
        alignSelf: 'center',
        width: '100%',
        elevation: 2,
        borderRadius: 15,
    },
    card: {
        width: sc_width,
        borderRadius: 12,
        elevation: 0.7,
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        flex: 1, marginTop: 18,
        alignItems: 'center',
        alignSelf: 'center'
    },
    cartContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 12,
        width: sc_width,
    },
    cartText: {
        fontSize: RFValue(12.24),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    },
    descText: {
        fontSize: RFValue(19.04),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },

});
