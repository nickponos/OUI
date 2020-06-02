import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, StatusBar, Dimensions, ScrollView,
    SafeAreaView, TouchableOpacity, Image
} from 'react-native';
import { Icon, CheckBox } from 'native-base'
import Swiper from 'react-native-swiper';
// import { Actions } from 'react-native-router-flux';
import { RFValue } from "react-native-responsive-fontsize"
import Button from '../../../components/button'
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../../../navigation/navigationService';

const sc_height = Dimensions.get('window').height;
const sc_width = Dimensions.get('window').width;

class Upgrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: [
                {
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                },
                {
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                },

            ],
            selectedItem: 0
        }
    }

    _renderList(disprice, price, type, days, save, position) {
        return (
            <TouchableOpacity style={[styles.priceSelectioncontainer, { margin: 2 }]} onPress={() => { this.setState({ selectedItem: position }) }}>
                {this.state.selectedItem == position ?
                    <View style={{ width: sc_width * 0.3, height: sc_height * 0.24 }} >
                        <View style={{ justifyContent: "center", flexDirection: 'column', alignItems: 'center', height: sc_height * 0.17 }}>
                            <Text style={styles.daysTextSelected}>{days}</Text>
                            <Text style={styles.typeTextSelected}>{type}</Text>
                            <Text style={styles.dispriceTextSelected}>{disprice}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottomEndRadius: 12, borderBottomStartRadius: 12, backgroundColor: '#FD8904', height: sc_height * 0.07 }}>
                            <View style={{ paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.saveTextSelected}>{save}</Text>
                                <Text style={[styles.priceTextSelected, { marginTop: 4 }]}>{price}</Text>
                            </View>
                        </View>

                    </View>
                    :
                    <View style={{ width: sc_width * 0.3, height: sc_height * 0.24 }} >
                        <View style={{ justifyContent: "center", flexDirection: 'column', alignItems: 'center', height: sc_height * 0.17 }}>
                            <Text style={styles.daysText}>{days}</Text>
                            <Text style={styles.typeText}>{type}</Text>
                            <Text style={styles.dispriceText}>{disprice}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', height: sc_height * 0.07 }}>
                            <View style={{ paddingHorizontal: 10, alignItems: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.saveText}>{save}</Text>
                                <Text style={[styles.priceText, { marginTop: 4 }]}>{price}</Text>
                            </View>
                        </View>
                    </View>

                }
            </TouchableOpacity>
        )
    }
    _swiper(title, image, content) {
        return (
            <View style={{ alignItems: 'center', height: sc_height * 0.30 }}>
                <Image style={{ height: sc_height * 0.1, width: sc_height * 0.1 }} resizeMode={'contain'} source={image} />
                <Text style={{ marginTop: 8, fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: 'black', fontSize: RFValue(23.12) }}>{title}</Text>
                <Text style={{ marginTop: 8, width: '80%', fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', color: 'black', fontSize: RFValue(17), textAlign: 'center' }}>{content}</Text>
            </View>
        )
    }
    render() {
        const { user } = this.props;
        const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 30, color: 'grey' }} />
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <View style={styles.headerView}>
                    <TouchableOpacity style={styles.backView}
                        onPress={() => navigationService.pop()}>
                        <Icon name='angle-left' type='FontAwesome' style={{ color: '#FE9A20', fontSize: 35 }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.subContainerView}>
                    <View style={{ paddingBottom: 15, width: '100%', alignSelf: 'center', borderBottomWidth: 1, borderColor: '#f2f3f5', }}>
                        <Text style={styles.headingText}>Become 2Oui Premium</Text>
                    </View>
                    <ScrollView>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ height: sc_height * 0.33, marginTop: sc_height * 0.05 }}>
                                <Swiper horizontal style={{ flex: 1 }} dotStyle={{ backgroundColor: '#c299ef' }} activeDotStyle={{ backgroundColor: '#9c5ce7', height: 10, width: 10, borderRadius: 5, borderColor: '#c299ef', borderWidth: 2 }}>
                                    {this._swiper('Your event in the top list', require('../../../assets/images/toplist.png'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy')}
                                    {this._swiper('Users that match with you', require('../../../assets/images/toplist.png'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy')}
                                    {this._swiper('Your profile in the top list', require('../../../assets/images/toplist.png'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy')}
                                </Swiper>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: sc_height * 0.24 }}>
                                {this._renderList('90.99€', '9.06€ / mouth', 'mouths', '12', 'Save 45%', 0)}
                                {this._renderList('57.99€', '9.06€ / mouth', 'mouths', '6', 'Save 58%', 1)}
                                {this._renderList('16.49€', '16.49€ / mouth', 'mouth', '1', '', 2)}
                            </View>
                            {/* </View> */}

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: sc_height * 0.04 }}>
                                <Button buttonText='Upgrade now'
                                    colors={['#FFC263', '#FD8904']} style={styles.buttoncontainer} />
                                <Text style={{ fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular', color: '#A8A8B6', fontSize: RFValue(17), textAlign: 'center', marginBottom: 30, marginTop: 10 }}>No thanks</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        //height: '100%'
    },
    headerView: {
        flexDirection: 'row',
        width: '90%',
        paddingVertical: 10,
        alignSelf: 'center',
        alignContent: 'center'
    },
    backView: {
        width: 40,
        alignItems: 'flex-start',
    },
    headingText: {
        paddingHorizontal: 20,
        fontSize: RFValue(25.84),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#FE9A20'
    },
    buttonView: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0
    },
    buttoncontainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 50,
        width: '90%',
        borderRadius: 25,
    },
    DescText: {
        // backgroundColor:'red',
        width: '90%',
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000'
    },
    priceSelectioncontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        //  backgroundColor:'red',
        borderRadius: 12,

        marginTop: 12,
        marginVertical: 8,
        elevation: 0.7,
        shadowOffset: { width: 1.5, height: 1.5, },
        shadowColor: 'gray',
        shadowOpacity: 0.1,
    },
    dispriceText: {
        marginTop: 10,
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontWeight: '400',
        color: '#FEC482'
    },
    dispriceTextSelected: {
        marginTop: 10,
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontWeight: '400',
        color: '#FD8905',
        marginBottom: 10
    },
    saveText: {
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontWeight: '400',
        color: '#000',
    },
    saveTextSelected: {
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontWeight: '400',
        color: '#fff',
    },
    priceText: {
        fontSize: 12,
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#D3D3DA',
        //textDecorationLine:'line-through'
    },
    priceTextSelected: {
        fontSize: 12,
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#fff',
        //textDecorationLine:'line-through'
    },
    daysText: {
        marginTop: 8,
        fontSize: RFValue(6.2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#D3D3DA',
        textAlign: 'center'
    },
    daysTextSelected: {

        fontSize: RFValue(6.2),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000000',
        textAlign: 'center'
    },
    typeText: {
        fontSize: RFValue(14.96),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#FEC482'
    },
    typeTextSelected: {
        fontSize: RFValue(14.96),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#FD8905'
    }
});
const mapStateToProps = state => ({
    user: state.session.user,
})
export default connect(mapStateToProps)(Upgrade);