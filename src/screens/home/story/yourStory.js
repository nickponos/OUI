import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  BackHandler
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { RFValue } from "react-native-responsive-fontsize"
import Video from 'react-native-video';
import Swiper from 'react-native-swiper'
import { getHeight, getWidth } from '../../../constants/dynamicSize';
import navigationService from '../../../navigation/navigationService';
import screens from '../../../constants/screens';

class YourStory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      MyEvents: [
        {
          image: require('../../../assets/images/event_3.jpg'),
          title: 'Harry Potter Marathon at the cinema',
          check: false
        },
      ]
    }
  
  }
  _yourStory() {
    const { userData, user, data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.storyView}>
            <Image source={{ uri: userData.profile }} style={styles.storyImg} />
            <View style={{ width: '70%' }}>
              <Text style={styles.yourStoryShareText}>{userData.name == user.name ? "Your Story" : userData.name}</Text>
              <Text style={[styles.yourStoryShareText, { fontSize: RFValue(12.24) }]}>
                {
                  data.create_date == undefined ? "" : data.create_date
                }
              </Text>
            </View>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity>
              <Icon name='dots-horizontal' type="MaterialCommunityIcons" style={{ color: '#fff', fontSize: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity 
              // onPress={() => { Actions.reset('Home', { tab: 1 }) }} 
              style={{ marginLeft: 2 }}>
              <Icon name='close' type="MaterialCommunityIcons" style={{ color: '#fff', fontSize: 30 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyView}>
          {
            this.props.data.textdata != '' ? 
            <Text style={[styles.captionText, {color: `${this.props.data.textColor}`}]}>{this.props.data.textdata}</Text> :
            null
          }
        </View>
      </View>
    )
  }

  _renderGallerySTory() {
    return (
      this.props.data.uri.map((item, index) => {
        return <ImageBackground source={{ uri: item.path }} style={styles.imageBackground}>
          <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 16, left: 0, right: 0, backgroundColor: '#000000aa', padding: 12 }}>
            <Text style={{ color: 'white' }}>
              {item.txvalue}
            </Text>
          </View>
        </ImageBackground>
      })
    )
  }

  _yourGalleryStory() {
    // const { userData, user, data } = this.props;
    let imgLen = this.props.data.uri.length;
    const uri = this.props.data.uri;
    if (imgLen == 1) {
      return (
        <ImageBackground source={{ uri: uri[0].path}} style={styles.imageBackground}>
          {this._yourStory()}
        </ImageBackground>
      )
    }
    // return (
    //   <View style={styles.container}>
    //     <View style={{ backgroundColor: '#ff0000', position: 'absolute', flex: 1, top: 0, left: 0, right: 0, bottom: 0 }} >
    //       <Swiper pagingEnabled={true} style={{ flex: 1, backgroundColor: '#00ff00' }}>
    //         {this._renderGallerySTory()}
    //       </Swiper>
    //     </View>
    //     <View style={styles.headerView}>
    //       <View style={styles.storyView}>
    //         <Image source={{ uri: userData.profile }} style={styles.storyImg} />
    //         <View style={{ width: '70%' }}>
    //           <Text style={styles.yourStoryShareText}>{userData.name == user.name ? "Your Story" : userData.name}</Text>
    //           <Text style={[styles.yourStoryShareText, { fontSize: RFValue(12.24) }]}>
    //             {
    //               data.create_date == undefined ? "" : data.create_date
    //             }
    //           </Text>
    //         </View>
    //       </View>
    //       <View style={styles.iconView}>
    //         <TouchableOpacity>
    //           <Icon name='dots-horizontal' type="MaterialCommunityIcons" style={{ color: '#fff', fontSize: 30 }} />
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={() => { Actions.reset('Home', { tab: 1 }) }} style={{ marginLeft: 2 }}>
    //           <Icon name='close' type="MaterialCommunityIcons" style={{ color: '#fff', fontSize: 30 }} />
    //         </TouchableOpacity>
    //       </View>
    //     </View>

    //   </View>
    // )
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    // Actions.Home();
    navigationService.navigate(screens.HOME);
    // this.props.navigation.goBack();
    return true;
  }

  render() {
    if (this.props.data) {
      return (
        <View style={{ flex: 1 }}>
          {this.props.data.type == "image" ?
            this.props.data.typer == "camera" ?
              <ImageBackground source={{ uri: this.props.data.uri }} style={styles.imageBackground}>
                {this._yourStory()}
              </ImageBackground>
              :
              <View style={{ flex: 1 }}>
                {this._yourGalleryStory()}
              </View>
            :
            <View style={{ flex: 1 }}>
              {/* <Video source={{ uri:this.props.data.uri }} style={styles.backgroundVideo} resizeMode="contain" onLoad={()=>console.log('video loaded!')} onError={e=>console.log('video load failed!', e)} /> */}
              <Video source={{ uri: this.props.data.uri }}   // Can be a URL or a local file.
                style={styles.backgroundVideo}
                muted={false}
                repeat={true}
                resizeMode={"cover"}           // Callback when video cannot be loaded
              />
              <View style={{ alignSelf: 'center', width: '100%', flex: 1 }}>
                {this._yourStory()}
              </View>
            </View>
          }
          {/* {this.props.data.textdata == '' ? null : <View style={styles.caption}>
            <Text style={styles.caption_text}>
              {this.props.data.textdata}
            </Text>
          </View>} */}
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <ImageBackground source={require('../../../assets/images/story_1.jpg')} style={styles.imageBackground}>
            {this._yourStory()}
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  storyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
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
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  bodyView:{
    flex: 1,
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  backView: {
    width: 40,
    alignItems: 'flex-start',
  },
  shareView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: Platform.OS == 'ios' ? 50 : 30
  },
  shareContainer: {
    height: 40,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shareText: {
    color: '#000',
    fontSize: RFValue(13.6),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
  },
  yourStoryShareText: {
    width: '80%',
    fontSize: RFValue(15.64),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
    color: '#FFF',
    paddingLeft: 10
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  caption: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    backgroundColor: '#00000040',
    alignItems: 'center'
  },
  caption_text: {
    color: '#eeeeee',
    fontSize: 16,
    padding: 8,
  },
  captionText: {
    fontSize: 24, 
    fontWeight: 'bold',  
    height: getHeight(30), 
    width: '100%', 
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(YourStory);