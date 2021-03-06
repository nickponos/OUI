import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView,StatusBar,TouchableOpacity,Image} from 'react-native';
//  import Header from '../../components/filterHeader'
import {  Header, Icon,CheckBox } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import navigationService from '../../../navigation/navigationService';
// import { Actions } from 'react-native-router-flux';

export default class HostRating extends Component {
  constructor(props){
    super(props)
    this.state={
      selected:this.props.value
    }
  }
  _gender(gender){
    this.props.people('Gender',gender)
    navigationService.pop()
}
_renderList(title) {
    return (
        <TouchableOpacity onPress={() => this.setState({selected:title},()=>this._gender(title))} style={styles.genderContainer}>
        <View style={styles.genderView}>
          <Text style={styles.itemText}>{title}</Text>
          <View style={{ right: 10, }}>
            <CheckBox color='#8a4cea' checked={this.state.selected == title ? true : false} />
          </View>
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
            <View style={{width:'90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',alignSelf:'center'}}>
              <View style={{ alignSelf: 'flex-start' }}>
                <TouchableOpacity style={styles.backView}
                  onPress={() => navigationService.pop()}>
                  <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                </TouchableOpacity>
              </View>
              <Text style={styles.headerText}>Gender</Text>
              <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
            </View>
          </View>
          {this._renderList('Any')}
          {this._renderList('Female')}
          {this._renderList('Male')}
          {this._renderList('Other')}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFF',
  },
  subContainerView: {
    flex:1,
    width: '100%',
    backgroundColor: '#fff',
  //  paddingHorizontal:20,
    height: '100%'
},
  backView: {
    width: 30,
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 5
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
itemText:{
    fontSize:RFValue(13.6),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    fontWeight:'400',
    color:'#000'
},
genderView:{
  width: '90%', 
  height: 60, 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  alignSelf: 'center',
},
genderContainer:{
  borderBottomWidth: 1, 
  borderColor: '#f2f3f5' 
}
  
});
