
/* eslint-disable no-console */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Platform,
    TouchableWithoutFeedback,
    Easing
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
import { Icon } from 'native-base'
// import { Actions } from 'react-native-router-flux'
import { RFValue } from "react-native-responsive-fontsize";
import ImagePicker from 'react-native-image-crop-picker';
import { AnimatedCircularProgress } from '../../../lib/react-native-circular-progress';
import navigationService from '../../../navigation/navigationService';
import screens from '../../../constants/screens';
import _ from 'lodash';

const flashModeOrder = {
    off: 'on',
    on: 'off'
};

export default class CameraScreen extends React.Component {

    circularprogress = null;
    progressfill = 0;
    
    constructor(props) {
        super(props)
        this.circularprogress = React.createRef();        
        this.state = {
            flash: 'off',
            zoom: 0,
            autoFocus: 'on',
            autoFocusPoint: {
                normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
                drawRectPosition: {
                    x: Dimensions.get('window').width * 0.5 - 32,
                    y: Dimensions.get('window').height * 0.5 - 32,
                },
            },
            depth: 0,
            type: 'back',
            whiteBalance: 'auto',
            ratio: '16:9',
            recordOptions: {
                mute: false,
                maxDuration: 50,
                fixOrientation: true,
                skipProcessing: false,
                quality: RNCamera.Constants.VideoQuality["288p"]
            },
            isRecording: false,
            canDetectFaces: false,
            canDetectText: false,
            canDetectBarcode: false,
            faces: [],
            textBlocks: [],
            barcodes: [],
            defaultBtn: 'photo',
            intervalReference: null,
            time: new Date().toLocaleTimeString(),
            countdown: 0,
            sec_Right: 0,
            pause: false
        }

        setInterval(() => {
            this.setState({ time: new Date().toLocaleTimeString() })
        }, 1000)
        this.startCountDown = this.startCountDown.bind(this)
        this.pause = this.pause.bind(this)
        this.resume = this.resume.bind(this)
        this.reset = this.reset.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    componentWillUnmount() {
        this.setState({ isRecording: false });
        this.setState({ defaultBtn: 'photo'});
    }

    componentWillMount() {
        this.setState({ isRecording: false });
        this.setState({ defaultBtn: 'photo'});
    }

    
    pause() {
        clearInterval(this.state.intervalReference)

    }
    resume() {
        // console.log(this.state)
        this.startCountDown(this.state.countdown)
    }
    reset() {
        this.pause();
    }
    toggle() {
        this.setState({ toggle: !this.state.toggle })
    }
    _toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }
    async startCountDown(countdownTime = this.state.countdown) {
        clearInterval(this.state.intervalReference)
        console.log(`you pressed ${countdownTime}`)
        this.setState({ countdown: countdownTime, originalCountdown: countdownTime }, () => {
            let intervalReference = setInterval(() => {
                if (this.state.countdown < 100)
                    this.setState({ countdown: ++this.state.countdown })
            }, 1000)
            this.setState({ intervalReference: intervalReference })
        })
    }
    _toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    _takePicture = async function () {
        if (this.camera) {
            const options = {
                skipProcessing: false,
                fixOrientation: true, quality: 0.5, base64: true
            };
            const data = await this.camera.takePictureAsync(options);
            // Actions.EditStory({ data: { uri: data.uri, type: 'image', typer: 'camera' } })
            console.log("Camera Taking Picture Result ==== ", _.keys(data));
            navigationService.navigate(screens.EDIT_STORY, { data: { uri: data.uri, type: 'image', typer: 'camera' } });
        }
    };

