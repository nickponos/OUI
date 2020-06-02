import React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'
import { RFValue } from "react-native-responsive-fontsize"
import PropTypes from "prop-types";
import { Icon } from 'native-base';
const dot = <Icon name='dot-single' type='Entypo' style={{ fontSize: 10, color: 'grey', marginHorizontal: 4 }} />

class events extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        onPress: PropTypes.func,
        events: PropTypes.array,
        eventKeys: PropTypes.array,
        subtitle: PropTypes.string
    }
    constructor(props) {
        super(props)
        this.state = {
            events: this.props.events,
            title: this.props.title,
            eventKeys: this.props.eventKeys
        }
    }

    render() {
        const { title, events, eventKeys } = this.state;
        return (
            <View style={{ width: '100%', paddingLeft: 20, marginTop: 15 }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.headingText}>{title}</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ fontSize: RFValue(15.64), color: '#9246e6', marginRight: 15 }}>{"See all"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={events}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => this.props.onPress(item, index, "1")} style={{ marginLeft: 5 }}>
                                <View style={styles.card}>
                                    <View style={styles.cartContainer}>
                                        <View style={{ height: 200, width: 300 }}>
                                            <Image resizeMode='cover' source={{ uri: item.place_images[0] }}
                                                style={{ height: 200, width: 300, borderRadius: 12 }} />

                                            <TouchableOpacity style={{ position: 'absolute', top: 12, right: 12 }} onPress={() => this.setState(state => (this.state.events[index].like = !this.state.events[index].like, state))}>
                                                <Icon name={this.state.events[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#ec527b' }} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ width: '100%', padding: 10 }}>
                                            <Text style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>{item.event_title}</Text>
                                            <TouchableOpacity onPress={() => this.props.onPress(item.event_creater.image, item.event_creater.name, "2")} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={{ uri: item.event_creater.image }} style={{ height: 24, width: 24, borderRadius: 12, }} />
                                                <Text style={[styles.cartText, { fontSize: RFValue(14.96), marginLeft: 7, color: '#000' }]}>{item.event_creater.name}</Text>
                                            </TouchableOpacity>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 4, bottom: 8 }}>
                                                <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.event_start_date}</Text>
                                                {dot}
                                                {/* <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.time}</Text> */}
                                                <Text style={[styles.cartText, { color: '#6CA7FB', paddingBottom: 5 }]}>{(item.category).toUpperCase()}</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            alignItems: 'center', position: 'absolute', right: 8, top: 168, borderRadius: 8,
                                            elevation: 0.7,
                                            shadowOffset: { width: 0, height: 1, },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 1,
                                            backgroundColor: '#ffffff',
                                            paddingHorizontal: 16,
                                            paddingVertical: 4
                                        }}>
                                            <Text style={[styles.cartText, { paddingBottom: 5, alignItems: 'center', fontSize: RFValue(13.6) }]}>Budget</Text>
                                            <Text style={[styles.descText, { color: '#000', fontSize: RFValue(19.04) }]}>{item.budget.value + " " + item.budget.currency}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        width: '85%',
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        marginLeft: 5,
        color: '#a8a7b5'
    },
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
        width: '100%',
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