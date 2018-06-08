import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, FlatList, TouchableHighlight, } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/eventActions';
import * as attendeeActions from '../actions/attendeeActions';

import { Colors, Styles } from '../Themes/';

class EventsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Events',
        headerTitleStyle: Styles.nav.title,
        headerBackTitle: 'Back',
    });
    
    constructor(props) {
        super(props);
        
        this.reloadData = this.reloadData.bind(this);
    }

    componentDidMount() {
        this.reloadData();
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.events, nextProps.events)) {
            nextProps.events.map(event => {
                // get attendees of each event
                axios.get('http://localhost:7001/api/events/' + event._id + '/attendees', { params: {token: this.props.token} })
                .then(response => {
                    let payload = {};
                    payload[event._id] = response.data;
                    this.props.actions.loadAttendees(payload);
                })
                .catch(error => {
                    console.log(error);
                });
            });
        }
    }

    reloadData() {
        this.props.actions.getEventsRequest({ token: this.props.token });
        this.props.actions.getAttendeesRequest({ token: this.props.token });
    }

    _onItemClick(index, id) {
        this.props.navigation.navigate('EventSummaryScreen', { index, id });
    }

    render() {
        const { events, attendees, eventAttendees } = this.props;

        return (
            <View style={Styles.container}>
                <View style={styles.totalEventsContainer}>
                    <Text style={{ color: '#895353' }}>Total Attendees: {attendees.length}</Text>
                    <Text style={{ color: '#538989' }}>Total Events: {events.length}</Text>
                </View>
                <View style={styles.allEventsContainer}>
                    <Text>All Attendees</Text>
                    <Text style={{ color: '#34bd3e' }}>{attendees.length.toLocaleString()}</Text>
                    <Icon name="chevron-right" size={16} color={'#797979'} style={Styles.arrow} />
                </View>
                <FlatList
                    data={events}
                    extraData={eventAttendees}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableHighlight onPress={() => this._onItemClick(index, item._id)}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.eventDate}>{moment(item.date).format('MMM DD, YYYY')}</Text>
                                    <View style={styles.seperator}/>
                                    <View style={styles.subDetails}>
                                        <Text style={styles.categoryTitle}>{item.name}</Text>
                                        <Text style={{ color: item.isSubmitted ? '#34bd3e' : '#ff575c' }}>{eventAttendees[item._id] ? eventAttendees[item._id].length.toLocaleString() : '0'}</Text>
                                    </View>
                                    <Icon name="chevron-right" size={16} color={'#797979'} style={styles.arrow} />
                                </View>
                            </TouchableHighlight>
                        );
                    }}
                    // onEndReached={this.reloadData}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    totalEventsContainer: {
        height: 42,
        backgroundColor: Colors.darkBlack,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    allEventsContainer: {
        paddingHorizontal: 30,
        height: 44,
        marginBottom: 10,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemContainer: {
        // paddingHorizontal: 30, 
        paddingVertical: 10, 
        backgroundColor: Colors.white,
        height: 70,
        marginBottom: 10, 
    },
    eventDate: {
        marginLeft: 20,
        fontWeight: '700',
    },
    seperator: {
        backgroundColor: Colors.black,
        height: 1,
        width: '99%',
        marginLeft: 5,
        marginTop: 5, 
    },
    subDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 10, 
    },
    arrow: {
        position: 'absolute',
        right: 10,
        top: 44,
    },
});

const mapStateToProps = state => ({
    token: state.auth.token,
    events: state.event.events,
    attendees: state.attendee.attendees,
    eventAttendees: state.attendee.eventAttendees,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...eventActions, ...attendeeActions, }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
