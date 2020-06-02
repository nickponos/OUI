import React, { Component } from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    StatusBar, 
    TouchableOpacity, 
    Switch,
    Image, 
    TextInput, 
    ScrollView, 
    Dimensions, 
    Modal, 
    TouchableWithoutFeedback, 
    AsyncStorage
} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from 'react-redux';
import { Header, Icon, CheckBox } from 'native-base';
// import { Actions } from 'react-native-router-flux';
import Button from '../../../../components/button';
import LinearGradient from 'react-native-linear-gradient';
// import { auth, db, firestore, fireGeoPoint } from '../../../../components/Firebase';
import testData from '../../../../assets/dumydata'
import navigationService from '../../../../navigation/navigationService';
// import { addEvent } from '../../../../services/firebase';

class ReviewAndPay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.event = db.ref().child('Events/')
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    _Done() {
        const create_date = new Date();
        const { user } = this.props
        const event_creater = { userid: user.userId, name: user.name, image: user.profile }
        this.props.eventDetails.event_fees = '10%'
        this.props.eventDetails.ammount_to_be_paid = Math.round(this.props.eventDetails.budget.value * 0.10)
        this.props.eventDetails.event_creater = event_creater
        this.props.eventDetails.category = this.props.serachData.category
        this.props.eventDetails.event_image = this.props.serachData.image
        this.props.eventDetails.place_images = this.props.serachData.place_images
        const { location } = this.props.serachData
        // let fireLocation = new fireGeoPoint(location.lat, location.lng);
        this.props.serachData.location = fireLocation;
        this.props.eventDetails.serachData = this.props.serachData
        // this.props.eventDetails = {...this.props.eventDetails, ...this.props.serachData};
        // let searchData = this.props.searchData;
        // for (let key in searchData) {
        //     this.props.eventDetails.key = searchData[key];
        // }
        this.props.eventDetails.create_location = fireLocation;
        this.props.eventDetails.create_date = create_date
        this.props.eventDetails.createdAt = create_date.getTime();
        this.props.eventDetails.creatorId = event_creater.userid;
        this.props.eventDetails.liked = [];
        this.props.eventDetails.participated = [];
        // this.event.push(this.props.eventDetails).then(res => {
        //     if (res.key) {
        //         this.setState({ modalVisible: false });
        //         Actions.reset('Home', { tab: 2 })
        //     }
        // }).catch((error) => {
        //     console.log('error ', error)
        // })


        // addEvent(this.props.eventDetails).then(res => {
        //     this.setState({modalVisible: false});
        //     Actions.reset('Home', {tab: 2});
        // }).catch((error) => {
        //     console.log('error', error);
        // })
    }
    _createdEventModal() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                }}>
                <TouchableOpacity style={styles.participateModalView} onPressOut={() => { this.setModalVisible(!this.state.modalVisible) }}>
                    <TouchableWithoutFeedback>
                        <View style={styles.participateView}>
                            <View style={{ height: 5, width: 80, backgroundColor: '#e5e4ea', alignSelf: 'center', marginTop: 10, borderRadius: 50 }}></View>
                            <View style={{ marginVertical: 30 }}>
                                <Text style={[styles.descText, { color: '#000', marginBottom: 5, textAlign: 'center' }]}>Congrats!</Text>
                                <Text style={[styles.cartText, { color: '#000', textAlign: 'center' }]}>Your event is set up</Text>
                            </View>
                            <TouchableOpacity style={[styles.modalbutton]} onPress={() => this._Done()}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 40, justifyContent: 'center' }}>
                                    <Text style={[styles.cartText, { color: 'white', }]}>Done</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }
    _cart() {
        var serachData = this.props.serachData
        console.log("data --", serachData)
        return (
            <View style={{ paddingVertical: 15, borderColor: '#f2f3f5', borderBottomWidth: 1 }}>
                <View style={styles.relatedEventsMainView}>
                    <View style={styles.relatedEventsCardView}>
                        <View style={{ width: '35%' }}>
                            <Image resizeMode='cover' source={{ uri: serachData.image }} style={{ height: 100, width: '100%' }} />
                        </View>
                        <View style={styles.relatedEventsDetailsView}>
                            <View style={{ width: '100%' }}>
                                <View style={styles.relatedEventsCategoryView}>
                                    <Text style={[styles.relatedEventsCategoryText, { color: 'rgb(239,113,184)' }]}>{serachData.category}</Text>
                                </View>
                                <View style={{ width: '90%', flexDirection: 'row', paddingTop: 5 }}>
                                    <Text style={styles.relatedEventsSubtitle}>{serachData.title}</Text>
                                </View>
                            </View>
                            <View style={styles.relatedEventsHandlerView}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                    <Image source={require('../../../../assets/images/star.png')} style={{ height: 16, width: 16 }} />
                                    <Text style={{ marginLeft: 3, color: 'black', fontSize: RFValue(13.6), }}>{serachData.rating}</Text>
                                    <Text style={{ marginLeft: 5, color: 'black', fontSize: RFValue(13.6) }}>({serachData.view})</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    _DetailView(data) {
        //9-10 Sep, 2019 at 11:00 UTC+2
        return (
            <View style={{ width: '90%', alignSelf: 'center', paddingVertical: 15 }}>
                <Text style={[styles.relatedEventsSubtitle, { marginBottom: 5 }]}>{(data.event_title)}</Text>
                <Text style={styles.detailText}> {new Date(data.event_start_date).toUTCString()}  </Text>
                <Text style={styles.detailText}> {new Date(data.event_end_date).toUTCString()}  </Text>
                <Text style={styles.detailText}>{data.meeting_place}</Text>
                <Text style={styles.detailText}>{`${data.guest} guests,${data.gender == 'any' ? 'any' : 'only for' + data.gender}  ${data.age[0] + ' - ' + data.age[1]} y.o`}</Text>
            </View>
        )
    }
    render() {
        console.log('vle : ', this.props.eventDetails)
        var eventDetails = this.props.eventDetails
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />

                <View style={styles.subContainerView}>
                    <View style={{ height: '15%', borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}>
                            <View style={{ alignSelf: 'flex-start', width: '10%', }}>
                                <TouchableOpacity style={styles.backView}
                                    onPress={() => navigationService.pop()}>
                                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[styles.headerText, { color: '#afaebc', }]}>Step 5 of 5</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-start', width: '90%', alignSelf: 'center', paddingVertical: 15 }}>
                            <Text style={{ color: '#000', fontSize: RFValue(20.4), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Review and pay</Text>
                        </View>
                    </View>
                    <View style={{ height: '85%', }}>
                        <View style={{ height: '85%', justifyContent: 'space-between' }}>
                            <View>
                                {this._cart()}
                                {this._DetailView(eventDetails)}
                            </View>
                            <View>
                                <View style={{ width: '100%', borderTopWidth: 1, borderColor: '#f2f3f5', paddingVertical: 15 }}>
                                    <View style={styles.detailView}>
                                        <Text style={styles.detailText}>Budget</Text>
                                        <Text style={styles.detailText}>{eventDetails.budget.value + " " + eventDetails.budget.currency}</Text>
                                    </View>
                                    <View style={[styles.detailView]}>
                                        <Text style={styles.detailText}>Event fees</Text>
                                        <Text style={styles.detailText}>10%</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#f2f3f5', paddingVertical: 15 }}>
                                    <View style={styles.detailView}>
                                        <Text style={{ color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', fontSize: RFValue(14.96), }}>Total amount to be paid</Text>
                                        <Text style={{ color: '#000', fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', fontSize: RFValue(17), }}>{Math.round(eventDetails.budget.value * 0.10)} {eventDetails.budget.currency}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '90%', alignSelf: 'center', paddingVertical: 15, }}>
                                    <Text style={styles.text}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonView}>
                            <Button buttonText='Pay'
                                onClick={() => { this.setModalVisible(!this.state.modalVisible) }}
                                colors={['#a65ae1', '#8a4cea']} style={styles.buttoncontainer} />
                        </View>
                    </View>
                </View>
                {this._createdEventModal()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    subContainerView: {
        flex: 1,
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
        // height: 40,
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        // color: '#afaebc',
        marginTop: 10,
        marginBottom: 5
    },
    text: {
        fontSize: RFValue(14.96),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#a8a7b5',
        // backgroundColor: 'gray'
    },
    buttonView: {
        width: '100%',
        height: 80,
        // position:'absolute',
        // bottom:0,
        justifyContent: 'center',
        borderColor: '#f2f3f5',
        borderTopWidth: 1,
        paddingHorizontal: 20
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 50,
        width: '100%',
        borderRadius: 25,
    },
    relatedEventsMainView: {
        backgroundColor: 'red',
        alignSelf: 'center',
        alignItems: 'center',
        // width: Dimensions.get('screen').width - 40,
        width: '90%',
        // marginVertical: 5,
        // marginRight: 20,
        elevation: 0.8,
        borderRadius: 20,
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    relatedEventsCardView: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 15,
        backgroundColor: 'white'
    },
    relatedEventsCategoryView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    relatedEventsCategoryText: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontSize: RFValue(13.6),
    },
    relatedEventsTitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RFValue(17),
        color: 'black'
    },
    relatedEventsSubtitle: {
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        fontSize: RFValue(17),
        width: '95%',
        color: '#000',
        // marginLeft: 3
        // marginVertical: 2
    },
    relatedEventsHandlerView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        //justifyContent: 'space-between', 
        paddingVertical: 5
    },
    relatedEventsDetailsView: {
        width: '65%',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    detailText: {
        paddingTop: 3,
        color: '#000',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        fontSize: RFValue(13.6),
    },
    detailView: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    participateModalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    participateView: {
        alignItems: 'center',
        // justifyContent: 'flex-start',
        backgroundColor: "#fff",
        paddingBottom: 30,
        // height: '45%',
        marginBottom: 30,
        alignSelf: 'center',
        width: '90%',
        elevation: 2,
        borderRadius: 15,
    },
    modalbutton: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 30,
        width: '80%',
        // borderRadius: 15,
    },
    cartText: {
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    },
    descText: {
        fontSize: RFValue(19.04),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },

});

const mapStateToProps = state => ({
    user: state.session.user,
})
export default connect(mapStateToProps)(ReviewAndPay);
