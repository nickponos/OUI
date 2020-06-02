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
    SafeAreaView,
    TextInput
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { Actions } from 'react-native-router-flux';
import { Icon, Header } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import navigationService from '../../../navigation/navigationService';
import screens from '../../../constants/screens';

const sc_width = Dimensions.get('window').width * 0.95
export default class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            relatedEvents: [
                {
                    image: require('../../../assets/images/event_3.jpg'),
                    category: 'Movies',
                    title: 'Cinema Studio',
                    titleColor: '#EC6EBA',
                    date: '12 April',
                    time: '18:00 UTC+2',
                    eventManager: {
                        name: 'Aasiya',
                        image: require('../../../assets/images/user_10.jpg')
                    },
                    price: '350$'
                },
                {
                    image: require('../../../assets/images/event_4.jpg'),
                    category: 'Restaurant',
                    title: 'Japanese Restaurant',
                    titleColor: '#FC876A',
                    date: '27 - 31 July',
                    time: '11:00 UTC+2',
                    eventManager: {
                        name: 'Thomasson',
                        image: require('../../../assets/images/user_5.jpg')
                    },
                    price: '80$'
                },
                {
                    image: require('../../../assets/images/event_9.jpg'),
                    category: 'Travel',
                    title: 'Paris panisula Hotel',
                    titleColor: '#527FC0',
                    date: '4 May',
                    time: '14:00 UTC+2',
                    eventManager: {
                        name: 'Izabella',
                        image: require('../../../assets/images/user_9.jpg')
                    },
                    price: '150$'
                },

            ]
        }
    }
    _relatedEvents() {
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey' }} />
        return (
            <View style={{ width: '100%' }}>
                <FlatList
                    horizontal
                    contentContainerStyle={{ paddingTop: 10 }}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.relatedEvents}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={styles.card}>
                            <View style={styles.cartContainer}>
                                <View style={{ height: 120, width: sc_width }}>
                                    <Image resizeMode='cover' source={item.image}
                                        style={{ height: 120, width: sc_width, borderRadius: 12 }} />

                                    <Image source={require('../../../assets/images/saved.png')} style={{ position: 'absolute', top: 12, right: 12, height: 16, width: 18, tintColor: index % 2 != 0 ? '#f05d87' : null }} />
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
                                        <Text style={[styles.cartText, { color: item.titleColor, paddingBottom: 5,paddingRight:4 }]}>{item.category.toLocaleUpperCase()}</Text>
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
        return (
            <View style={styles.container}>
                <Header style={{ width: '100%', flexDirection: 'row', backgroundColor: 'white', }}>
                    <View style={styles.searchView}>
                        <TouchableOpacity style={styles.backView} onPress={() => navigationService.pop()}>
                            <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                        </TouchableOpacity>
                        <View style={styles.searchinputcontainer}>
                            <Icon name='search1' type='AntDesign' style={{ color: '#a8a7b5', fontSize: 20 }} />
                            <TextInput
                                style={styles.text}
                                placeholder='Search'
                                autoCorrect={false}
                                keyboardType='default'
                                onChangeText={(text) => { this.setState({ search: text }) }}
                            />
                        </View>
                        <TouchableOpacity style={{ padding: 2 }} onPress={() => navigationService.navigate(screens.FILTER)}><Image source={require('../../../assets/images/filter.png')} style={{ height: 25, width: 25 }} /></TouchableOpacity>
                        {/* <Icon name='location' type='Entypo' style={{color:'#8a42e8'}}/> */}
                        {/* <Icon name='filter' type='FontAwesome5' style={{color:'#8a42e8'}}/> */}
                    </View>
                </Header>
                <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                {/* <SafeAreaView style={styles.container}> */}
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                        flex: 1,
                        width: '100%'
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
                        <ImageBackground source={require('../../../assets/images/eventmarker.png')} style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>350$</Text>
                        </ImageBackground>
                    </Marker>
                    <Marker
                        coordinate={{
                            latitude: 44.163343829,
                            longitude: -77.379841188,
                        }}>
                        <ImageBackground source={require('../../../assets/images/orangepinpoint.png')} style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: 10 }}>80$</Text>
                        </ImageBackground>
                    </Marker>
                    <Marker
                        coordinate={{
                            latitude: 44.16435,
                            longitude: -77.37985,
                        }}>
                        <ImageBackground source={require('../../../assets/images/pricemarker.png')} style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: 10 }}>150$</Text>
                        </ImageBackground>
                    </Marker>
                </MapView>
                <View style={{ width: '100%', position: 'absolute', bottom: 0, backgroundColor: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
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
        //backgroundColor: '#F5FCFF',
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
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        //padding: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    searchinputcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f3f5',
        height: 40,
        width: '75%',
        borderRadius: 12,
        paddingLeft: 10,
        // marginTop: 12
    },
    cartText: {
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    },
    descText: {
        fontSize: RFValue(19.04),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },

    text: {
        width: '85%',
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        marginLeft: 5,
        color: '#a8a7b5'
    },
    backView: {
        width: 30,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: sc_width,
        borderRadius: 12,
        elevation: 0.7,
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        flex: 1,
        margin: 8,
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
