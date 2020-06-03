import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    SectionList,
    TextInput,
    FlatList
} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { Header, Icon, CheckBox } from 'native-base';
// import { Actions } from 'react-native-router-flux';
import testData from '../../../../assets/dumydata'
import _ from 'lodash';
import navigationService from '../../../../navigation/navigationService';
import screens from '../../../../constants/screens';
// import update from 'immutability-helper';

export default class AddEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: '',
            longitude: '',
            categories: _.cloneDeep(testData.categories),
            originalCategories: _.cloneDeep(testData.categories),
        }
    }
    _search(search, image) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
           
            let cityName = "";

            var request1 = new XMLHttpRequest();
            request1.onreadystatechange = (e) => {
                if (request1.readyState !== 4) {
                    return;
                }

                if (request1.status === 200) {
                    
                    let result = JSON.parse(request1.responseText);
                    if (result.results.length > 0) {
                            var data = []
                            result.results.map((item, index) => {
                                if (item.types.includes(search)) {
                                    console.log('Item', item.types[0])
                                    var image = item.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=YOURKEY` : 'https://firebasestorage.googleapis.com/v0/b/new-2oui.appspot.com/o/images%2F1558429895907.jpg?alt=media&token=7149ed83-1841-44fd-a0e0-7311d0d28366'
                                    var data1 = {
                                        location: item.geometry.location,
                                        placeId: item.place_id,
                                        image: image,
                                        title: item.name,
                                        address: item.vicinity,
                                        star_img: require('@images/star.png'),
                                        rating: item.rating,
                                        view: item.user_ratings_total,
                                        id: (index + 1) + '.',
                                        titleColor: 'rgb(239,113,184)',
                                        category: search.toUpperCase(),
                                    }
                                    data.push(data1)
                                }
                            })
                            console.log('data', data)
                            // Actions.SearchEvent({image:image, searchData: data, location: { lat: this.state.latitude, long: this.state.longitude }, city: cityName})
                            navigationService.navigate(screens.SEARCH_EVENT, {image:image, searchData: data, location: { lat: this.state.latitude, long: this.state.longitude }, city: cityName});
                        }
                } else {
                    console.warn('error');
                }
            };
            
            var request = new XMLHttpRequest();
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    console.log('Reverse Geocoding === ', request.response);
                    let result = JSON.parse(request.responseText);
                    if (result.results.length > 0) {
                        let firstAdress = result.results[0];
                        firstAdress.address_components.forEach(element => {
                            if (element.types[0] == 'locality' && element.types[1] == 'political') {
                                cityName = element.long_name;
                            }
                        });
                    }
                    request1.open('GET', `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=1000&type=${search}&key=YOURKEY`);
                    request1.send();
                } else {
                    request1.open('GET', `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=1000&type=${search}&key=YOURKEY`);
                    request1.send();
                    console.warn('City getting error', e);
                }
            };

            request.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=YOURKEY`);
            request.send();

            

            


            
        },
            err => console.log('Location error', err),
        )
    }
    _changeSearchText = (text) => {
        const { originalCategories } = this.state
        let categoryData = JSON.parse(JSON.stringify(originalCategories));
        let result = categoryData.filter((item) => {
            let content = item.data.filter((contentItem) => {
                const nameData = contentItem.name.toLowerCase();
                if (nameData.indexOf(text.toLowerCase()) > -1) {
                    return contentItem;
                }
            })

            
            if (content.length > 0) {
                item.data = content;
                return content;
            } else {
                item.data = [];
            }
        })

        if(result.length > 0) {
            this.setState({categories: result});
        } 
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                <View style={styles.subContainerView}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}>
                            <View style={{ alignSelf: 'flex-start' }}>
                                <TouchableOpacity style={styles.backView}
                                    onPress={() => navigationService.pop()}>
                                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headerText}>Step 1 of 5</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '90%', alignSelf: 'center', marginTop: 10 }}>
                            <Text style={{ color: '#000', fontSize: RFValue(20.4), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Find a place</Text>
                        </View>
                        <View style={styles.searchinputcontainer}>
                            <Icon name='search1' type='AntDesign' style={{ color: '#a8a7b5', fontSize: 20 }} />
                            <TextInput
                                style={styles.text}
                                placeholder='Search'
                                placeholderTextColor='#a8a7b5'
                                autoCorrect={false}
                                keyboardType='default'
                                onChangeText={(text) => {this._changeSearchText(text)}}
                            />
                        </View>
                    </View>
                    <View>
                        <SectionList
                            extraData={this.state}
                            contentContainerStyle={{ paddingBottom: '50%' }}
                            sections={this.state.categories}
                            stickySectionHeadersEnabled={false}
                            renderSectionHeader={({ section }) =>
                                <View style={{ padding: 25, width: '100%', }}>
                                    <Text style={styles.categoryText}>{section.title}</Text>
                                </View>
                            }
                            renderItem={({ item, index, section }) =>
                                <TouchableOpacity onPress={() => this._search(item.value, item.image)} style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                                    <View style={styles.cartcontainer}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ height: 50, width: 50, borderRadius: 18 }} source={item.image} />
                                            <Text style={styles.itemText}>{item.name}</Text>
                                        </View>
                                        <View style={{ right: 10, }}>
                                            <Icon name='angle-right' type='FontAwesome' style={{ color: 'grey', fontSize: 25 }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                        {/* <FlatList 
                            data={this.state.categories[0].data}
                            renderItem={
                                ({ item, index }) =>
                                <TouchableOpacity onPress={() => this._search(item.value, item.image)} style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                                    <View style={styles.cartcontainer}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ height: 50, width: 50, borderRadius: 18 }} source={item.image} />
                                            <Text style={styles.itemText}>{item.name}</Text>
                                        </View>
                                        <View style={{ right: 10, }}>
                                            <Icon name='angle-right' type='FontAwesome' style={{ color: 'grey', fontSize: 25 }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={item => item.name}
                        /> */}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 5
    },
    headerText: {
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#afaebc',
        marginTop: 10,
        marginBottom: 5
    },
    clearText: {
        height: 40,
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#9246e6',
        marginTop: 18
    },
    categoryText: {
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000'
    },
    itemText: {
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000',
        paddingLeft: 15
    },
    cartcontainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchinputcontainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f3f5',
        height: 40,
        width: '90%',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginBottom: 15
    },
    text: {
        width: '85%',
        height: 40,
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        marginLeft: 5,
        color: '#a8a7b5'
    },
});
