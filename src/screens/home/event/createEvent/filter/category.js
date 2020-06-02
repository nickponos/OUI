import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView,StatusBar,TouchableOpacity,
    Image,SectionList} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import {  Header, Icon,CheckBox} from 'native-base';
// import { Actions } from 'react-native-router-flux';
import navigationService from '../../../../../navigation/navigationService';
 
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
                
            categories: [
                {
                    title: 'Food',
                    data: [
                        {
                            name: 'Restaurants',
                            image:require('../../../../../assets/images/restaurant.png'),
                            checked: true
                        },
                        {
                            name: 'Bars',
                            image:require('../../../../../assets/images/glass.png'),
                            checked: false
                        },
                        {
                            name: 'Cafes',
                            image:require('../../../../../assets/images/cafe.png'),
                            checked: false
                        },
                    ]
                },
                {
                    title: 'Hobbies',
                    data: [
                        {
                            name: 'Night life',
                            image:require('../../../../../assets/images/night_life.png'),
                            checked: false
                        },
                        {
                            name: 'Attractions',
                            image:require('../../../../../assets/images/attraction.png'),
                            checked: false
                        },
                        {
                            name: 'Movies',
                            image:require('../../../../../assets/images/movie.png'),
                            checked: true
                        },
                        {
                            name: 'Art',
                            image:require('../../../../../assets/images/art.png'),
                            checked: true
                        },
                        {
                            name: 'Science',
                            image:require('../../../../../assets/images/science.png'),
                            checked: false
                        },
                        {
                            name: 'Sport',
                            image:require('../../../../../assets/images/sport.png'),
                            checked: false
                        },
                    ]
                },
                {
                    title: 'Others',
                    data: [
                        {
                            name: 'Travel',
                            image:require('../../../../../assets/images/travel.png'),
                            checked: true
                        },
                        {
                            name: 'Health',
                            image:require('../../../../../assets/images/health.png'),
                            checked: false
                        },
                        {
                            name: 'Shopping',
                            image:require('../../../../../assets/images/shopping.png'),
                            checked: false
                        },
                    ]
                },

            ]
           
        }
    }
    _select(index,section){
        console.log('Index',index,'section',section)
        this.setState(state=>(this.state.categories.find((item)=>{
            if(item.title == section.title){
                item.data[index].checked = !item.data[index].checked
            }
        }),state))
    }
  render() {
   
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#ffffff' barStyle="light-content" />

            <View style={styles.subContainerView}>
                <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <TouchableOpacity style={styles.backView}
                                onPress={() => navigationService.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>Category</Text>
                        <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                    </View>
                </View>

                <View>
                    <SectionList
                        extraData={this.state}
                        contentContainerStyle={{ paddingBottom: '20%' }}
                        sections={this.state.categories}
                        stickySectionHeadersEnabled={false}
                        renderSectionHeader={({ section }) => 
                            <View style={{padding:25,width:'100%',}}>
                                <Text style={styles.categoryText}>{section.title}</Text>
                            </View>
                            }
                        renderItem={({ item, index, section }) => 
                        <TouchableOpacity onPress={()=>this._select(index,section)} style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                            <View style={styles.cartcontainer}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image style={{height:50,width:50,borderRadius:18}} source={item.image} />
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </View>
                                <View style={{ right: 10, }}>
                                    <CheckBox color='#8a4cea' checked={item.checked} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        }

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
categoryText:{
    fontSize:RFValue(15.64),
    fontFamily:Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    color:'#000'
},
itemText:{
    fontSize:RFValue(13.6),
    fontFamily:Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    color:'#000',
    paddingLeft:15
},
cartcontainer:{
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    paddingVertical:10,
    alignItems:'center',
    justifyContent:'space-between',
    // borderBottomWidth:1,
    // borderColor:'#f2f3f5'
}
});
