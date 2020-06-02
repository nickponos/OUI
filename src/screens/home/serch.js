import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    Dimensions,
    FlatList,
    ImageBackground,
    TextInput
} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon, Header } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize"
// import { fetchEventSimpleSearchResult } from '../../controllers/eventSearch';
import navigationService from '../../navigation/navigationService';
import screens from '../../constants/screens';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            relatedEvents: [
                {
                    image: require('../../assets/images/event_4.jpg'),
                    category: 'Restaurant',
                    title: 'Epicurean brunch in the hear of Paris',
                    titleColor: 'rgb(255,146,121)',
                    date: '12 April',
                    time: '18:00 UTC+2',
                    eventManager: {
                        name: 'Aasiya',
                        image: require('../../assets/images/user_10.jpg')
                    },
                    price: '350$'
                },
                {
                    image: require('../../assets/images/event_5.jpg'),
                    category: 'Sport',
                    title: 'Friendly golf tournament',
                    titleColor: 'rgb(239,113,184)',
                    date: '27 - 31 July',
                    time: '11:00 UTC+2',
                    eventManager: {
                        name: 'Thomasson',
                        image: require('../../assets/images/user_5.jpg')
                    },
                    price: '80$'
                },
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
                    image: require('../../assets/images/event_7.jpg'),
                    category: 'Health',
                    title: 'Spa Day for mums, sisters, daughters &...',
                    titleColor: 'rgb(108,171,247)',
                    date: '20 June',
                    time: '10:00 UTC+2',
                    eventManager: {
                        name: 'Alicia',
                        image: require('../../assets/images/user_3.jpg')
                    },
                    price: '400$'
                },
                {
                    image: require('../../assets/images/event_5.jpg'),
                    category: 'Sport',
                    title: 'Friendly golf tournament',
                    titleColor: 'rgb(239,113,184)',
                    date: '27 - 31 July',
                    time: '11:00 UTC+2',
                    eventManager: {
                        name: 'Thomasson',
                        image: require('../../assets/images/user_5.jpg')
                    },
                    price: '80$'
                },
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
            ]
        }
    }

    static getDerivedStateFromProps (props, state) {
        console.log("Event Search Result = ", props.result)
    }

    _search = (text) => {
        this.setState({ search: text });
        const { dispatch } = this.props;
        // dispatch(fetchEventSimpleSearchResult(text));
    }

    _relatedEvents() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        return (
            <View style={{ width: '100%', marginTop: 15, paddingHorizontal: 12 }}>
                <Text style={styles.headingText}>Related events</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    data={this.state.relatedEvents}
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
                                            <Image source={require('../../assets/images/saved.png')} style={{ height: 16, width: 18, tintColor: index % 2 != 0 ? '#f05d87' : null }} />
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
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ width: '100%', backgroundColor: 'white', justifyContent: 'space-between' }}>
                    <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                    <View style={styles.searchView}>
                        <TouchableOpacity style={{ marginHorizontal: 8 }} onPress={() => navigationService.pop()}>
                            <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                        </TouchableOpacity>
                        <View style={styles.searchinputcontainer}>
                            <Icon name='search1' type='AntDesign' style={{ color: '#a8a7b5', fontSize: 18 }} />
                            <TextInput
                                style={{ paddingLeft: 4, flex: 1 }}
                                placeholder='Search'
                                autoCorrect={false}
                                keyboardType='default'
                                onChangeText={(text) => { this._search(text) }}
                                ref={component=> { this.searchInput = component } }
                            />
                            <TouchableOpacity
                                onPress={() => {this.searchInput.clear()}}
                                style={{justifyContent: 'center', alignItems: 'center', marginRight: 5}}
                            >
                                <Image source={require('@images/error.png')} style={{ height: 16, width: 16}} />
                            </TouchableOpacity>
                            
                        </View>
                        <TouchableOpacity
                            onPress={() =>{navigationService.pop()}}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={[styles.searchView1]}>
                    <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ fontSize: RFValue(17), color: '#8a42e8', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', textAlign: 'left', marginLeft: 15 }}>Bordeaux -59 km  </Text>
                        <Icon name='ios-arrow-down' type='Ionicons' style={{ color: '#8a42e8', marginBottom: 2 }} />
                    </View>
                    <TouchableOpacity onPress={() => navigationService.navigate(screens.MAP)} style={{ padding: 2 }}><Image source={require('@images/map.png')} style={{ height: 25, width: 25, tintColor: "#8a42e8" }} /></TouchableOpacity>
                    <TouchableOpacity style={{ padding: 2 }} onPress={() => navigationService.navigate(screens.FILTER)}><Image source={require('@images/filter.png')} style={{ height: 25, width: 25, tintColor: "#8a42e8" }} /></TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {this._relatedEvents()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    searchView1: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    searchinputcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f3f5',
        height: 40,
        width: '65%',
        borderRadius: 12,
        paddingLeft: 10,
        // marginTop: 12
    },
    artContainer: {
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
    cartText: {
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    },
    descText: {
        fontSize: RFValue(19.04),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 30,
        width: 100,
        // borderRadius: 15,
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
        fontSize: RFValue(14.96),
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
    // user: state.session.user,
    // user: state.user,
    // result: state.eventSearch
    
})
export default connect(mapStateToProps)(Search);
