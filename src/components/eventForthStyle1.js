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
const sc_width1 = Dimensions.get('window').width * 0.80
class events extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        onPress: PropTypes.func,
        events: PropTypes.array,
        subtitle: PropTypes.string
    }
    constructor(props) {
        super(props)
        this.state = {
            events: this.props.events,
            title: this.props.title,
            subtitle: this.props.subtitle
        }
    }
    render() {
        const { title, events, subtitle } = this.state;
        const item = events[0];
        const index = 0;
        return (
            <View style={{ width: '100%', marginTop: 15 }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.headingText}>{title}</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ fontSize: RFValue(15.64), color: '#9246e6', marginRight: 15 }}>{"See all"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', flexDirection: 'column' }}>
                    <View style={{ width: '100%' }}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={events}
                            extraData={this.state}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() => this.props.onPress(item, index, "1")} style={{ marginLeft: 16, width: sc_width1 }}>
                                    <View style={styles.card}>
                                        <View style={styles.cartContainer}>
                                            <View style={{ height: 200, width: sc_width1 }}>
                                                <Image resizeMode='cover' source={{uri:item.place}}
                                                    style={{ height: 200, width: sc_width1, borderRadius: 12 }} />

                                                <TouchableOpacity style={{ position: 'absolute', top: 4, right: 12 }} onPress={() => this.setState(state => (this.state.events[index].like = !this.state.events[index].like, state))}>
                                                    <Icon name={this.state.events[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#ec527b', padding: 12 }} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ width: '100%', padding: 10 }}>
                                                <Text numberOfLines={1} style={[styles.descText, { width: '65%', paddingBottom: 5, color: '#000' }]}>{item.desc}</Text>
                                                <TouchableOpacity onPress={() => this.props.onPress(item.image, item.personName, "2")}
                                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image source={{uri:item.image}} style={{ height: 24, width: 24, borderRadius: 12, }} />
                                                    <Text style={[styles.cartText, { fontSize: RFValue(14.96), marginLeft: 7, color: '#000' }]}>{item.personName}</Text>
                                                </TouchableOpacity>

                                                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 4, bottom: 8 }}>
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.date}</Text>
                                                    {dot}
                                                    {/* <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(alue(17.5) }]}>{item.time}</Text> */}
                                                    <Text style={[styles.cartText, { color: '#6CA7FB', paddingBottom: 5 }]}>{(item.event).toUpperCase()}</Text>
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
                                                <Text style={[styles.descText, { color: '#000', fontSize: RFValue(19.04) }]}>{item.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>

                    <View style={styles.box}>
                        <View style={styles.box_left}>
                            {this.state.events.map((item, index) => {
                                var i = index % 2;
                                if (i == 1)
                                    return (<View style={styles.card}>
                                        <View style={styles.cartContainer}>
                                            <View style={{ height: 120, width: '100%' }}>
                                                <Image resizeMode='cover' source={{uri:item.place}}
                                                    style={{ height: 120, width: '100%', borderRadius: 12 }} />

                                                <TouchableOpacity style={{ position: 'absolute', top: 4, right: 4 }} onPress={() => this.setState(state => (this.state.events[index].like = !this.state.events[index].like, state))}>
                                                    <Icon name={this.state.events[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#ec527b' }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ width: '100%', padding: 10 }}>
                                                <Text numberOfLines={2} ellipsizeMode={'clip'} style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>{item.desc}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image source={{uri:item.image}} style={{ height: 24, width: 24, borderRadius: 12, }} />
                                                    <Text style={[styles.cartText, { marginLeft: 7, color: '#000' }]}>{item.personName}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.date}</Text>
                                                    {dot}
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.time}</Text>
                                                </View>
                                                <Text style={[styles.cartText, { paddingBottom: 5, color: '#6CA7FB' }]}>{(item.event).toUpperCase()}</Text>
                                            </View>
                                            <View style={{
                                                alignItems: 'center', position: 'absolute', right: 8, top: 96, borderRadius: 8,
                                                elevation: 0.7,
                                                shadowOffset: { width: 0, height: 1, },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 1,
                                                backgroundColor: '#ffffff',
                                                paddingHorizontal: 12,
                                                paddingVertical: 2
                                            }}>
                                                <Text style={[styles.cartText, { paddingBottom: 2, alignItems: 'center', fontSize: RFValue(10.2) }]}>Budget</Text>
                                                <Text style={[styles.descText, { color: '#000', fontSize: RFValue(13.6) }]}>{item.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    )
                            })}
                        </View>
                        <View style={styles.box_right}>
                            {this.state.events.map((item, index) => {
                                var i = index % 2;
                                if (i == 0 && index != 0)
                                    return (<View style={styles.card}>
                                        <View style={styles.cartContainer}>
                                            <View style={{ height: 120, width: '100%' }}>
                                                <Image resizeMode='cover' source={{uri:item.place}}
                                                    style={{ height: 120, width: '100%', borderRadius: 12 }} />

                                                <TouchableOpacity style={{ position: 'absolute', top: 4, right: 4 }} onPress={() => this.setState(state => (this.state.events[index].like = !this.state.events[index].like, state))}>
                                                    <Icon name={this.state.events[index].like ? 'favorite' : 'favorite-border'} type='MaterialIcons' style={{ color: '#ec527b' }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ width: '100%', padding: 10 }}>
                                                <Text numberOfLines={2} ellipsizeMode={'clip'} style={[styles.descText, { paddingBottom: 5, color: '#000' }]}>{item.desc}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image source={{uri:item.image}} style={{ height: 24, width: 24, borderRadius: 12, }} />
                                                    <Text style={[styles.cartText, { marginLeft: 7, color: '#000' }]}>{item.personName}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.date}</Text>
                                                    {dot}
                                                    <Text style={[styles.cartText, { paddingBottom: 5, color: '#a8a7b5', alignItems: 'center', fontSize: RFValue(13.6) }]}>{item.time}</Text>
                                                </View>
                                                <Text style={[styles.cartText, { paddingBottom: 5, color: '#6CA7FB' }]}>{(item.event).toUpperCase()}</Text>
                                            </View>
                                            <View style={{
                                                alignItems: 'center', position: 'absolute', right: 8, top: 96, borderRadius: 8,
                                                elevation: 0.7,
                                                shadowOffset: { width: 0, height: 1, },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 1,
                                                backgroundColor: '#ffffff',
                                                paddingHorizontal: 12,
                                                paddingVertical: 2
                                            }}>
                                                <Text style={[styles.cartText, { paddingBottom: 2, alignItems: 'center', fontSize: RFValue(10.2) }]}>Budget</Text>
                                                <Text style={[styles.descText, { color: '#000', fontSize: RFValue(13.6) }]}>{item.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    )
                            })}
                        </View>
                    </View>
                </View>
            </View >)
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
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold'
    },
    box: {
        flexDirection: "row",
        width: "100%",
        marginTop: 8,
        paddingHorizontal: 8
    },
    box_left: {
        flexDirection: "column",
        flex: 1,
        padding: 0
    },
    box_right: {
        padding: 0,
        flexDirection: "column",
        flex: 1,
    },

});

export default events