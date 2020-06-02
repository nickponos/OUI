import React, { Component } from 'react';
import {
    Platform,ScrollView, StyleSheet, Text, View, SafeAreaView, StatusBar,TouchableOpacity } from 'react-native';
import { Icon,CheckBox } from 'native-base'
// import { Actions } from 'react-native-router-flux';
import { RFValue } from "react-native-responsive-fontsize"
import navigationService from '../../../navigation/navigationService';


export default class Diversity extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected:this.props.value
        }
    }
    _diversity(diversity){
        console.log("diversity",diversity)
        this.props.event('Gender diversity',diversity)
        navigationService.pop()
    }
    _renderList(title) {
        return (
            <TouchableOpacity onPress={() => this.setState({selected:title},()=>this._diversity(title))} style={styles.genderSelectioncontainer}>
                <View style={{ flexDirection: 'row',marginLeft:'5%' }}>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View style={{ marginRight:'10%', paddingTop:20,paddingBottom:20 }}>
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
                <View style={{ width:'90%', alignSelf:'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => navigationService.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>Gender diversity</Text>
                        <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                    </View>
                    </View>
                    <ScrollView>
                        {this._renderList('Any')}
                        {this._renderList('Mixed duo')}
                        {this._renderList('Female duo')}
                        {this._renderList('Male duo')}
                        {this._renderList('Mixed group')}
                        {this._renderList('Female group')}
                        {this._renderList('Male group')}
                    </ScrollView>
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
        flex:1,
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
