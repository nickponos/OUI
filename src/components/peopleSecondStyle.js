import React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { RFValue } from "react-native-responsive-fontsize"
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from "prop-types";
import { Icon } from 'native-base';
const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey', marginHorizontal: 4 }} />
const sc_width = Dimensions.get('window').width * 0.9
class people extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        onPress: PropTypes.func,
        peoples: PropTypes.array
    }
    constructor(props) {
        super(props)
        this.state = {
            peoples: this.props.peoples,
            title: this.props.title
        }
    }
    render() {
        const { title, peoples } = this.state;
        return (
            <View style={{ width: '100%', marginTop: 15 }}>
                <View style={{ paddingHorizontal: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.headingText}>{title}</Text>
                </View>
                <View style={{ width: sc_width + 10, alignSelf: 'center' }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={peoples}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.card}>
                                <TouchableOpacity onPress={() => this.props.onPress({ image: item.image, name: item.name, prof: item.prof })} style={styles.cartContainer}>
                                    <View style={{ height: 350, width: sc_width }}>
                                        <Image resizeMode='cover' source={item.image}
                                            style={{ height: 350, width: sc_width, borderRadius: 12 }} />

                                        <View style={{ position: 'absolute', top: 8, left: 8, right: 8, alignItems: 'flex-end' }}>
                                            <TouchableOpacity >
                                                <Icon name='close' type='MaterialIcons' style={{ color: '#fff', }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ position: 'absolute', left: 8, right: 8, bottom: 8 }}>
                                            <View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.descText, { fontSize: RFValue(20.4), paddingBottom: 5, color: '#fff' }]}>{(item.name)}</Text>
                                                    <Text style={[styles.descText, { fontSize: RFValue(20.4), paddingBottom: 5, color: '#fff' }]}>,</Text>
                                                    <Text style={[styles.descText, { fontSize: RFValue(20.4), paddingBottom: 5, paddingLeft: 5, color: '#fff' }]}>{item.age}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#fff' }]}>{(item.prof)}</Text>
                                                    {dot}
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#fff' }]}>{item.dist}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={[styles.buttoncontainer, { position: 'absolute', right: 0, bottom: 8, alignSelf: 'center' }]}>
                                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#a65ae1', '#8a4cea']} style={{ flexDirection: 'row', width: '100%', borderRadius: 25, alignItems: 'center', height: 35, justifyContent: 'center' }}>
                                                    <Icon name='plus' type='Entypo' style={{ color: '#fff', fontSize: 20, right: 5 }} />
                                                    <Text style={{ color: 'white', fontSize: 18, fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular' }}>Invite</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* <View style={{ width: '100%', padding: 10, backgroundColor: 'gray' }}> */}
                                    <View style={{ width: '100%', padding: 10, paddingHorizontal: 20, flexDirection: 'row' }}>

                                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState(state => (this.state.peoples[index].like = !peoples[index].like, state))}>
                                            <Icon name={this.state.peoples[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#13DA9F' }} />
                                        </TouchableOpacity>
                                        <View style={{ height: 12, width: 1, backgroundColor: '#DDD', marginTop: 10 }} />
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                            <Icon name='close' type='MaterialIcons' style={{ color: '#F84055', }} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: RFValue(19.04),
        color: '#000',
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        marginLeft: 5
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
        width: sc_width,
    },
    cartText: {
        fontSize: RFValue(12.24),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
    },
    descText: {
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 100,
    },
});

export default people