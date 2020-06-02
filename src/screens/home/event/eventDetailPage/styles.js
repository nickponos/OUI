import {
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { RFValue } from "react-native-responsive-fontsize"

export default StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
  },
  imageBackground: {
      width: '100%',
      height: '100%',
     
  },
  headerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      paddingVertical: Platform.OS == 'ios' ? 30 : 20,
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
  headingText: {
      color: '#fff',
      fontSize: RFValue(15.64),
  },
  imageslider: {
      flex: 1,
      height: 300,
      width: '100%',
      alignItems: 'stretch'
  },
  fulldescText: {
      color: '#000',
      fontSize: RFValue(15.64),
      fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular'
  },
  fulldescTimeText: {
      color: '#a2a0af',
      fontSize: RFValue(15.64),
      fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
      marginTop: 3
  },
  fullViewHeadingText: {
      color: '#000',
      fontSize: RFValue(18.36),
      fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
  },
  card: {
      borderRadius: 12,
      elevation: 0.7,
      shadowOffset: { width: 0, height: 1, },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      margin: 5, flex: 1, marginTop: 18,
  },
  cartContainer: {
      alignItems: 'flex-start',
      alignSelf: 'center',
      backgroundColor: '#fff',
      overflow: 'hidden',
      borderRadius: 12,
      width: '100%',
  },
  cartText: {
      fontSize: RFValue(17),
      fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
  },
  descText: {
      fontSize: RFValue(19.04),
      fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
  },
  buttoncontainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: '80%',
  },
  participateModalView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)'
  },
  participateView: {
      alignItems: 'center',
      backgroundColor: "#fff",
      paddingBottom: 30,
      marginBottom: 30,
      alignSelf: 'center',
      width: '90%',
      elevation: 2,
      borderRadius: 15,
  },
  starStyle: {
      width: 35, height: 35,
      marginHorizontal: 3
  },
  backgroundVideo: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    storyImg: {
      height: 50,
      width: 50,
      borderRadius: 25
    },
    storyView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15
    },
    iconView: {
      alignSelf: 'flex-end',
      width: '15%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
      justifyContent: 'center'
    },
    yourStoryShareText: {
      width: '80%',
      fontSize: RFValue(15.64),
      fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
      color: '#FFF',
      paddingLeft: 10
    },
});