    _pickImage() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            multiple: false
        }).then(images => {
           console.log("Image Library Picking Result ==== ", images);
            // Actions.EditStory({ data: { uri: images, type: 'image', typer: 'gallery' } })
            navigationService.navigate(screens.EDIT_STORY, { data: { uri: images, type: 'image', typer: 'gallery' } });
        })
    }
    _stopVideo = () => {
        this.camera.stopRecording();
        // if (!this.state.pause){
        //     this.setState({pause:true})
        //     this.camera.pausePreview();
        //     this.pause()
        // } else{
        //     this.setState({pause:false})
        //     this.camera.resumePreview();
        //     this.resume()
        // }
    }
    _takeVideo = async function () {
        if (!this.state.isRecording) {
            this.startCountDown();
            if (this.camera) {
                try {
                    const promise = this.camera.recordAsync(this.state.recordOptions);
                    if (promise) {
                        this.setState({ isRecording: true });
                        const data = await promise;
                        this.pause();
                        this.setState({ isRecording: false, countdown: 0 });
                        console.log('Take Video Result === ', data);
                        // Actions.EditStory({ data: { uri: data.uri, type: 'video' } })
                        navigationService.navigate(screens.EDIT_STORY, { data: { uri: data.uri, type: 'video' } });
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
        else {
            this.pause();
            this.setState({ isRecording: false })
        }
    };

    _startVideoRecord = () => {
        // Actions.EditStory({ data: { uri: images, type: 'video' } });
        if (this.camera) {
            this.camera.recordAsync(this.state.recordOptions).then((value) => {
                this.setState({ isRecording: false });
                // Actions.EditStory({ data: { uri: value.uri, type: 'video' } });
                navigationService.navigate(screens.EDIT_STORY, { data: { uri: value.uri, type: 'video' } });
            }).catch((error) => {
                console.log("Record Failure=", error);
            })
        }
    }

    _stopVideoRecord = () => {
        console.log("Stop Video Record $$$$");
        this.camera.stopRecording();
    }

    _handlePressIn = () => {
        console.log("Video Button Pressed");
        // this._takeVideo();
        // this.setState({isRecording: true});
        // this.circularprogress.animate(100, 10000, Easing.quad);
    }

    _handlePressOut = () => {
        console.log("Take Button Release");
        // this._stopVideo();
        // According to defaultBtn state, take a picture or finish Recording
        if (this.state.isRecording == true) {
            this.circularprogress.animate(this.progressfill, 0);
            this.camera.stopRecording();
            this.setState({isRecording: false});
            this.setState({defaultBtn: 'photo'});
            // this.circularprogress.animate(0, 0, Easing.quad);
        }
            
        if (this.state.defaultBtn == "photo")
            this._takePicture();
    }

    _handlePress = () => {
        console.log("Take Button Press")
    }

    _handleLongPress = () => {
        console.log("Take Button Long Press")
        this.setState({defaultBtn: 'video'});
        this.setState({isRecording: true});
        this._startVideoRecord();
        this.circularprogress.animate(100, 10000, Easing.quad);
        // Actions.EditStory({ data: { uri: '', type: 'video' } });
    }

    _renderVideoBtnChildren = (fill) => {
        this.progressfill = fill;
        return (
            <View style={{
                width: 90,
                height: 90,
                backgroundColor: 'rgba(255,255,255,0.4)',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    width: 40, height: 40,
                    backgroundColor: '#F2487C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8
                }}>
                    <View style={{ width: 12, height: 12, backgroundColor: 'rgba(255,255,255,1)', borderRadius: 2 }}>
                        <Text>
                            {/* {this.state.countdown} */}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    renderCamera() {
        const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;
        const drawFocusRingPosition = {
            top: this.state.autoFocusPoint.drawRectPosition.y - 32,
            left: this.state.autoFocusPoint.drawRectPosition.x - 32,
        };
        const VideoBtnTColor = this.state.isRecording ? '#EC2B82' : '#F4547A';
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                focusDepth={this.state.depth}
                // permissionDialogTitle={'Permission to use camera'}
                // permissionDialogMessage={'We need your permission to use your camera phone'}
                androidCameraPermissionOptions={{
                    title: 'Permission to use Camera',
                    message: 'App needs the permission to use your camera',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel'
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use Audio',
                    message: 'App needs the permission to use your audio',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel'
                }}
            >
                <View
                    style={{
                        //flex: 0.5,
                        //height: 72,
                        paddingTop: Platform.OS == 'ios' ? 15 : 0,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '95%'
                        }}
                    >
                        {this.state.isRecording ?
                            null
                            :
                            <TouchableOpacity style={styles.backView}
                                onPress={() => navigationService.pop()}>
                                <Icon name='angle-left' type='FontAwesome' style={{ color: '#fff', fontSize: 35 }} />
                            </TouchableOpacity>}
                        {this.state.defaultBtn == "photo" ?
                            <TouchableOpacity style={[styles.backView, { margintTop: 12 }]} onPress={this._toggleFlash.bind(this)}>
                                {this.state.flash == 'off' ?
                                    <Icon name='flash-off' type="MaterialIcons" style={{ color: '#fff', fontSize: 30 }} />
                                    :
                                    <Icon name='flash-on' type="MaterialIcons" style={{ color: '#fff', fontSize: 30 }} />
                                }
                            </TouchableOpacity> : null}
                    </View>
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                    </View>
                </View>
                <View style={{ paddingBottom: 20 }}>
                    <View
                        style={{
                            height: 70,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignSelf: 'center',
                            width: '82%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '5%'
                        }} >
                        {this.state.defaultBtn == "photo" ?
                            <TouchableOpacity onPress={() => this._pickImage()}>
                                <Icon name='picture-o' type="FontAwesome" style={{ color: '#fff', marginTop: 10, fontSize: 25 }} />
                            </TouchableOpacity>
                            :
                            <View style={{ width: 25 }}></View>
                        }

                        <TouchableWithoutFeedback
                            onPressIn={this._handlePressIn}
                            onLongPress={this._handleLongPress}
                            onPressOut={this._handlePressOut}
                            delayLongPress={700}
                            // onPress={this.state.isRecording ? () => { this._stopVideo() } : this._takeVideo.bind(this)}
                            // style={{backgroundColor: 'red', width:100, height:100}}
                        >
                            <View>
                                {this.state.defaultBtn == "photo" ?
                                    <Icon name='circle-thin' type="FontAwesome" style={{ color: '#fff', paddingBottom: 20, fontSize: 70 }} />
                                    :
                                    <AnimatedCircularProgress
                                        size={90}
                                        width={5}
                                        rotation={0}
                                        fill={0}
                                        ref={(ref) => this.circularprogress = ref}
                                        onAnimationComplete={() => console.log('onAnimationComplete')}
                                        tintColor= {VideoBtnTColor}
                                        backgroundColor='rgba(255,255,255,0.2)'>

                                        { this._renderVideoBtnChildren }
                                    </AnimatedCircularProgress>
                                }    
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableOpacity onPress={this._toggleFacing.bind(this)}>
                            <Icon name='ios-reverse-camera' type="Ionicons" style={{ color: '#fff', marginTop: 10, fontSize: 37 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </RNCamera>
        );
    }
    render() {
        return <View style={styles.container}>{this.renderCamera()}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backView: {
        width: 30,
        alignItems: 'flex-start',
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5
    },
});

