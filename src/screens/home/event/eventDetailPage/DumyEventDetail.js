import React, { Component } from 'react';
import {
    Platform,
    Text,
    View, StyleSheet,
    ImageBackground, ScrollView, Modal,
    TouchableOpacity, TouchableWithoutFeedback,
    StatusBar,
    Image,
    Dimensions,
    SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { RFValue } from "react-native-responsive-fontsize"
import Swiper from 'react-native-swiper';
// import SlidingUpPanel from 'rn-sliding-up-panel';
import styles from './styles'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import GestureRecognizer, { swipeDirections } from '@lib/react-native-swipe-gestures-master';
const { width, height } = Dimensions.get('window');
// import firebase from 'react-native-firebase';
import Button from '../../../../components/button';
import Events from '../../../../components/testStyle';
// import { getDateDisplay, getTimeDisplay } from '../../../../services/utils'
// import { StoryBackground } from '../../../../components/storyBackground';
import Video from 'react-native-video';
import Spinner from 'react-native-spinkit';
import navigationService from '../../../../navigation/navigationService';
import screens from '../../../../constants/screens';
// import { clearEventDetails } from '../../../../controllers/eventDetail';
// import { participateEvent, likeEvent, unlikeEvent } from '../../../../controllers/event';


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

const comStyles = {
    wrapper: {
      flex: 1,
      backgroundColor: '#E6E6E6'
    },
  
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    image: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'transparent'
    },
  
    loadingView: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,.5)'
    },
  
    captionText: {
      fontSize: 24,
      fontWeight: 'bold',
      width,
      textAlign: 'center',
      backgroundColor: 'transparent'
    }
}

const Slide = props => {
    return (<View style={comStyles.slide}>
      {
          props.type == 'image' ?
          <Image onLoad={props.loadHandle.bind(null)} style={comStyles.image} source={{uri: props.uri}} />
          :
          <Video 
              onLoad={props.loadHandle.bind(null)} 
              style={comStyles.image}
              source={{uri: props.uri}}
              muted={props.muted}
              repeat={true}
              resizeMode={'cover'}
          />
      }
      {
        !props.loaded && <View style={styles.loadingView}>
          <Spinner size={100} color={'#B3B5D6'} type={'FadingCircleAlt'}/>
        </View>
      }
    </View>)
  }

class eventDetailscreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            ratemodalVisible: false,
            goingbutton: false,
            starCount: '',
            events: [],
            modalVisibleCreate: false,
            displaySrc: null,
            eventKeys: [],
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
            content: {
                displayDate: '',
                displayTime: '',
                budget: '',
                currency: ''
            },
            story: [],
            loadQueue: [], //[0,0,0,0,...] loading state array
            storyLoaded: 0,
            liked: false,
            participated: false,
            creator: {}
        }

        this.loadHandle = this.loadHandle.bind(this)
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

    componentWillUnmount() {
        if (this.state.liked == true) {
            // unlikeEvent(this.props.eventId, this.props.userId);
        } else {
            // likeEvent(this.props.eventId, this.props.userId);
        }
        if (this.state.participated == true) {
            // participateEvent(this.props.eventId, this.props.user.userId);
        }
        // clearEventDetails();
    }

    loadHandle (i) {
        let loadQueue = this.state.loadQueue
        loadQueue[i] = 1
        this.setState({
          loadQueue
        })
        this.setState({storyLoaded: 1});
    }

    _newItemLoadStart = (index) => {
          
        const { story } = this.state
        this.setState({storyLoaded: 0});
        console.log("Swiper New Index =", story.length);
        let loadQueue = this.state.loadQueue
        if (parseInt(index) > 0) {
          console.log("Swiper Inner Index1 =", index);
          if (story[index - 1].fileType == 'video') {
              loadQueue[index - 1] = 0
              this.setState({
                loadQueue
              })
          }
        } 
        if (parseInt(index + 2) <= story.length) {
          console.log("Swiper Inner Index2 =", index);
          if (story[index + 1].fileType == 'video') {
              loadQueue[index + 1] = 0
              this.setState({
                loadQueue
              })
            }
        }
        
    }

    static getDerivedStateFromProps (props, state) {
        // const { eventDetail } = props
        
        // let resultEvent = {
        //     ...eventDetail,
        //     displayDate: eventDetail.event_start_date,
        //     displayTime: eventDetail.event_start_time,            
        //     ...eventDetail.budget,
        // }
        // let storyResult = eventDetail.story ? eventDetail.story : {};
        // let loadResult = [];
        // if (storyResult.story !== undefined) {
        //     storyResult.story.forEach(element => {
        //         loadResult.push(0);
        //     });
        // }
        // let likedResult = eventDetail.liked ? true : false; 
        // let participatedResult = eventDetail.participated ? true : false;
        // let eventCreator = eventDetail.creator;
        // return {
        //     content: resultEvent,
        //     story: storyResult.story ? storyResult.story : [],
        //     loadQueue: loadResult,
        //     liked: likedResult,
        //     participated: participatedResult,
        //     creator: eventCreator
        // }
    }

    _participateEvent = () => {
        this.setState({participated: true})
    }

    _toggleLiked = () => {
        console.log("Toggle Liked = ", this.state.liked)
        this.setState({liked: !this.state.liked});
    }

    _desc() {
        return (
            <View style={{ width: '100%', alignSelf: 'center', marginVertical: 5, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor: '#6CA7FB' }} source={require('@images/calender.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>{this.state.content.displayDate}</Text>
                        <Text style={styles.fulldescTimeText}>At {this.state.content.displayTime} </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor: '#6CA7FB' }} source={require('@images/pinpoint.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>{this.state.content.notes}</Text>
                        <Text style={styles.fulldescTimeText}>{this.state.content.meeting_place}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={{ height: 25, width: 25, tintColor: '#6CA7FB' }} source={require('@images/price.png')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.fulldescText}>{this.state.content.value}{this.state.content.currency} budget</Text>
                        {/* <Text style={styles.fulldescTimeText}>The budget is splitted</Text> */}
                    </View>
                </View>
            </View>
        )
    }
    _reanderStory(image) {
        return (
            <ImageBackground source={image} style={{ width: '100%', height: '100%' }} resizeMode='stretch'>
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

    _reanderStory1(item) {
        if (item.fileType == 'image') {
            return (
                <View style={{width: '100%', height: '100%', backgroundColor: 'red'}}>
                    {/* <Image 
                        source={{uri: item.story}}
                        style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}
                        resizeMode={'cover'}
                    /> */}
                    

                </View>
            )
        } 

        if (item.fileType == 'video') {
            return (
                <View style={{width: '100%', height: '100%'}}>
                    <Video 
                        style={{position: 'absolute', left: 0, top: 0, bottom: 0, right: 0}}
                        source={{uri: item.story}}
                        muted={false}
                        repeat={true}
                        resizeMode={'cover'}
                    ></Video>
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
                                <TouchableOpacity onPress={() => {this._toggleLiked()}}>
                                    <Icon name={this.state.events[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#fff' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        
        
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
                    <TouchableOpacity onPress={() => this.setModalVisibleCreateEvent(!this.state.modalVisibleCreate, require('@images/about_1.jpg'))} style={{ marginLeft: 10, height: Dimensions.get('window').width * 0.67, width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: '100%', width: '100%', borderRadius: 8, resizeMode: "cover" }} source={require('@images/about_1.jpg')} />
                    </TouchableOpacity>
                    <View style={{ width: '35%', marginLeft: 10, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => this.setModalVisibleCreateEvent(!this.state.modalVisibleCreate, require('@images/about_2.jpg'))} style={{ height: (Dimensions.get('window').width) * 0.35 - 10, width: (Dimensions.get('window').width) * 0.35 - 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: '100%', width: '100%', borderRadius: 8, resizeMode: "cover" }} source={require('@images/about_2.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setModalVisibleCreateEvent(!this.state.modalVisibleCreate, require('@images/about_3.jpg'))} style={{ height: (Dimensions.get('window').width) * 0.35 - 10, width: (Dimensions.get('window').width) * 0.35 - 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: '100%', width: '100%', borderRadius: 8, resizeMode: "cover" }} source={require('@images/about_3.jpg')} />
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
                    <Text style={[styles1.aboutText, { marginTop: 8 }]}> </Text>
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
                                latitude: this.state.content.create_location.latitude,
                                longitude: this.state.content.create_location.longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: this.state.content.create_location.latitude,
                                    longitude: this.state.content.create_location.longitude,
                                }}>
                            </Marker>
                        </MapView>
                    </View>
                </View>

            </View>
        )
    }
    _HostedBy() {
        const { creator } = this.state
        return (
            <View style={{ width: '100%', backgroundColor: '#ffffff' }}>
                <View style={[styles1.aboutHeadingView]}>
                    <Text style={styles1.headingText}>Hosted By</Text>
                </View>
                <View style={{ alignItems: 'center', paddingHorizontal: 16, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{uri: creator.profile}} style={{ height: 48, width: 48, borderRadius: 24, }} />
                        <View style={{ marginLeft: 8 }}>
                            <Text style={[styles.cartText, { fontSize: RFValue(14.96), marginLeft: 7, color: '#000' }]}>{creator.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ height: 16, width: 16 }} source={require('@images/star.png')} />
                                <Text style={[styles.relatedEventsTitle, { fontSize: RFValue(14.96), color: '#000000' }]}>4.9(48)</Text>
                            </View>
                        </View>
                    </View>
                    <Image source={require('@images/right_arrow.png')} style={{ height: 16, width: 16, }} />
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
                    colors={['#5BBDFB', '#8484FA']} style={styles1.buttoncontainer}
                    disabled={this.state.participated} 
                    onClick={() => { this._participateEvent()}}
                    />
            </View>
        </View>)
    }
    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 50
        };
        const { story } = this.state;
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: Platform.OS == 'ios' ? Dimensions.get('screen').height * 1.7 / 2.5 : Dimensions.get('screen').height * 1.2 / 3.3 }}>
                        <Swiper
                            dotColor='#cbcbcb'
                            activeDotColor='#ffffff'
                            activeDotStyle={{ borderWidth: 2, borderColor: '#cbcbcb', width: 12, height: 12, borderRadius: 6 }}
                            showsButtons={false}>
                            {
                                this.state.story.map((item) => {
                                    if (item.fileType == 'image') {
                                        return (
                                            <View style={{width: '100%', height: '100%'}}>
                                                <Image 
                                                    source={{uri: item.story}}
                                                    style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}
                                                    resizeMode={'cover'}
                                                />
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
                                                            <TouchableOpacity onPress={() => {this._toggleLiked()}}>
                                                                <Icon name={this.state.liked ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#fff' }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    } else {
                                        return (
                                            <View style={{width: '100%', height: '100%'}}>
                                                <Video 
                                                    style={{position: 'absolute', left: 0, top: 0, bottom: 0, right: 0}}
                                                    source={{uri: item.story}}
                                                    muted={false}
                                                    repeat={true}
                                                    resizeMode={'cover'}
                                                ></Video>
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
                                                            <TouchableOpacity onPress={() => {this._toggleLiked()}}>
                                                                <Icon name={this.state.liked ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#fff' }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }
                                })
                                //this._reanderStory1(this.state.story[])    
                            }
                        </Swiper>
                        {/* <Swiper 
                            loadMinimal loadMinimalSize={1} style={comStyles.wrapper} loop={false} onIndexChanged={(index) =>{this._newItemLoadStart(index)}}
                            dotColor='#cbcbcb'
                            activeDotColor='#ffffff'
                            activeDotStyle={{ borderWidth: 2, borderColor: '#cbcbcb', width: 12, height: 12, borderRadius: 6 }}
                            showsButtons={false}
                            >
                        {
                            this.state.story.length >0 ?
                            this.state.story.map((item, i) => <Slide
                            loadHandle={this.loadHandle}
                            loaded={!!this.state.storyLoaded}
                            uri={item.story}
                            i={i}
                            muted={false}
                            type={item.fileType}
                            key={i} />)
                            : []
                        }
                        </Swiper> */}
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
                            <Text style={[styles.descText, { color: '#6CA7FB', fontSize: RFValue(19.04) }]}>{this.state.content.value}{this.state.content.currency}</Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'center', width: '100%', alignSelf: 'center', backgroundColor: '#ffffff'
                    }}>
                        <View style={{ marginTop: 15, marginBottom: 5, paddingHorizontal: 20, justifyContent: 'center' }}>
                            <Text style={{ fontSize: RFValue(14.28), color: '#6CA7FB', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>{this.state.content.category}</Text>
                        </View>
                        <View style={{ width: '100%', paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: RFValue(23.8), color: 'black', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>{this.state.content.event_title}</Text>
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
    // user: state.user,
    // eventDetail: state.eventDetail
})
export default connect(mapStateToProps)(eventDetailscreen);