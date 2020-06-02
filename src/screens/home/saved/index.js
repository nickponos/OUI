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
    Dimensions,
    ImageBackground,
    Animated,
    ToastAndroid
} from 'react-native';
import { Icon } from 'native-base'
// import { Actions } from 'react-native-router-flux';
import { RFValue } from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';
import People from '../../../components/peopleFirstStyle'
import PeopleSecond from '../../../components/peopleSecondStyle';
import testData from '../../../assets/dumydata'
import Scroller from "../scroller";
import Button from '../../../components/button'
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import navigationService from '../../../navigation/navigationService';
import screens from '../../../constants/screens';

export default class Saved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter_distance: [1, 70],
            searchFocused: false,
            animatedSearch: new Animated.Value(0),
            height: new Animated.Value(0),
            peopleSearchResult: [],
            clicks: 0,
            filterCLicks: 0,
            profilClicks: 0,
            animation: new Animated.Value(0),
            events: [
                {
                    image: require('../../../assets/images/event_1.jpg'),
                    category: 'Travel',
                    title: 'Trip to Plam Shores Beaches',
                    titleColor: 'rgb(108,171,247)',
                    date: '27 - 31 July',
                    time: '11:00 UTC+2',
                    eventManager: {
                        name: 'Anje',
                        image: require('../../../assets/images/user_5.jpg')
                    },
                    price: '2000$'
                },
                {
                    image: require('../../../assets/images/event_7.jpg'),
                    category: 'SCIENCE',
                    title: 'IE: Mysteries of the Mind',
                    titleColor: 'rgb(239,113,184)',
                    date: '31 July',
                    time: '9:00 UTC+2',
                    eventManager: {
                        name: 'Leo',
                        image: require('../../../assets/images/user_3.jpg')
                    },
                    price: '400$'
                },
                {
                    image: require('../../../assets/images/event_4.jpg'),
                    category: 'Restaurant',
                    title: 'Epicurean brunch in the hear of Paris',
                    titleColor: 'rgb(255,146,121)',
                    date: '12 April',
                    time: '18:00 UTC+2',
                    eventManager: {
                        name: 'Fernan',
                        image: require('../../../assets/images/user_10.jpg')
                    },
                    price: '350$'
                },
                {
                    image: require('../../../assets/images/event_6.jpg'),
                    category: 'Art',
                    title: 'Art Club: Introduction to Painting',
                    titleColor: 'rgb(239,113,184)',
                    date: '4 May',
                    time: '14:00 UTC+2',
                    eventManager: {
                        name: 'Izabella',
                        image: require('../../../assets/images/user_9.jpg')
                    },
                    price: '150$'
                },
            ],
            peoples: [
                {
                    name: 'Virendra',
                    age: 21,
                    prof: 'Journalist',
                    dist: '25km',
                    image: require('../../../assets/images/user_6.jpg'),
                },
                {
                    name: 'Izabella',
                    age: 22,
                    prof: 'Veterinarian',
                    dist: '40km',
                    image: require('../../../assets/images/user_9.jpg'),
                },
                {
                    name: 'Adaora',
                    age: 21,
                    prof: 'Archeologist',
                    dist: '61km',
                    image: require('../../../assets/images/user_8.jpg'),
                },
                {
                    name: 'jack',
                    age: 25,
                    prof: 'Veterinarian',
                    dist: '40km',
                    image: require('../../../assets/images/user_1.jpg'),
                },
            ],
            peoples1: [
                {
                    name: 'Adaora',
                    age: 21,
                    prof: 'Archeologist',
                    dist: '61km',
                    image: require('../../../assets/images/user_8.jpg'),
                }
            ],
        }
        this.searchRef = React.createRef();
    }

    handleOpen = () => {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    handleClose = () => {
        Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    _events() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        if (this.state.events.length > 0) {
            return (
                <View style={{ width: '100%', marginTop: 5, alignItems: 'center' }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ alignItems: 'center', paddingBottom: '35%' }}
                        data={this.state.events}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.relatedEventsMainView}>
                                <View style={styles.relatedEventsCardView}>
                                    <View style={{ width: '35%' }}>
                                        <Image source={item.image} style={{ height: 125, width: '100%' }} />
                                    </View>
                                    <View style={styles.relatedEventsDetailsView}>
                                        <View style={{ width: '100%' }}>
                                            <View style={styles.relatedEventsCategoryView}>
                                                <Text style={[styles.relatedEventsCategoryText, { color: item.titleColor }]}>{item.category.toLocaleUpperCase()}</Text>
                                                <Image source={require('../../../assets/images/saved.png')} style={{ height: 16, width: 18, tintColor: index % 2 != 0 ? '#f05d87' : null }} />
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
                            </View>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.noDataView}>
                    <Text style={styles.noDataText1}>No saved events yet</Text>
                    <Text style={styles.noDataText2}>Tap on the empty heart to save your favorites </Text>
                </View>
            )
        }
    }
    _peoples() {
        if (this.state.peoples.length > 0) {
            return (
                <View style={{ width: '100%', marginTop: 5 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: '35%' }}
                        data={this.state.peoples}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.card}>
                                <View style={[styles.cartContainer]}>
                                    <ImageBackground source={item.image} style={{ height: 350, width: '100%', }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                                            <TouchableOpacity >
                                                <Icon name='close' type='MaterialIcons' style={{ color: '#fff', }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setState(state => (this.state.peoples[index].like = !this.state.peoples[index].like, state))}>
                                                <Icon name={this.state.peoples[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#fff' }} />
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>

                                    <View style={{ width: '100%', padding: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>{(item.name)}</Text>
                                                <Text style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>,</Text>
                                                <Text style={[styles.descText, { paddingBottom: 5, paddingLeft: 5, color: '#000' }]}>{item.age}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5' }]}>{(item.prof)}</Text>
                                                <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', paddingHorizontal: 5 }]}>.</Text>
                                                <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5' }]}>{item.dist}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={[styles.buttoncontainer]}>
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                                                <Icon name='plus' type='Entypo' style={{ color: '#fff', fontSize: 20, right: 5 }} />
                                                <Text style={{ color: 'white', fontSize: 18, fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Invite</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.noDataView}>
                    <Text style={styles.noDataText1}>No saved people yet</Text>
                    <Text style={styles.noDataText2}>Tap on the empty heart to save your favorites </Text>
                </View>
            )
        }

    }
    _SearchPart = () => {
        if (this.state.peoples.length > 0) {
            return (
                <View style={{ width: '100%', marginTop: 5 }}>
                    <View style={[styles.searchView]}>
                        <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: RFValue(17), color: '#8a42e8', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'left', marginLeft: 15 }}>Go to fast mode  </Text>
                            <Icon name='angle-right' type='FontAwesome' style={{ color: '#8a42e8', marginBottom: 2 }} />
                        </View>

                        <TouchableOpacity onPress={() => navigationService.navigate(screens.MAP)} style={{ padding: 2 }}><Image source={require('../../../assets/images/map.png')} style={{ height: 25, width: 25, tintColor: "#8a42e8" }} /></TouchableOpacity>
                        <TouchableOpacity style={{ padding: 2 }} onPress={() => { this.handleOpen() }}><Image source={require('../../../assets/images/filter.png')} style={{ height: 25, width: 25, tintColor: "#8a42e8" }} /></TouchableOpacity>
                        {/* <Icon name='location' type='Entypo' style={{color:'#8a42e8'}}/> */}
                        {/* <Icon name='filter' type='FontAwesome5' style={{color:'#8a42e8'}}/> */}
                    </View>
                    <ScrollView style={{ marginBottom: 180 }}>

                        <PeopleSecond
                            onPress={(image, name, prof) => navigationService.navigate(screens.PROFILE, { image, name, prof })}
                            title="People in bordeaux"
                            peoples={this.state.peoples1}
                        />
                        <PeopleSecond
                            onPress={(image, name, prof) => navigationService.navigate(screens.PROFILE, { image, name, prof })}
                            title="Mayb you can be interested"
                            peoples={this.state.peoples}
                        />
                        <TouchableOpacity style={{ width: '100%', marginVertical: 20 }} onPress={() => { }}>
                            <Text style={{ color: '#9246e6', textAlign: 'center' }}>More related people</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

            )
        } else {
            return (
                <View style={styles.noDataView}>
                    <Text style={styles.noDataText1}>No saved people yet</Text>
                    <Text style={styles.noDataText2}>Tap on the empty heart to save your favorites </Text>
                </View>
            )
        }

    }
    _search(search) {
        var peopleSearchResult = []
        if (search) {
            peopleSearchResult = this.state.peoples.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
            this.setState({ peopleSearchResult: peopleSearchResult, searchText: search })
        }
        else {
            this.setState({ peopleSearchResult: [] })
        }
    }
    _searchList() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
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

                </View>
            </ScrollView>
        )
    }
    render() {
        const screenHeight = Dimensions.get("window").height;
        const { searchText, searchSuggestions } = this.state;
        const backdrop = {
            transform: [
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 0.01],
                        outputRange: [screenHeight, 0],
                        extrapolate: "clamp",
                    }),
                },
            ],
            opacity: this.state.animation.interpolate({
                inputRange: [0.01, 0.5],
                outputRange: [0, 1],
                extrapolate: "clamp",
            }),
        };
        const slideUp = {
            transform: [
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0.01, 1],
                        outputRange: [0, -1 * screenHeight],
                        extrapolate: "clamp",
                    }),
                },
            ],
        };

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <View style={styles.subContainerView}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>People</Text>
                        <View style={[styles.searchinputcontainer]}>
                            <TextInput
                                style={styles.text}
                                placeholder='Search'
                                autoCorrect={false}
                                keyboardType='default'
                                onChangeText={(searchText) => this._search(searchText)}
                            />
                            <Icon name='search1' type='AntDesign' style={{ color: '#a8a7b5', fontSize: 20 }} />
                        </View>
                    </View>
                    <View style={styles.bottomBorderView}>
                        <View style={styles.btnView}>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 0 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 0 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 0 ? '#fff' : '#000' }]}>Search</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 1 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 1 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 1 ? '#fff' : '#000' }]}>Following</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ clicks: 2 }) }} style={[styles.eventBtn, { backgroundColor: this.state.clicks == 2 ? '#9246e6' : 'transparent' }]}>
                                <Text style={[styles.eventTxt, { color: this.state.clicks == 2 ? '#fff' : '#000' }]}>Follower</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.peopleSearchResult.length > 0 ?
                        this._searchList() :
                        this.state.clicks == 0 ? this._SearchPart() : this.state.clicks == 1 ? this._peoples() : this._peoples()
                    }

                </View>
                <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
                    <View style={[styles.sheet]}>
                        <Animated.View style={[styles.popup, slideUp]}>
                            <ScrollView style={{ height: Dimensions.get('window').height * 0.7, width: '100%' }}>
                                <View style={{ flex: 1, padding: 16 }}>
                                    <View style={{ alignItems: 'center', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        < TouchableOpacity onPress={this.handleClose} >
                                            <Text style={{ color: '#8943EE', fontSize: RFValue(17) }}>Close</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: 'black', fontSize: RFValue(19.04) }}>Filter</Text>
                                        < TouchableOpacity onPress={this.handleClose} >
                                            <Text style={{ color: 'gray', fontSize: RFValue(17) }}>Done</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 16, alignItems: 'center', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'black', fontSize: RFValue(20.4) }}>Location</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: '#8943EE', fontSize: RFValue(17) }}>Bruges</Text>
                                            <Image style={{ height: 12, width: 12, marginLeft: 6 }}
                                                source={require('../../../assets/images/navigation.png')} />
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 16, width: '100%' }}>
                                        <Text style={{ color: 'black', fontSize: RFValue(20.4) }}>See profils</Text>
                                        <View style={{ marginTop: 8, paddingVertical: 10 }}>
                                            <View style={styles.btnViewFilter}>
                                                <TouchableOpacity onPress={() => { this.setState({ profilClicks: 0 }) }} style={[styles.eventBtn, { backgroundColor: this.state.profilClicks == 0 ? '#9246e6' : 'transparent' }]}>
                                                    <Text style={[styles.eventTxt, { color: this.state.profilClicks == 0 ? '#fff' : '#000' }]}>Male</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { this.setState({ profilClicks: 1 }) }} style={[styles.eventBtn, { backgroundColor: this.state.profilClicks == 1 ? '#9246e6' : 'transparent' }]}>
                                                    <Text style={[styles.eventTxt, { color: this.state.profilClicks == 1 ? '#fff' : '#000' }]}>Female</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { this.setState({ profilClicks: 2 }) }} style={[styles.eventBtn, { backgroundColor: this.state.profilClicks == 2 ? '#9246e6' : 'transparent' }]}>
                                                    <Text style={[styles.eventTxt, { color: this.state.profilClicks == 2 ? '#fff' : '#000' }]}>Both</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 16, width: '100%' }}>
                                        <Text style={{ color: 'black', fontSize: RFValue(20.4) }}>Filter</Text>
                                        <View style={[{ marginTop: 8, paddingVertical: 10 }]}>
                                            <View style={styles.btnViewFilter}>
                                                <TouchableOpacity onPress={() => { this.setState({ filterCLicks: 0 }) }} style={[styles.eventBtn, { backgroundColor: this.state.filterCLicks == 0 ? '#9246e6' : 'transparent' }]}>
                                                    <Text style={[styles.eventTxt, { color: this.state.filterCLicks == 0 ? '#fff' : '#000' }]}>All</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { this.setState({ filterCLicks: 1 }) }} style={[styles.eventBtn, { backgroundColor: this.state.filterCLicks == 1 ? '#9246e6' : 'transparent' }]}>
                                                    <Text style={[styles.eventTxt, { color: this.state.filterCLicks == 1 ? '#fff' : '#000' }]}>Online</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { this.setState({ filterCLicks: 2 }) }} style={[styles.eventBtn, { backgroundColor: this.state.filterCLicks == 2 ? '#9246e6' : 'transparent' }]}>
                                                    <Text style={[styles.eventTxt, { color: this.state.filterCLicks == 2 ? '#fff' : '#000' }]}>New</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 16, width: '100%' }}>
                                        <Text style={{ color: 'black', fontSize: RFValue(20.4) }}>Age</Text>
                                        <Text style={{ marginTop: 16, color: 'black', fontSize: RFValue(16.32) }}>18 - 32 y.o.</Text>
                                        <MultiSlider
                                            values={[this.state.filter_distance[0], this.state.filter_distance[1]]}
                                            min={1}
                                            max={150}
                                            onValuesChange={(value) => this.setState({ filter_distance: value })}
                                            sliderLength={Dimensions.get('window').width * 0.85}
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
                                                height: 3,
                                                backgroundColor: "red",
                                            }}
                                            markerStyle={{
                                                height: 20,
                                                width: 20,
                                                borderRadius: 10,
                                                backgroundColor: '#9246e6',
                                                borderWidth: 0.5,
                                                borderColor: '#9246e6',
                                                marginTop: 6
                                            }}
                                            touchDimensions={{
                                                height: 40,
                                                width: 40,
                                                borderRadius: 20,
                                                slipDisplacement: 40,
                                            }}
                                        />
                                    </View>
                                    <View style={styles.buttonView}>
                                        <Button buttonText='Apply' onClick={() => { }} colors={['#a65ae1', '#8a4cea']} style={{ width: '100%' }} />
                                    </View>
                                </View>
                            </ScrollView>
                        </Animated.View>
                    </View>
                </Animated.View>
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    cover: {
        backgroundColor: "rgba(0,0,0,.5)",
    },
    sheet: {
        position: "absolute",
        top: Dimensions.get("window").height,
        left: 0,
        right: 0,
        height: "100%",
        justifyContent: "flex-end",
    },
    popup: {
        backgroundColor: "#FFF",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 80,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
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
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        marginTop: 15,
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
        fontSize: RFValue(10.88),
    },
    relatedEventsTitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RFValue(14.96),
        color: 'black'
    },
    relatedEventsSubtitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Light',
        //fontSize: 14, 
        fontSize: RFValue(13.6),
        width: '100%',
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
    card: {
        //backgroundColor:'red',
        borderRadius: 12,
        //elevation: 0.7,
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        margin: 5,
        marginTop: 18,
    },
    cartContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 12,
        elevation: 0.7,
        width: '90%',
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
    noDataView: {
        alignSelf: 'center',
        marginTop: '30%',
        flex: 1,
        width: '95%'
    },
    noDataText1: {
        paddingBottom: 20,
        fontSize: RFValue(20.4),
        color: '#000',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        textAlign: 'center'
    },
    noDataText2: {
        fontSize: RFValue(18.36),
        color: '#d8d7dd',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        textAlign: 'center'
    },
    titleView: {
        marginTop: 25,
        marginBottom: 0,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '90%',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: RFValue(25.84),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000'
    },
    bottomBorderView: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#f2f3f5',
        width: '100%'
    },
    btnView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f3f5',
        borderRadius: 13,
        marginHorizontal: 20
    },
    btnViewFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f3f5',
        borderRadius: 13,
        marginHorizontal: 4
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        width: '100%',
        justifyContent: 'space-between',
    },
    searchinputcontainer: {
        flexDirection: 'row',
        //alignItems: 'center',
        backgroundColor: '#f2f3f5',
        height: 40,
        width: '60%',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-between',
        // marginTop: 12
    },
    text: {
        padding: 0,
        width: '85%',
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        marginLeft: 5,
        color: '#000',
        //  backgroundColor:'red'
    },
    buttonView: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'center'
    },
});
