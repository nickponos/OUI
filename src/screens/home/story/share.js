import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon, CheckBox } from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import Button from '../../../components/button';
import navigationService from '../../../navigation/navigationService';
import screens from '../../../constants/screens';
// import firebase from '@components/Firebase';
import { uploadImage, newUserStory, newStory, uploadMultipleImage, uploadVideo, addStory, addUserStory } from '../../../services/firebase';

class ShareScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSharing: false,
            isChecked: [],
            isCheckYourStory: true,
            keys: [],
            MyEvents: [],
            GoingEvents: [
                {
                    image: require('@images/event_1.jpg'),
                    title: 'Trip to Palm Shores Beaches',
                    check: true
                },
                {
                    image: require('@images/event_2.jpg'),
                    title: 'IE: Mysteires of the Mind',
                    check: false
                },
            ],
        }

    }

    // static getDerivedStateFromProps (props, state) {
    //     // let derivedMyEvents = [];
    //     // let myEventProp = props.events.my_events;
    //     // for(let key in myEventProp) {
    //     //     let oneMyEvent = {...myEventProp[key]};
    //     //     oneMyEvent['eventId'] = key;
    //     //     derivedMyEvents.push(oneMyEvent);
    //     // }
    //     // return {
    //     //     MyEvents: derivedMyEvents
    //     // }        
    // }

    // componentWillMount() {
    //     const { user } = this.props;
    //     var events = []
    //     // chatref = firebase.database().ref()
    //     // firebase.database().ref().child('Events').orderByChild('event_creater/' + 'userid').equalTo(user.userId)
    //     //     .once('value', (snapshot) => {
    //     //         let data = snapshot.val();
    //     //         if (data) {
    //     //             this.setState({ MyEvents: Object.values(data), keys: Object.keys(data) });
    //     //         }
    //     //     });
    // }
    _yourStoryShare() {
        const { user } = this.props;
        return (
            <View style={styles.yourStoryShareView}>
                <View style={styles.yourStoryShareContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Image source={{ uri: user.profile }} style={{ height: 50, width: 50, borderRadius: 25, }} /> */}
                        <Text style={styles.yourStoryShareText}>Your story</Text>
                    </View>
                    <View style={{ right: 10, }}>
                        <CheckBox
                            color='#8a4cea'
                            checked={this.state.isCheckYourStory}
                            onPress={() => this.setState({ isCheckYourStory: !this.state.isCheckYourStory })}
                        />
                    </View>
                </View>
            </View>
        )
    }

    _myEvents() {
        const { isChecked } = this.state
        return (
            <View style={{ width: '100%' }}>
                <View style={{ width: '90%', alignSelf: 'center', paddingVertical: 20 }}>
                    <Text style={styles.headingText}>My events</Text>
                </View>
                {this.state.MyEvents.length > 0 ?
                    <FlatList
                        data={this.state.MyEvents}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.yourStoryShareView}>
                                <View style={styles.yourStoryShareContainer}>
                                    <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={{ uri: item.event_image }} style={{ height: 50, width: 50, borderRadius: 13, }} />
                                        <Text style={styles.yourStoryShareText}>{item.event_title}</Text>
                                    </View>
                                    <View style={{ paddingLeft: 3, width: '10%', }}>
                                        <CheckBox
                                            color='#8a4cea'
                                            checked={isChecked[index]}
                                            onPress={() => {
                                                if (isChecked[index])
                                                    this.setState(state => (isChecked[index] = !isChecked[index], state))
                                                else {
                                                    this.setState(state => (isChecked[index] = true, state))
                                                }
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        }
                    /> : null}
            </View>
        )
    }
    _goingEvents() {
        return (
            <View style={{ width: '100%' }}>
                <View style={{ width: '90%', alignSelf: 'center', paddingVertical: 20 }}>
                    <Text style={styles.headingText}>Events you're going to</Text>
                </View>
                <FlatList
                    data={this.state.GoingEvents}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <View style={styles.yourStoryShareView}>
                            <View style={styles.yourStoryShareContainer}>
                                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={item.image} style={{ height: 50, width: 50, borderRadius: 13, }} />
                                    <Text style={styles.yourStoryShareText}>{item.title}</Text>
                                </View>
                                <View style={{ paddingLeft: 3, width: '10%', justifyContent: 'flex-end', }}>
                                    <CheckBox color='#8a4cea' checked={item.check} />
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }

    _share = async () => {

        this.setState({ isSharing: true })
        const { MyEvents, keys, isChecked, isCheckYourStory } = this.state;
        const data = this.props.navigation.getParam('data', {});
        const { type, textdata, typer, textColor } = data;
        const { user } = this.props;
        
        console.log("Sharing Data === ", data);
        console.log("Share User = ", user);

        let imagesURL = "";
        if (typer == "camera") {
            
            imagesURL = await uploadImage(data.uri)
            // window.imagesURL = imagesURL;
            
            // var date = new Date();
            // const story_creater = { userid: user.userId, name: user.name, image: user.profile }
            if (isCheckYourStory) {
                await addUserStory(type, imagesURL, textdata, user.userId, typer, textColor);
            }

            // MyEvents.map((item, index) => {
            //     if (isChecked[index]) {
            //         newStory(date, type, imagesURL, textdata, story_creater, item, typer, textColor);
            //     }
            // })
            // Actions.YourStory({ userData: user, data: { uri: this.props.data.uri, type: type == "image" ? "image" : "video", textdata: textdata, typer, textColor } })
            
            this.setState({isSharing: false});
            navigationService.navigate(screens.HOME);

            // addStory(type, imagesURL, textdata, user.userId, typer, textColor, isCheckYourStory, []).then(() => {
            //     this.setState({isSharing: false});
            //     // navigationService.navigate(screens.YOUR_STORY, { userData: user, data: { uri: data.uri, type: type == "image" ? "image" : "video", textdata: textdata, typer, textColor } });
            //     navigationService.navigate(screens.HOME);
            // });
        } else {
            try {
                if (type == "image") {
                    const uri = data.uri;
                    const path = uri.path;
                    // imagesURL = await uploadMultipleImage(this.props.data.uri)
                    imagesURL = await uploadImage(path);
                } else {
                    imagesURL = await uploadVideo(data.uri);
                }
                // imagesURL = await uploadMultipleImage(this.props.data.uri)
                // window.imagesURL = imagesURL;

                let mydata;
                // if (type == "image") {
                //     this.props.data.uri.map((item, index) => {
                //         if (index == 0)
                //             mydata = item.txvalue
                //         else
                //             mydata = mydata + "," + item.txvalue;
                //     })
                // } else {
                    mydata = textdata;
                //}
                
                var date = new Date();
                const story_creater = { userid: user.userId, name: user.name, image: user.profile }
                // if (isCheckYourStory)
                //     await newUserStory(date, type, imagesURL, mydata, story_creater, typer, textColor);
                // MyEvents.map((item, index) => {
                //     if (isChecked[index]) {
                //         newStory(date, type, imagesURL, mydata, story_creater, item, typer, textColor);
                //     }
                // })
                
                if (isCheckYourStory) {
                    await addUserStory(type, imagesURL, mydata, user.userId, typer, textColor);
                }
                this.setState({isSharing: false});
                navigationService.navigate(screens.HOME);

                // Actions.YourStory({ userData: user, data: { uri: this.props.data.uri, type: type == "image" ? "image" : "video", textdata: mydata, typer, textColor } })
                // addStory(type, imagesURL, mydata, user.userId, typer, textColor, isCheckYourStory, [])
                // .then((value) => {
                //     this.setState({isSharing: false});
                //     // navigationService.navigate(screens.YOUR_STORY, { userData: user, data: { uri: data.uri, type: type == "image" ? "image" : "video", textdata: mydata, typer, textColor } });
                //     navigationService.navigate(screens.HOME);
                // })
            } catch (e) {
                console.log("Bhavesh1 " + e)
            }
        }

    }

    render() {
        const { MyEvents } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="dark-content" />
                <View style={styles.headerView}>
                    <TouchableOpacity style={styles.backView}
                        onPress={() => navigationService.pop()}>
                        <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Share</Text>
                </View>
                <View style={{ width: '100%' }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: '40%' }} >
                        {this._yourStoryShare()}
                        {this._myEvents()}
                        {/* {this._goingEvents()} */}
                    </ScrollView>
                </View>
                <View style={styles.buttonView}>
                    <Button buttonText='Share' onClick={() => {
                        this.setState({
                            isSharing: true
                        }, function () {
                            this._share()
                        })
                    }}
                        colors={['#a65ae1', '#8a4cea']} style={styles.buttoncontainer} />
                </View>
                {this.state.isSharing && 
                <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF0D', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator
                        animating={true}
                        size={'large'}
                    />
                </View>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    headerView: {
        flexDirection: 'row',
        width: '90%',
        // backgroundColor:'gray',
        paddingVertical: 10,
        alignSelf: 'center',
        alignItems: 'center'
    },
    backView: {
        // backgroundColor:'red',
        width: 30,
        alignItems: 'flex-start',
    },
    headerText: {
        width: '80%',
        fontSize: RFValue(17),
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        marginTop: 5
    },
    buttonView: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        borderColor: '#f2f3f5',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#000',
        height: 50,
        width: '100%',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: RFValue(17),
        color: '#fff'
    },
    yourStoryShareContainer: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    yourStoryShareView: {
        width: '100%',
        // borderTopWidth:1,
        borderBottomWidth: 1,
        borderColor: '#f2f3f5',
    },
    yourStoryShareText: {
        width: '80%',
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#000',
        paddingLeft: 10
    },
    headingText: {
        fontSize: RFValue(15.64),
        color: '#000',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
    },
});
//ShareScreen
const mapStateToProps = state => ({
    user: state.user,
    // events: state.events
})
export default connect(mapStateToProps)(ShareScreen);