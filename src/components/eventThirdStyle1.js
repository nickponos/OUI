import React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native'
import { RFValue } from "react-native-responsive-fontsize"
import PropTypes from "prop-types";

class events extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        onPress: PropTypes.func,
        events: PropTypes.array,
        type: PropTypes.string
    }
    seeButton = () => {
        const { type } = this.props;
        if (type !== "home")
            return <TouchableOpacity onPress={() => { }}>
                <Text style={{ fontSize: RFValue(15.64), color: '#9246e6', marginRight: 15 }}>{"See all"}</Text>
            </TouchableOpacity>

    }
    render() {
        const { title, events, type } = this.props;
        return (
            <View style={{ width: '100%', paddingLeft: 20, marginTop: 15 }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.headingText]}>{title}</Text>
                    {this.seeButton()}
                </View>
                <View style={{ width: '100%' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={events}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => this.props.onPress(item)} style={{ alignItems: 'center', marginLeft: 5 }}>
                                <View style={styles.card}>
                                    <View style={styles.cartContainer}>
                                        <ImageBackground resizeMode='cover' source={{ uri: item.event_Information.event_image }} style={{ height: 200, width: 130, alignItems: 'center' }}>
                                            <Image source={{ uri: item.story_creater.image }} style={{ height: 30, width: 30, borderRadius: 15, marginTop: 120, borderWidth: 2, borderColor: '#8545C8', }} />
                                            <Text style={[styles.cartText, { color: '#fff', marginTop: 5, }]}>{item.story_creater.name}</Text>
                                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.descText, { paddingHorizontal: 8, paddingBottom: 5, color: '#fff' }]}>
                                                {item.event_Information.notes}
                                            </Text>
                                        </ImageBackground>
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
        fontSize: RFValue(15.64),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',

    },

});

export default events