import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';
import {PINK_PRIMARY} from '../constants/colors';
import {getHeight} from '../constants/dynamicSize';
import navigationService from '../navigation/navigationService';
import { SafeAreaView } from 'react-navigation';
import screens from '../constants/screens';
import {connect} from 'react-redux';
import { appInitialized } from '../controller/init';

const BACK_IMAGE = require('../assets/images/loading_background.png')

class Loading extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(appInitialized());
        // setTimeout(() => {
        //     navigationService.navigate(screens.AUTH);
        // }, 3000);
    }

    render () {
        return (
          <View style={{flex: 1, width: '100%'}}>
            <Image source={BACK_IMAGE} style={{position:'absolute', top: 0, left: 0, bottom: 0, right: 0}} resizeMode={'stretch'} />
            <SafeAreaView style={styles.container}>
                <View style={styles.container} >
                    <Text style={styles.loadText}>Loading...</Text>
                    <ActivityIndicator size={'large'} />
                </View>
            </SafeAreaView>
          </View>
        )
    }
};

Loading.navigatorStyle = {
    navBarHidden: true,
    statusBarBlur: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    loadText: {
        paddingBottom: getHeight(20),
        color: '#FFFFFF',
    }
});

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(Loading);