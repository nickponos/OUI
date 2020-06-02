import React, { Component } from 'react';
import {
    Platform, FlatList, StyleSheet,
    Text, View, SafeAreaView, StatusBar,
    TouchableOpacity, ScrollView, Dimensions,
    Image
} from 'react-native';
import { Icon, CheckBox } from 'native-base'
// import { Actions } from 'react-native-router-flux';
import Button from '../../../components/button'
import { RFValue } from "react-native-responsive-fontsize"
import { ListItem } from "react-native-elements";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import screens from '../../../constants/screens';
import navigationService from '../../../navigation/navigationService';

const width = Dimensions.get('window').width


export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedgender: [],
            selected: [],
            filter_budget: [50, 200],
            filter_age: [18, 32],
            filter_distance:[1,70],
            events: true,
            eventList: [{
                "name": "Budget",
                "option": "Any",
            },
            {
                "name": "Date",
                "option": "Any",
            },
            {
                "name": "Location",
                "option": "Any",
            },
            {
                "name": "Host rating",
                "option": "Any",
            },
            {
                "name": "Category",
                "option": "Any",
            },
            {
                "name": "Gender diversity",
                "option": "Any",
            }],
            peopleList: [{
                "name": "Gender",
                "option": "Any"
            },
            {
                "name": "Age",
                "option": "Any"
            },
            {
                "name": "Distance",
                "option": "Any"
            },
            {
                "name": "Host rating",
                "option": "Any"
            }]
        }
        this._eventValue = this._eventValue.bind(this)
        this._peopleValue = this._peopleValue.bind(this)
    }

    _eventValue(type, data) {
        console.log('Event Data', data)
        this.setState(state => (this.state.eventList.find((search) => {
            if (search.name == type) {
                search.option = data
            }
        }), state))
    }
    _peopleValue(type, data) {
        console.log('People Data', data)
        this.setState(state => (this.state.peopleList.find((search) => {
            if (search.name == type) {
                search.option = data
            }
        }), state))
    }
    _filter(name, value) {
        if (name == 'Budget') {
            // Actions.FilterBudget({ event: this._eventValue, value: value })
            navigationService.navigate(screens.FILTER_BUDGET, { event: this._eventValue, value: value });
        }
        if (name == 'Date') {
            // Actions.FilterDate({ event: this._eventValue, value: value })
            navigationService.navigate(screens.FILTER_DATE, { event: this._eventValue, value: value });
        }
        if (name == 'Location') {
            // Actions.FilterLocation({ event: this._eventValue, value: value })
            navigationService.navigate(screens.FILTER_LOCATION, { event: this._eventValue, value: value });
        }
        if (name == 'Gender diversity') {
            // Actions.FilterDiversity({ event: this._eventValue, value: value })
            navigationService.navigate(screens.FILTER_DIVERSITY, { event: this._eventValue, value: value });
        }
        if (name == 'Category') {
            // Actions.FilterCategory({ event: this._eventValue, value: value })
            navigationService.navigate(screens.FILTER_CATEGORY, { event: this._eventValue, value: value });
        }
        if (name == 'Host rating') {
            // Actions.FilterHostRating({ event: this._eventValue, value: value })
            navigationService.navigate(screens.FILTER_HOSTRATING, { event: this._eventValue, value: value });
        }
        if (name == 'Gender') {
            // Actions.FilterGender({ people: this._peopleValue, value: value })
            navigationService.navigate(screens.FILTER_GENDER, { people: this._peopleValue, value: value });
        }
        if (name == 'Distance') {
            // Actions.FilterDistance({ people: this._peopleValue, value: value })
            navigationService.navigate(screens.FILTER_DISTANCE, { people: this._peopleValue, value: value });
        }
        if (name == 'Age') {
            // Actions.FilterAge({ people: this._peopleValue, value: value })
            navigationService.navigate(screens.FILTER_AGE, { people: this._peopleValue, value: value });
        }
    }
    _renderBudget = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Text style={{ color: '#000', fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Budget</Text>
                </View>
                <Text style={{ marginLeft: '5%', marginTop: 20, marginBottom: 20, color: '#000', fontSize: RFValue(13.6), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>{this.state.filter_budget[0]}€ - {this.state.filter_budget[1]}€</Text>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <MultiSlider
                        values={[this.state.filter_budget[0], this.state.filter_budget[1]]}
                        min={50}
                        max={3000}
                        onValuesChange={(value) => this.setState({ filter_budget: value })}
                        sliderLength={width - 30}
                        selectedStyle={{

                            backgroundColor: this.state.filter_budget[1] > 2000 ? "#FC6079" : "#9246e6",
                        }}
                        unselectedStyle={{
                            backgroundColor: "#F3F3F5",
                        }}
                        containerStyle={{
                            height: 40,
                        }}
                        trackStyle={{
                            height:3,
                            backgroundColor: "red",
                        }}
                        markerStyle={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            backgroundColor: this.state.filter_budget[1] > 2000 ? "#FC6079" : "#9246e6",
                            borderWidth: 0.5,
                            borderColor: this.state.filter_budget[1] > 2000 ? "#FC6079" : "#9246e6",
                            marginTop: 6
                        }}
                        touchDimensions={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            slipDisplacement: 40,
                        }}
                    />
                </View>
            </View>
        )
    }
    _renderDate = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Text style={{ color: '#000', fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Date</Text>
                </View>
                {this._dateList('Any')}
                {this._dateList('Today')}
                {this._dateList('Tomorrow')}
                {this._dateList('This week')}
                {this._dateList('This weekend')}
                {this._dateList('Next week')}
            </View>
        )
    }
    _dateList(title) {
        return (
            <TouchableOpacity onPress={() => this.setState({ selected: title }, () => this._date(title))} style={styles.genderSelectioncontainer}>
                <View style={{ flexDirection: 'row', marginLeft: '5%' }}>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View style={{ marginRight: '10%', paddingTop: 20, paddingBottom: 20 }}>
                    <CheckBox color='#8a4cea' checked={this.state.selected == title ? true : false} />
                </View>
            </TouchableOpacity>
        )
    }
    _renderList = (name, option) => {
        return (
            <TouchableOpacity onPress={() => { }}>
                <ListItem onPress={() => this._filter(name, option)}
                    roundAvatar
                    rightIcon={<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: RFValue(1.5), color: '#A9A8B6', marginBottom: 5 }} >{option}</Text>
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Icon
                                name="ios-arrow-forward"
                                size={14}
                                style={{ marginRight: 10, marginLeft: 10, color: '#A9A8B6', alignSelf: 'center' }}
                            />
                        </View>
                    </View>}
                    title={<Text style={{ fontSize: RFValue(13.6), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', color: '#000' }}>{name}</Text>}
                    containerStyle={{ borderBottomWidth: 1, borderColor: '#f2f3f5', height: 70, backgroundColor: 'white', justifyContent: 'center' }}
                />
            </TouchableOpacity>
        )
    }
    _rederRating = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Text style={{ color: '#000', fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Host rating</Text>
                </View>
                {this._renderStarList([1])}
                {this._renderStarList([1, 2])}
                {this._renderStarList([1, 2, 3])}
                {this._renderStarList([1, 2, 3, 4])}
                {this._renderStarList([1, 2, 3, 4, 5])}
            </View>
        )
    }
    _renderStarList(star) {
        const { selected } = this.state;
        return (
            <View style={styles.ratingView}>
                <View style={{ flexDirection: 'row' }}>
                    {star.map((index) =>
                        <Image key={index} style={{ width: 25, height: 25 }} source={require('@images/star.png')} />
                    )}
                </View>
                <View style={{ right: 10, }}>
                    <CheckBox color='#8a4cea'
                        checked={selected[star.length]}
                        onPress={() => {
                            if (selected[star.length])
                                this.setState(state => (selected[star.length] = !selected[star.length], state))
                            else {
                                this.setState(state => (selected[star.length] = true, state))
                            }
                        }}
                    />
                </View>
            </View>
        )
    }
    _renderGender = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <Text style={{ color: '#000', fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Gender</Text>
                </View>
                {this._genderList('Any')}
                {this._genderList('Female')}
                {this._genderList('Male')}
                {this._genderList('Other')}
            </View>
        )
    }
    _genderList(title) {
        return (
            <TouchableOpacity onPress={() => this.setState({ selected: title }, () => this._gender(title))} style={styles.genderSelectioncontainer}>
                <View style={styles.genderView}>
                    <Text style={styles.itemText}>{title}</Text>
                    <View style={{ right: 10, }}>
                        <CheckBox color='#8a4cea' checked={this.state.selectedgender == title ? true : false} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _renderEvents = () => {
        if (this.state.events)
            return (
                <ScrollView style={{ flex: 1 }}>

                    {this._renderBudget()}
                    {this._renderDate()}
                    {this._renderList("Location", "Any")}
                    {this._rederRating()}
                    {this._renderList("Category", "Any")}
                    {this._renderGender()}

                </ScrollView>
            )
        else return (<ScrollView style={{ flex: 1 }}>
            {this._renderGender()}
            {this._renderAge()}
            {this._renderList("Location", "Any")}
            {this._renderDistance()}
            {this._rederRating()}
        </ScrollView>

        )
    }
    _renderAge = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}> */}
                    <Text style={{marginLeft: '5%', color: '#000', fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Age</Text>
                    <Text style={{ marginLeft: '5%', marginTop: 20, marginBottom: 20, color: '#000', fontSize: RFValue(13.6), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>{this.state.filter_age[0]} - {this.state.filter_age[1]} y.o</Text>
                {/* </View> */}
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <MultiSlider
                        values={[this.state.filter_age[0], this.state.filter_age[1]]}
                        min={15}
                        max={100}
                        onValuesChange={(value) => this.setState({ filter_age: value })}
                        sliderLength={width - 30}
                        selectedStyle={{
                            backgroundColor: "#9246e6",
                        }}
                        unselectedStyle={{
                            backgroundColor: "#F3F3F5",
                        }}
                        containerStyle={{
                            height: 40,
                        }}
                        trackStyle={{
                            height: 3,
                            backgroundColor: "red",
                        }}
                        markerStyle={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            backgroundColor: '#9246e6',
                            borderWidth: 0.5,
                            borderColor: '#9246e6',
                            marginTop: 6
                        }}
                        touchDimensions={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            slipDisplacement: 40,
                        }}
                    />
                </View>
            </View>
        )
    }
    _renderDistance = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}> */}
                    <Text style={{marginLeft: '5%', color: '#000', fontSize: RFValue(14.96), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}>Distance</Text>
                    <Text style={{ marginLeft: '5%', marginTop: 20, marginBottom: 20, color: '#000', fontSize: RFValue(13.6), fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold', }}> {this.state.filter_distance[1]}km</Text>
                {/* </View> */}
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <MultiSlider
                        values={[this.state.filter_distance[0], this.state.filter_distance[1]]}
                        min={1}
                        max={150}
                        onValuesChange={(value) => this.setState({ filter_distance: value })}
                        sliderLength={width - 30}
                        selectedStyle={{
                            backgroundColor: "#9246e6",
                        }}
                        unselectedStyle={{
                            backgroundColor: "#F3F3F5",
                        }}
                        containerStyle={{
                            height: 40,
                        }}
                        trackStyle={{
                            height: 3,
                            backgroundColor: "red",
                        }}
                        markerStyle={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            backgroundColor: '#9246e6',
                            borderWidth: 0.5,
                            borderColor: '#9246e6',
                            marginTop: 6
                        }}
                        touchDimensions={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            slipDisplacement: 40,
                        }}
                    />
                </View>
            </View>
        )
    }
    
    render() {
        console.log('Event List', this.state.eventList)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
                <View style={styles.subContainerView}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#f2f3f5' }}>
                        <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ alignSelf: 'flex-start' }}>
                                <TouchableOpacity style={styles.backView}
                                    onPress={() => navigationService.pop()}>
                                    <Icon name='angle-left' type='FontAwesome' style={{ color: '#9246e6', fontSize: 35 }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headerText}>Filters</Text>
                            <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 30, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f5', borderRadius: 12 }}>
                        <TouchableOpacity onPress={() => { this.setState({ events: true }) }} style={[styles.eventBtn, { backgroundColor: this.state.events == true ? '#9246e6' : 'transparent' }]}>
                            <Text style={[styles.eventTxt, { color: this.state.events == true ? '#fff' : '#000' }]}>Events</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ events: false }) }} style={[styles.eventBtn, { backgroundColor: this.state.events == false ? '#9246e6' : 'transparent' }]}>
                            <Text style={[styles.eventTxt, { color: this.state.events == false ? '#fff' : '#000' }]}>People</Text>
                        </TouchableOpacity>
                    </View>
                    {this._renderEvents()}
                </View>

                <View style={styles.buttonView}>
                    <Button buttonText='Apply' onClick={() => { }} colors={['#a65ae1', '#8a4cea']} style={styles.buttoncontainer} />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainerView: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        height: '100%'
    },
    backView: {
        width: 30,
    },
    headerText: {
        height: 40,
        fontSize: RFValue(17),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Bold' : 'Lato Bold',
        color: '#000',
        marginTop: 8
    },
    clearText: {
        height: 40,
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',
        color: '#9246e6',
        marginTop: 12
    },
    eventBtn: {
        width: '50%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,

    },
    eventTxt: {
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-Regular' : 'Lato Regular',

    },
    buttonView: {
        height: 80,
        justifyContent: 'center',
        borderColor: '#f2f3f5',
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    genderSelectioncontainer: {
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        borderColor: '#f2f3f5',
        flexDirection: 'row'
    },
    text: {
        fontSize: RFValue(13.6),
        fontFamily: Platform.OS == 'ios' ? 'Lato-regular' : 'Lato Regular',
        color: '#000',
        paddingTop: 20,
        paddingBottom: 20
    },
    ratingView: {
        width: '90%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    genderView: {
        paddingHorizontal: 15,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
});
