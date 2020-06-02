import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image,
    Animated,
    Dimensions
} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
// import firebase from 'react-native-firebase';
// import { auth, db, firestore } from '../../components/Firebase';
import { RFValue } from "react-native-responsive-fontsize"
import testdata from '../../assets/dumydata';
import Events from '../../components/testStyle';
import RelativeEvents from '../../components/eventHomeStyles';
import Peoples from '../../components/peopleFirstStyle'
import RelativePeoples from '../../components/peopleSecondStyle';
import EventThird from '../../components/eventThirdStyle'
import EventSecond from '../../components/eventSecondStyle'
// import { readMyStory, readUserStory } from '../../controllers/userStory';
import {readUserStory, takeStoryUser} from '../../model/actions/storyAC';
import {fetchUserStory} from '../../controller/story';
import navigationService from '../../navigation/navigationService';
import screens from '../../constants/screens';
import {initialStoryUsersObserve} from '../../controller/story';

const ScreenWidth = Dimensions.get('window').width;

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: new Animated.Value(0),
            peopleSearchResult: [],
            eventSearchResult: [],
            stories: [],
            events: [],
            eventKeys: [],
            Events_stories: [],
            peoples: testdata.peoples,
            relatedEvents: testdata.relatedEvents,
            categories: testdata.category,
            peoples1: [
                {
                    name: 'Virendra',
                    age: 21,
                    prof: 'Journalist',
                    dist: '25km',
                    image: require('../../assets/images/user_6.jpg'),
                }
            ],
            userStory: [],
            myStoryExist: false,
            storyUsers: [],
            prevStoryUsers: []
        }
    }

    static getDerivedStateFromProps (props, state) {
        
        if (props.story == null || props.user == null)
            return null;
        
        let newStory = props.story;
        let myStoryExist = newStory.myStoryExist;
        let storyUsers = newStory.users;
        
        if (props.story.readMyStory == undefined || props.story.readMyStory == false)
            readMyStory = false;
        else
            readMyStory = true;
        if (state.myStoryExist != myStoryExist || state.prevStoryUsers != storyUsers) {
            console.log("Explore Story = ", props.story, props.user)
            let myData = _.get(storyUsers, [props.user.userId], {});
            let newMyData = {
                userId: myData.userId,
                profile: myData.profile,
                name: 'Your Story',
                read: myData.read,
                timestamp: myData.lastStoryUpdated
            }
            let users = _.map(storyUsers, (item) => {
                let newItem = {
                    userId: item.userId,
                    profile: item.profile,
                    name: item.userId == props.user.userId ? 'Your Story' : item.name,
                    read: item.read,
                    timestamp: item.lastStoryUpdated
                }
                return newItem;
            });
            let newUsers = _.orderBy(users, ['timestamp'], ['desc']);
            let filteredUsers = _.filter(newUsers, function(item) {
                if (item.userId != props.user.userId)
                    return item;
            })
            if (!_.isNil(myData)) {
                filteredUsers.unshift(newMyData);
            }
            return {
                storyUsers: filteredUsers,
                prevStoryUsers: storyUsers,
                myStoryExist: myStoryExist
            }
        } else {
            return null;
        }
    }

    componentDidMount() {

        // var ref = db.ref("Events");
        // ref.on('value', (snapshot) => {
        //     let data = snapshot.val();
        //     if (data) {
        //         this.setState({ events: Object.values(data), eventKeys: Object.keys(data) });
        //     }
        // });

        // var ref_User = db.ref('Story/' + 'Users');
        // ref_User.on('value', (snapshot) => {
        //     let data1 = snapshot.val();
        //     if (data1) {
        //         this.setState({ stories: Object.values(data1) });
        //     }
        // });
        // var ref_story_event = db.ref('Story/' + 'Events');
        // ref_story_event.on('value', (snapshot) => {
        //     let data2 = snapshot.val();
        //     if (data2) {
        //         this.setState({ Events_stories: Object.values(data2) });
        //     }
        // });
        const {dispatch} = this.props;
        dispatch(initialStoryUsersObserve());
    }
    _searchList() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        console.log('result', this.state.peopleSearchResult, this.state.eventSearchResult)
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: '74%' }}>
                <View style={{ alignItems: 'center' }}>
                    {this.state.peopleSearchResult.length > 0 ? <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular', fontSize: RFValue(23.8), color: 'black' }}>People</Text>
                        <TouchableOpacity onPress={() => navigationService.navigate(screens.SEARCH, { data: this.state.peoples })}><Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular', fontSize: RFValue(15.64), color: '#a65ae1' }}>See all</Text></TouchableOpacity>
                    </View> : null}
                    <View style={{ width: '90%', padding: 5 }}>
                        <FlatList
                            extraData={this.state}
                            data={this.state.peopleSearchResult}
                            renderItem={({ item }) =>
                                <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', marginVertical: 10 }}>
                                    <Image source={item.image} style={{ height: 50, width: 50, borderRadius: 25 }} />
                                    <View style={{ paddingLeft: 10 }}>
                                        <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular', fontSize: RFValue(19.04), color: 'black' }}>{item.name}</Text>
                                        <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular', fontSize: RFValue(13.6) }}>{item.prof}</Text>
                                    </View>
                                </View>}
                            keyExtractor={(index) => index.toString()}
                        />
                    </View>
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
        var peopleSearchResult = []
        var eventSearchResult = []
        if (search) {
            peopleSearchResult = this.state.peoples.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
            eventSearchResult = this.state.relatedEvents.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
            this.setState({ peopleSearchResult: peopleSearchResult, eventSearchResult: eventSearchResult })
        }
        else {
            this.setState({ peopleSearchResult: [], eventSearchResult: [] })
        }
        console.log('search Data', peopleSearchResult, eventSearchResult)
    }
    
    _scrolltoTop() {
        this.scrollRef.scrollTo({ y: 0, animated: true })
    }

    _storyClick = (item) => {
        // if (value == 'currentUser') {
        //     // readMyStory()
        //     navigationService.navigate(screens.TESTSTORY_FLOW, {story: item, creator: 'currentUser'})
        //     // Actions.TestStoryFlow();
        // } else {
        //     // readUserStory(value);
        //     navigationService.navigate(screens.TESTSTORY_FLOW, {story: item, creator: 'otherUser'});
        //     // Actions.TestStoryFlow();
        // }
        const {dispatch, user} = this.props;
        console.log("User Story Selected == ", item.userId)
        dispatch(takeStoryUser(item.userId));
        dispatch(fetchUserStory(item.userId));
        dispatch(readUserStory(item.userId));
        navigationService.navigate(screens.TESTSTORY_FLOW);
    }

    render() {
        const { user } = this.props;
        
        const marginTop = this.state.height.interpolate({
            inputRange: [0, 70],
            outputRange: [70, 20],
            extrapolate: 'clamp'
        })

        const searchWidth = this.state.height.interpolate({
            inputRange: [0, 70],
            outputRange: ['100%', '80%'],
            extrapolate: 'clamp'
        })

        const headerHeight = this.state.height.interpolate({
            inputRange: [0, 100],
            outputRange: [120, 70],
            extrapolate: 'clamp'
        })
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                <Animated.View style={{ width: '100%', alignItems: 'center', paddingBottom: 10, borderBottomColor: '#f2f3f5', borderBottomWidth: 1, backgroundColor: '#fff', height: headerHeight }}>
                    <View style={[styles.searchView]}>
                        <View style={{ width: '80%' }}>
                            <Image source={require('../../assets/images/logo.png')} style={{ height: 70, width: 70, tintColor: '#8a42e8' }} />
                        </View>
                        <TouchableOpacity onPress={() => navigationService.navigate(screens.MAP)} style={{ padding: 2 }}>
                            <Image source={require('@images/map.png')} style={{ height: 25, width: 25, tintColor: "#8a42e8" }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 2 }} onPress={() => navigationService.navigate(screens.FILTER)}>
                            <Image source={require('@images/filter.png')} style={{ height: 25, width: 25, tintColor: "#8a42e8" }} />
                        </TouchableOpacity>
                        
                    </View>
                    <Animated.View style={{width: searchWidth, position: 'absolute', top: marginTop, left: 0, justifyContent: 'center', alignItems: 'center', height: 40}}>
                        <View style={{flexDirection: 'row', backgroundColor: '#f5f5f5', height: 40, width: ScreenWidth * 0.7, borderRadius: 10, padding: 10, paddingLeft: 10}}>
                            <Icon name='search1' type='AntDesign' style={{ color: '#a8a7b5', fontSize: 20 }} />
                            <TextInput
                                style={styles.searchText}
                                placeholder='Search'
                                placeholderTextColor='grey'
                                autoCorrect={false}
                                keyboardType='default'
                                onChangeText={(text) => this._search(text)}
                                returnKeyType={'search'}
                                onSubmitEditing={() => {console.log("Submit Editing")}}
                            />
                        </View>
                    </Animated.View>
                </Animated.View>
                {this.state.peopleSearchResult.length > 0 || this.state.eventSearchResult > 0 ?
                    this._searchList() :
                    <ScrollView
                        ref={(ref) => this.scrollRef = ref}
                        scrollEventThrottle={16}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.height } } }])} 
                        showsVerticalScrollIndicator={false}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.storyScroll}>
                            <View style={styles.storyView}>
                                <TouchableOpacity onPress={() => navigationService.navigate(screens.CAMERA)} style={{ alignItems: 'center' }}>
                                    <View style={styles.addStoryContainer}>
                                        <Icon name='camera' type='Entypo' style={{ color: '#101010' }} />
                                    </View>
                                    <Text style={styles.storyText}>Add new</Text>
                                </TouchableOpacity>
                                <View>
                                    {this.state.storyUsers.length > 0 ?
                                        <FlatList
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.storyUsers}
                                            renderItem={({ item, index }) => {
                                                    return <TouchableOpacity onPress={() => {this._storyClick(item)}} style={{ alignItems: 'center', marginLeft: 5 }}>
                                                                <View style={{ padding: 3, borderWidth: 2, borderColor: item.read ? 'transparent' : '#8a42e8', alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}>
                                                                    <Image source={{ uri: item.profile }} style={{ height: 60, width: 60, borderRadius: 30 }} />
                                                                </View>
                                                                <Text numberOfLines={1} style={[styles.storyText, { width: 70, textAlign: 'center' }]}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                }
                                                
                                            }
                                            
                                        /> : null}
                                </View>
                            </View>
                        </ScrollView>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <RelativePeoples
                                // onPress={(image, name, prof) => Actions.Profile({ image, name, prof })}
                                onPress={(image, name, prof) => navigationService.navigate(screens.PROFILE, {image, name, prof})}
                                title="They match with you"
                                peoples={this.state.peoples1}
                            />
                            <Image source={require('../../assets/images/hand.png')} style={{ height: 42, width: 42, position: 'absolute' }} />
                        </View>
                        {this.state.events.length > 0 ?
                            <Events
                                onPress={(eventDetail, index, type) => {
                                    type == 1 ?
                                        // Actions.testEventDetail({ eventDetail, eventID: this.state.eventKeys[index] })
                                        navigationService.navigate(screens.TESTEVENT_DETAIL, { eventDetail, eventID: this.state.eventKeys[index] })
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
                                title="Popular events this week"
                                events={this.state.events}
                                keys={this.state.eventKeys}
                            /> : null}

                        {this.state.events.length > 0 ?
                            <Events
                                onPress={(eventDetail, index, type) => {
                                    type == 1 ?
                                        // Actions.testEventDetail({ eventDetail, eventID: this.state.eventKeys[index] })
                                        navigationService.navigate(screens.TESTEVENT_DETAIL, { eventDetail, eventID: this.state.eventKeys[index] })
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
                                title="Next to you"
                                events={this.state.events} 
                                keys={this.state.eventKeys}
                            /> : null}

                        {this.state.Events_stories.length > 0 ?
                            <EventThird
                                // onPress={(storyDetail) => Actions.testStorydetail({ storyDetail })}
                                onPress={(storyDetail) => navigationService.navigate({ storyDetail })}
                                title="Most views of the week"
                                events={this.state.Events_stories}
                                type="home"
                            />
                            : null}
                        <Peoples
                            // onPress={(image, name, prof) => Actions.Profile({ image, name, prof })}
                            onPress={(image, name, prof) => navigationService.navigate(screens.PROFILE, { image, name, prof })}
                            title="Popular people this week"
                            peoples={this.state.peoples}
                        />
                        <RelativeEvents
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
                            title="Related events"
                            relatedEvents={this.state.relatedEvents}
                        />
                        <RelativePeoples
                            // onPress={(image, name, prof) => Actions.Profile({ image, name, prof })}
                            onPress={(image, name, prof) => navigationService.navigate(screens.PROFILE, { image, name, prof })}
                            title="Related People"
                            peoples={this.state.peoples}
                        />
                        <View style={{ marginTop: 8, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                            title="Most views of the week"
                            relatedEvents={testdata.relatedEvents}
                        />
                        <View style={{ width: 20, height: 20 }} />
                    </ScrollView>
                }
            </SafeAreaView>
        );
    }
}
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    searchinputcontainer: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        height: 40,
        width: '80%',
        borderRadius: 10,
        padding: 10,
    },
    text: {
        width: '85%',
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        marginLeft: 5,
        color: '#a8a7b5'
    },
    searchText: {
        padding: 0,
        paddingLeft: 10,
        width: '85%',
        color: 'black'
    },
    storyView: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    storyScroll: {
        borderColor: '#f2f3f5',
        width: '100%',
        borderBottomWidth: 1,
    },
    addStoryContainer: {
        height: 70,
        width: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f3f5'
    },
    storyText: {
        color: "#000",
        fontSize: RFValue(10.88),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        marginTop: 8
    },
    relatedEventsMainView: {
        alignItems: 'center',
        width: '95%',
        marginVertical: 10,
        elevation: 0.8,
        borderRadius: 15,
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
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
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Light',
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
    headingText: {
        fontSize: RFValue(19.04),
        color: '#000',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        marginLeft: 5
    },
});

const mapStateToProps = state => ({
    user: state.user,
    story: state.story,
})
export default connect(mapStateToProps)(Home);