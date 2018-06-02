import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, Image, Platform, } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import moment from 'moment';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';

class EventAttendeesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Attendees',
        headerTitleStyle: Styles.nav.title,
        headerTintColor: '#00eaea',
        headerBackTitle: 'Back',
    });
    
    _onItemClick(attendee) {
        this.props.navigation.navigate('AttendeeSummaryScreen', { attendee });
    }

    _onAddClick() {
        this.props.navigation.navigate('AddAttendeeScreen', { event: this.props.navigation.state.params.event._id });
    }

    render() {
        const { event, attendees } = this.props.navigation.state.params;

        return (
            <View style={Styles.container}>
                <View style={styles.totalEventsContainer}>
                    <Text style={{ color: '#895353' }}>Total Attendees: {attendees.length}</Text>
                </View>
                <View style={styles.eventNameContainer}>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: '700', }}>{event.name}</Text>
                </View>
                <View style={styles.eventDateContainer}>
                    <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '700', }}>{moment(event.date).format('MMM DD, YYYY')}</Text>
                </View>
                <FlatList
                    data={attendees}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableHighlight onPress={() => this._onItemClick(item)}>
                                <View style={styles.listItemContainer}>
                                    <Icon name={item.isFilled ? "check-square" : "minus-square"} size={18} color={item.isFilled ? '#34bd3e' : '#ff575c'} />
                                    <Text style={styles.name}>{item.firstname} {item.lastname}</Text>
                                    <Icon name="chevron-right" size={16} color={'#797979'} style={styles.arrow} />
                                </View>
                            </TouchableHighlight>
                        );
                    }}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this._onAddClick()}>
                    <View style={styles.addButton}>
                        <Icon name={'plus-circle'} size={25} color={Colors.white} />
                        <Text style={styles.buttonTitle}>Add Attendee</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    totalEventsContainer: {
        height: 42,
        backgroundColor: Colors.darkBlack,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20, 
    },
    eventNameContainer: {
        height: 43,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10, 
        marginBottom: 10,
    },
    eventDateContainer: {
        height: 24,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        paddingVertical: 10, 
        paddingHorizontal: 10, 
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    name: {
        marginLeft: 10, 
    },
    arrow: {
        position: 'absolute',
        right: 10,
        top: 13,
    },
    buttonContainer: { 
        justifyContent: 'center', 
        marginTop: 30, 
        marginBottom: 30, 
        flexDirection: 'row', 
    },
    addButton: {
        backgroundColor: '#00eaea', 
        borderRadius: 10, 
        width: '90%', 
        height: 60, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row',
    },
    buttonTitle: { 
        marginLeft: 10, 
        fontSize: normalize(20), 
        color: Colors.white, 
    },
});

export default EventAttendeesScreen;
