import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, Image, Platform, } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';

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
        this.props.navigation.navigate('AddAttendeeScreen');
    }

    render() {
        const { event } = this.props.navigation.state.params;

        const attendeesList = [
            {
                id: '0',
                firstName: 'Rick Bortle',
                exist: true,
            },
            {
                id: '1',
                firstName: 'Bill Brasky',
                exist: true,
            },
            {
                id: '2',
                firstName: 'Greg Chalmers',
                exist: false,
            },
        ];

        return (
            <View style={Styles.container}>
                <View style={styles.totalEventsContainer}>
                    <Text style={{ color: '#895353' }}>Total Attendees: {event.attendees}</Text>
                </View>
                <View style={styles.eventNameContainer}>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: '700', }}>{event.name}</Text>
                </View>
                <View style={styles.eventDateContainer}>
                    <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '700', }}>{event.date}</Text>
                </View>
                <FlatList
                    data={attendeesList}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableHighlight onPress={() => this._onItemClick(item)}>
                                <View style={styles.listItemContainer}>
                                    <Icon name={item.exist ? "check-square" : "minus-square"} size={18} color={item.exist ? '#34bd3e' : '#ff575c'} />
                                    <Text style={styles.name}>{item.firstName}</Text>
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
