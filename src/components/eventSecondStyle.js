import React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'
import { RFValue } from "react-native-responsive-fontsize"
import PropTypes from "prop-types";
import { Icon } from 'native-base';
const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey', marginHorizontal: 4 }} />
const sc_width = Dimensions.get('window').width * 0.9
class events extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        onPress: PropTypes.func,
        relatedEvents: PropTypes.array
    }
    constructor(props) {
        super(props)
        this.state = {
            relatedEvents: this.props.relatedEvents,
            title: this.props.title
        }
    }

    render() {
        const { title, relatedEvents } = this.state;
        return (
            <View style={{ width: '100%', marginTop: 15 }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.headingText, { marginLeft: 20 }]}>{title}</Text>
                </View>
                <FlatList
                    data={relatedEvents}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => this.props.onPress(item, index, "1")} style={{ marginLeft: 5 }}>
                            <View style={styles.card}>
                                <View style={styles.cartContainer}>
                                    <View style={{ height: 120, width: sc_width }}>
                                        <Image resizeMode='cover' source={item.image}
                                            style={{ height: 120, width: sc_width, borderRadius: 12 }} />

                                        <Image source={require('../assets/images/saved.png')} style={{ position: 'absolute', top: 12, right: 12, height: 16, width: 18, tintColor: index % 2 != 0 ? '#f05d87' : null }} />
                                    </View>

                                    <View style={{ width: sc_width, padding: 10 }}>
                                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.descText, { paddingBottom: 5, color: '#000', width: '75%' }]}>{item.title}</Text>
                                        <TouchableOpacity onPress={() => this.props.onPress(item.eventManager.image, item.eventManager.name, "2")}
                                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={item.eventManager.image} style={{ height: 24, width: 24, borderRadius: 12, }} />
                                            <Text style={[styles.cartText, { fontSize: RFValue(14.96), marginLeft: 7, color: '#000' }]}>{item.eventManager.name}</Text>
                                        </TouchableOpacity>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 4, bottom: 8 }}>
                                            <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.date}</Text>
                                            {dot}
                                            {/* <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.time}</Text> */}
                                            <Text style={[styles.cartText, { color: '#6CA7FB', paddingBottom: 5 }]}>{item.category.toLocaleUpperCase()}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        alignItems: 'center', position: 'absolute', right: 8, top: 88, borderRadius: 8,
                                        elevation: 0.7,
                                        shadowOffset: { width: 0, height: 1, },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 1,
                                        backgroundColor: '#ffffff',
                                        paddingHorizontal: 16,
                                        paddingVertical: 4
                                    }}>
                                        <Text style={[styles.cartText, { paddingBottom: 5, alignItems: 'center', fontSize: RFValue(13.6) }]}>Budget</Text>
                                        <Text style={[styles.descText, { color: '#000', fontSize: RFValue(19.04) }]}>{item.price}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
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

    text: {
        width: '85%',
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        marginLeft: 5,
        color: '#a8a7b5'
    },
    card: {
        width: sc_width,
        borderRadius: 12,
        elevation: 0.7,
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        flex: 1, marginTop: 18,
        alignItems: 'center',
        alignSelf: 'center'
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
        fontSize: RFValue(19.04),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },

});

export default events