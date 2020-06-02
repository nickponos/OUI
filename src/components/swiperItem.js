import React, {Component} from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import PropTypes from "prop-types";
import { Icon } from 'native-base';
import Video from 'react-native-video';

export default class SwiperItem extends Component {

  static propTypes = {
    componentType: PropTypes.string,
    dataURI: PropTypes.string,
    muted: PropTypes.bool,
    textColor: PropTypes.string,
    text: PropTypes.string
  }

  static defaultProps = {
    componentType: 'image',
    dataURI: '',
    muted: true,
    textColor: '#FFFFFF',
    text: ''
  }


  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  _changeLoadingState = () => {
    console.log("Swiper Component === "); 
    this.setState({loading: false});
  }

  _imageLoadStart = (e) => {
    console.log("Image Load Start = ", e);
    this.setState({loading: true});
  }

  _imageLoadEnd = (e) => {
    console.log("Image Load End = ", e);
    this.setState({loading: false});
  }

  _videoLoadStart = (e) => {

  }

  render() {
    const {componentType, dataURI, muted, textColor, text} = this.props;
    console.log("Story Text  === ", text);
      return (
          <View style={styles.wrapper}>
            {
              this.state.loading == true ? 
              <View style={styles.wrapper}>
                <ActivityIndicator size={'large'} />
              </View>
              : 
              componentType == 'image' ?
              <Image source={{uri: dataURI}} style={styles.wrapper} />
              : 
              <Video
                onLoad={this._changeLoadingState}
                style={styles.wrapper}
                source={{uri: dataURI}}
                muted={muted}
                repeat={true}
                resizeMode={'cover'}
              />
            }
            {
              this.state.loading == false ? 
                text != '' ?
                <View style={styles.dataContent}>
                  <Text style={[styles.captionText, {color: textColor}]}>
                    {text}
                  </Text>
                </View>
                : null
              : null
            }
          </View>
      );
  }
}

const styles = StyleSheet.create({
  wrapper: {
      flex: 1,
      width: '100%',
      height: 450,
      justifyContent: 'center',
      alignItems: 'center',
  },
  dataContent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionText: {
    fontSize: 24,
    fontWeight: 'bold',
  }
  
});