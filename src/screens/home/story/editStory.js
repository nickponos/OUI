import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { RFValue } from "react-native-responsive-fontsize"
import Video from 'react-native-video';
// import RNMediaEditor from 'react-native-media-editor';
import { getHeight, getWidth } from '../../../constants/dynamicSize';
// import { RNPhotoEditor } from 'react-native-photo-editor'
import RNFS, { stat } from 'react-native-fs'
import navigationService from '../../../navigation/navigationService';
import screens from '../../../constants/screens';
import _ from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
// import Swiper from 'react-native-swiper'

export default class editorStoryScreen extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      muted: true,
      loading: false,
      assetType: 'image',
      asset: null,
      fontSize: 50,
      colorCode: '#ffffff',
      textBackgroundColor: '#ff00e0',
      rate: 0,
      camera: false,
      text: '',
      writing: false,
      fileType: 'image',
      data: {}
    }
  }

  componentDidMount() {
    let data = this.props.navigation.getParam('data', {});
    console.log("Edit Story Mounted !!!! === ", data);
    this._readyImage(data);
  
  }

  _readyImage = (data) => {
    if (!_.isNil(data)) {
      // this.setState({data: data}, () => {
      //   if (data.type !== 'video') {
      //     if (data.typer == "camera") {
      //       let photoPath = RNFS.DocumentDirectoryPath + "/photo.jpg";
      //       const filepath = data.uri
      //       RNFS.copyFile(filepath, photoPath)
      //         .then(success => {
      //           this.setState({ loading: true })
      //         })
      //         .catch(err => {
      //           alert(err.message + "1")
      //           console.log(err.message);
      //         });
      //     }
      //     else {
      //       data.uri.map((item, index) => {
      //         let name = "/" + new Date().getTime() + "photo.jpg";
      //         let photoPath = RNFS.DocumentDirectoryPath + name;
      //         const filepath = item.path
      //         RNFS.copyFile(filepath, photoPath)
      //           .then(success => {
      //             this.setState({ loading: true })
      //           })
      //           .catch(err => {
      //             alert(err.message + "1")
      //           });
      //       })
      //     }
      //   }
      // });
      this.setState({data: data});
    }
  }

  // _onPress() { 
  //   let photoPath = RNFS.DocumentDirectoryPath + "/photo.jpg";
  //   const filepath = this.props.data.uri
  //   let filter = ".*\\.*";
  //   RNPhotoEditor.Edit({
  //     path: RNFS.DocumentDirectoryPath + "/photo.jpg",
  //     stickers: [
  //       "sticker0",
  //       "sticker1",
  //       "sticker2",
  //       "sticker3",
  //       "sticker4",
  //       "sticker5",
  //       "sticker6",
  //       "sticker7",
  //       "sticker8",
  //       "sticker9",
  //       "sticker10"
  //     ],
  //     hiddenControls: [],
  //     colors: undefined,
  //     onDone: () => {
  //       // Actions.Share({ data: { uri: this.props.data.uri, type: this.props.data.type == "image" ? "image" : "video" } })
  //       navigationService.navigate(screens.SHARE, { data: { uri: this.props.data.uri, type: this.props.data.type == "image" ? "image" : "video" } });
  //     },
  //     onCancel: () => {
  //       console.log('on cancel')
  //     }
  //   });
  // }

  _writeText = () => {
    
    this.setState({writing: !this.state.writing});
  }

  _changeColorCode = (value) => {
    this.setState({colorCode: value})
  }

  _renderStory() {
    const data = this.props.navigation.getParam('data', {});
    return (
      <View style={this.state.writing == false ? styles.container : styles.containerEditing}>
        <View style={styles.headerView}>
          <TouchableOpacity style={styles.backView}
            onPress={() => navigationService.pop()}>
            <Image style={{ height: 25, width: 25, }} source={require('@images/back.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 80, alignItems: 'flex-end' }}
            onPress={() => this._writeText()} >
            {
              this.state.writing == false ? 
              <Image style={{ height: 25, width: 25, }} source={require('@images/textedit.png')} />
              : 
              <Text style ={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>Done</Text>
            }
          </TouchableOpacity>
        </View>
        {
          this.state.writing == false ?
          <View style={styles.editView}>
            {
              this.state.text != '' ? 
              <Text style={{fontSize: 24, fontWeight: 'bold', color: `${this.state.colorCode}`}}>{this.state.text}</Text>
              : 
              null
            }
            <Text style={{fontSize: 24, color: `${this.state.colorCode}`}}></Text>
            <View style={styles.shareView}>
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                {
                  data.type != 'image' ? 
                  <TouchableOpacity style={styles.backView} onPress={() => this.setState({ muted: this.state.muted == true ? false : true })}>
                    {
                      this.state.muted == true ? 
                      <Image style={{ height: 25, width: 25, }} source={require('@images/mute.png')} />
                      : 
                      <Image style={{ height: 25, width: 25, }} source={require('@images/sound.png')} />
                    }
                    
                  </TouchableOpacity> :
                  <View></View>
                }
                <TouchableOpacity style={styles.shareContainer}
                  // onPress={() => Actions.Share({ data: { uri: this.props.data.uri, type: this.props.data.type == "image" ? "image" : "video", textdata: this.state.text, typer: this.props.data.typer, textColor: this.state.colorCode } })}
                  onPress={() => navigationService.navigate(screens.SHARE, { data: { uri: data.uri, type: data.type == "image" ? "image" : "video", textdata: this.state.text, typer: data.typer, textColor: this.state.colorCode } })}
                >
                  <Text>Share your story</Text>
                </TouchableOpacity>
              </View>
            </View>  
          </View> 
          :
          
            <View style={styles.editView}>
              <View style={{ width: '100%', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                <TextInput
                  style={{ width: '100%', color: `${this.state.colorCode}`, textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}
                  placeholder='Enter caption'
                  placeholderTextColor="#ffffff90"
                  value={this.state.text}
                  ref={(input) => { this.captionInput = input; }}
                  onChangeText={(text) => {
                    this.setState({ text: text });
                  }} />
              </View>
              <View style={{height: getHeight(28), width: getWidth(335), flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: getHeight(10)}}>
                <TouchableOpacity 
                  style={{backgroundColor: 'white', width: getHeight(28), height: getHeight(28), borderRadius: getHeight(14), borderColor: 'white', borderWidth: 3}}
                  onPress={() => {this._changeColorCode('#ffffff')}}
                />
                <TouchableOpacity 
                  style={{backgroundColor: '#000000', width: getHeight(28), height: getHeight(28), borderRadius: getHeight(14), borderColor: 'white', borderWidth: 3}}
                  onPress={() => {this._changeColorCode('#000000')}}
                />
                <TouchableOpacity 
                  style={{backgroundColor: '#43CBF5', width: getHeight(28), height: getHeight(28), borderRadius: getHeight(14), borderColor: 'white', borderWidth: 3}}
                  onPress={() => {this._changeColorCode('#43CBF5')}}
                />
                <TouchableOpacity 
                  style={{backgroundColor: '#12D79D', width: getHeight(28), height: getHeight(28), borderRadius: getHeight(14), borderColor: 'white', borderWidth: 3}}
                  onPress={() => {this._changeColorCode('#12D79D')}}
                />
                <TouchableOpacity 
                  style={{backgroundColor: '#FFCB52', width: getHeight(28), height: getHeight(28), borderRadius: getHeight(14), borderColor: 'white', borderWidth: 3}}
                  onPress={() => {this._changeColorCode('#FFCB52')}}
                />
                <TouchableOpacity 
                  style={{backgroundColor: '#FF7B02', width: getHeight(28), height: getHeight(28), borderRadius: getHeight(14), borderColor: 'white', borderWidth: 3}}
                  onPress={() => {this._changeColorCode('#FF7B02')}}
                />
                <TouchableOpacity 
                  style={{backgroundColor: '#FD4882', width: getHeight(28), height: getHeight(28), borderRadius: getHeight(14), borderColor: 'white', borderWidth: 3}}
                  onPress={() => {this._changeColorCode('#FD4882')}}
                />
                <TouchableOpacity 
                  style={{backgroundColor: '#964BEB', width: getHeight(28), height: getHeight(28), borderRadius: getHeight(14), borderColor: 'white', borderWidth: 3}}
                  onPress={() => {this._changeColorCode('#964BEB')}}
                />
              </View>
            </View>
        }
      </View>
    )
  }

  _renderGallerySTory() {
    // console.log("Image Length = ", this.props.data.uri.length);
    const data = this.props.navigation.getParam('data', {});
    //let imgLen = data.uri != undefined ? data.uri.length : 0;
    const uri = data.uri;
    const backImageURI = Platform.OS == 'ios' ? 'file://' + uri.path : uri.path;
    
    return (
      <ImageBackground source={{ uri: backImageURI}} style={styles.imageBackground}>
        {this._renderStory()}
      </ImageBackground>
    )
    
    // return (
    //   this.props.data.uri.map((item, index) => {
    //     console.log("Gallery Index = ", index);
    //     return <ImageBackground source={{ uri: item.path }} style={styles.imageBackground}>
    //       <View style={styles.container}>
    //         <View style={[styles.shareView1]}>
    //           <View style={{ width: '100%', alignItems: 'flex-end' }}>
    //             <TouchableOpacity style={styles.shareContainer}
    //               onPress={() => Actions.Share({ data: { uri: this.props.data.uri, type: this.props.data.type == "image" ? "image" : "video", textdata: "", typer: this.props.data.typer } })}>
    //               <Text>Share your story</Text>
    //             </TouchableOpacity>
    //           </View>
    //           <View style={{ width: '100%', backgroundColor: '#000000cc', width: '100%', marginTop: 8 }} >
    //             <TextInput
    //               style={{ width: '100%', color: 'white', paddingLeft: 8 }}
    //               placeholder='Enter caption'
    //               placeholderTextColor="#ffffff90"
    //               autoCapitalize='none'
    //               onChangeText={(text) => {
    //                 item['txvalue'] = text;
    //               }} />
    //           </View>
    //         </View>
    //       </View>
    //     </ImageBackground>
    //   })
    // )
  }

  render() {
    const data = this.props.navigation.getParam('data', {});
    console.log("Typer == ", data.typer);
    console.log("Render Data = ", data.uri);
    return (
      <View style={{flex: 1}}>
        <KeyboardAwareView animated={true}>
          {data.type == "image" ?

            data.typer == "camera" ?
              <ImageBackground source={{ uri: data.uri }} style={styles.imageBackground}>
                {this._renderStory()}
              </ImageBackground>
              :
              <View style={styles.imageBackground}>
                {this._renderGallerySTory()}
              </View>
              
            :
            <View style={{ flex: 1 }}>
              <Video source={{ uri: data.uri }}   // Can be a URL or a local file.
                style={styles.backgroundVideo}
                muted={this.state.muted}
                repeat={true}
                resizeMode={"cover"}           // Callback when video cannot be loaded
              />
              <View style={{ position: 'absolute', height: '100%', alignSelf: 'center', width: '100%' }}>
                {this._renderStory()}
              </View>
            </View>
          }
        </KeyboardAwareView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerEditing: {
    flex: 1,
    backgroundColor: '#00000044'
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position:'absolute',
    width: '90%',
    paddingVertical: Platform.OS == 'ios' ? 50 : 20,
    // alignSelf:'center',
    //  alignContent:'center'
  },
  backView: {
    // backgroundColor:'red',
    marginLeft: 20,
    width: 40,
    alignItems: 'flex-start',
  },
  shareView: {
    alignSelf: 'center',
    width: '97%',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: Platform.OS == 'ios' ? 50 : 30
  },
  shareView1: {
    alignSelf: 'center',
    width: '97%',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: Platform.OS == 'ios' ? 80 : 60
  },
  editView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareContainer: {
    height: 40,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // position:'absolute'
  },
  shareText: {
    color: '#000',
    fontSize: RFValue(13.6),
    fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
  },
  backgroundVideo: {
    //height: height,
    position: "absolute",
    top: 0,
    left: 0,
    //alignItems: "stretch",
    bottom: 0,
    right: 0
  }
});
