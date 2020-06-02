import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
// import { Actions } from 'react-native-router-flux';

import { RFValue } from "react-native-responsive-fontsize"

import MultiSlider from "@ptomasroos/react-native-multi-slider";
import navigationService from '../../../../../navigation/navigationService';

const width = Dimensions.get('window').width

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter_age: this.props.age,
        }
    }
    render() {    
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                <View style={styles.subContainerView}>
                <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                    <View style={{ width:'90%',alignSelf:'center',flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => {
                                    this.props._setGuestsData('age',this.state.filter_age)
                                    navigationService.pop()
                                }}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>Age</Text>
                        <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                    </View>
                    </View>
                    <View style={{borderBottomWidth: 1, borderColor: '#f2f3f5'}}>
                        <Text style={{ marginLeft:'5%', marginTop: 20, marginBottom: 20, color: '#000', fontSize: RFValue(13.6), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>{this.state.filter_age[0]} - {this.state.filter_age[1]} y.o</Text>
                        <View style={{ alignItems: 'center',marginBottom:20}}>
                            <MultiSlider
                                values={[this.state.filter_age[0], this.state.filter_age[1]]}
                                min={15}
                                max={100}
                                onValuesChange={(value)=>this.setState({filter_age:value})}
                                sliderLength={width - 30}
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
                                    height: 8,
                                    backgroundColor: "red",
                                }}
                                markerStyle={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    backgroundColor: '#9246e6',
                                    borderWidth: 0.5,
                                    borderColor: '#9246e6',
                                    marginTop: 10
                                }}
                                touchDimensions={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                    slipDisplacement: 40,
                                }}
                            />
                        </View>
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
    },
    headerText: {
        height: 40,
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        marginTop: 8
    },
    clearText: {
        height: 40,
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#9246e6',
        marginTop: 12
    },
});
