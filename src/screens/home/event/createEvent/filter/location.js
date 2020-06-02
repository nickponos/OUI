import React, { Component } from 'react';
import {
    Platform, FlatList,StyleSheet, Text, View, SafeAreaView, StatusBar,TextInput, TouchableOpacity } from 'react-native';
import { Icon, CheckBox } from 'native-base'
// import { Actions } from 'react-native-router-flux';
import { RFValue } from "react-native-responsive-fontsize"
import { ListItem } from "react-native-elements";
import navigationService from '../../../../../navigation/navigationService';

export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:this.props.value,
            eventList: [{
                "name": "Search a location",
                "option": ""
            }]
        }
    }
    _location(location) {
        console.log("location", location)
      //  this.props.event('Location',location)
        navigationService.pop();
    }
    _renderList(title) {
        return (
            <TouchableOpacity onPress={() => this.setState({selected:title},()=>this._location(title))} style={styles.genderSelectioncontainer}>
                <View style={{ flexDirection: 'row',marginLeft:'5%' }}>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View style={{  marginRight:'10%', paddingTop:20,paddingBottom:20 }}>
                    <CheckBox color='#8a4cea' checked={this.state.selected == title ? true : false}/>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                <View style={styles.subContainerView}>
                <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                    <View style={{width:'90%',alignSelf:'center',flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => navigationService.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>Location</Text>
                        <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                    </View>
                    </View>
                    {this._renderList('Any')}
                    {this._renderList('Nearby')}
                    {this._renderList('Bordeaux')}
                    {this._renderList('Paris')}
                    <View style={{ flex: 1 }}>

                        <FlatList
                            data={this.state.eventList}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { }}>
                                    <ListItem
                                        roundAvatar
                                        rightIcon={<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ fontSize: RFValue(1.5), color: '#A9A8B6', marginBottom: 5 }} >{item.option}</Text>
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Icon
                                                    name="ios-arrow-forward"
                                                    size={14} 
                                                    style={{ marginRight: 10, marginLeft: 10, color:"#A9A8B6" ,alignSelf: 'center' }}
                                                />
                                            </View>
                                        </View>}
                                        title={<Text style={{ fontSize: RFValue(13.6), fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', color: '#000' }}>{item.name}</Text>}
                                        containerStyle={{ borderBottomWidth: 0.3, height: 70, backgroundColor: 'white', justifyContent: 'center' }}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.name}

                            onEndReachedThreshold={50}
                        />

                    </View>


                </View>


            </SafeAreaView>
        );
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
        height: '100%'
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 5
    },
    genderSelectioncontainer: {
        borderBottomWidth: 1,
        justifyContent:'space-between', 
        borderColor: '#f2f3f5',
        flexDirection:'row'  
    },
    text: {
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        color: '#000',
        paddingTop:20,
        paddingBottom:20
    },
    headerText: {
        height: 40,
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        marginTop: 15
    },
    clearText: {
        height: 40,
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#9246e6',
        marginTop: 18
    },
});
