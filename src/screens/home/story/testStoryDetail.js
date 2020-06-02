import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { RFValue } from "react-native-responsive-fontsize"

import Swiper from 'react-native-swiper';
import Spinner from 'react-native-spinkit';
// import { getHeight, getWidth } from '../../../services/dynamicSize';
import {getHeight, getWidth} from '../../../constants/dynamicSize';
import _ from 'lodash';
import navigationService from '../../../navigation/navigationService';
import screens from '../../../constants/screens';
import {SafeAreaView} from 'react-navigation';
import SwiperItem from '../../../components/swiperItem';
import { isIphoneX } from '../../../services/utils';

class TestStoryDetail extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
          itemArray:  [], //data array to be loaded
          loadQueue: [], //[0,0,0,0,...] loading state array
          storyCreator: {},
          prevStories: {},
          prevStoryCreatorId: ''
        }
        
        // if (this.state.itemArray > 0) {
        //     this.state.itemArray.forEach(element => {
        //         this.state.loadQueue.push(0);
        //     });
        // }

        
      }

      loadHandle (i) {
        let loadQueue = this.state.loadQueue
        loadQueue[i] = 1
        this.setState({
          loadQueue
        })
      }
      
      static getDerivedStateFromProps (props, state) {
        const { story, user } = props;
        let userStory = _.get(story, ['stories', story.currentStoryCreator], {});
        // let storyCreator = _.get(story, ['users', story.currentStoryCreator], {});
        if (story.currentStoryCreator != state.prevStoryCreator || userStory != state.prevStories) {
          let currentCreator = _.get(story, ['users', story.currentStoryCreator], {});
          // if (story.currentStoryCreator == props.user.userId) {
          //   currentCreator = props.user;
          // }
          let newStories = _.map(userStory, (item) => {
            return item;
          });
          
          let orderedStories = _.orderBy(newStories, ['timestamp'], ['desc']);
          console.log("New Stories === ", userStory, story.currentStoryCreator);
          return {
            prevStoryCreatorId: story.currentStoryCreator,
            storyCreator: currentCreator,
            itemArray: orderedStories,
            prevStories: userStory
          }
        } else {
          return null;
        }
      }

      componentWillUnmount() {
        this.setState({itemArray: [], loadQueue: []});
      }

      _renderSwipeContent = () => {
        return (
          this.state.itemArray.map(item => {
            return (
            <View style={{flex: 1, backgroundColor: item.textColor}}>

            </View>
            );
          })
        )
      }

      render () {
          const { storyCreator, itemArray } = this.state;
          const { user } = this.props;
          
        return (
          <SafeAreaView style={{flex: 1, width: '100%'}} forceInset={{top: 'never', bottom: 'never'}}>
            <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
            <Swiper loadMinimalSize={3} loop={false}>
              {
                itemArray.map((item, i) => 
                  <SwiperItem 
                    componentType={item.fileType}
                    dataURI={item.story}
                    key={i}
                    text={item.textData}
                    textColor={item.textColor ? item.textColor : '#FFFFFF'}
                  />
                )
              }
            </Swiper>
            <View style={mainStyles.headerView}>
                <View style={mainStyles.storyView}>
                    <Image source={{ uri: storyCreator.profile }} style={mainStyles.storyImg} />
                    <View style={{ width: '70%' }}>
                        <Text style={mainStyles.yourStoryShareText}>{storyCreator.userId == user.userId ? "Your Story" : storyCreator.name}</Text>
                    </View>
                </View>
                <View style={mainStyles.iconView}>
                    {/* <TouchableOpacity>
                      <Icon name='dots-horizontal' type="FontAwesome" style={{ color: '#fff', fontSize: 30 }} />
                    </TouchableOpacity> */}
                    <TouchableOpacity 
                       onPress={() => { navigationService.reset(screens.HOME, { tab: 1 }) }} 
                      style={{ marginLeft: 2 }}>
                      <Icon name='close' type="FontAwesome" style={{ color: '#fff', fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
            </View>
          </SafeAreaView>
        )
      }
 
}

const mainStyles = StyleSheet.create({
    storyView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    storyImg: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    iconView: {
        width: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerView: {
        position: 'absolute',
        left: 0, 
        top: isIphoneX ? getHeight(45) : getHeight(20),
        paddingHorizontal: getWidth(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignSelf: 'center',
    },
    yourStoryShareText: {
        width: '80%',
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#FFF',
        paddingLeft: 10
    },
    wrapper: {
      flex: 1
    },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

const mapStateToProps = state => ({
    user: state.user,
    story: state.story
})
export default connect(mapStateToProps)(TestStoryDetail);