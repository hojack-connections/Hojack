import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform, Alert, } from 'react-native';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/eventActions';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import _ from 'lodash';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';

var self;

class EventSummaryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Event',
        headerTintColor: '#00eaea',
        headerTitleStyle: Styles.nav.title,
        headerBackTitle: 'Back',
        headerRight:
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => self.onSubmit()}>
                <Icon name={'paper-plane'} color={'#00eaea'} size={20} />
                <Text style={{ color: '#00eaea', fontSize: normalize(15), marginLeft: 5, marginRight: 5, }}>Submit</Text>
            </TouchableOpacity>
    });
    
    constructor(props) {
        super(props);
        self = this;

        this.state = {
            name: '',
            date: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            courseNo: '',
            courseName: '',
            numberOfCourseCredits: 0,
            presenterName: '',
            trainingProvider: '',
            attendees: [],
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onAttendees = this.onAttendees.bind(this);
    }

    componentWillMount() {
        this.setState({
            name: this.props.event.name,
            date: new Date(this.props.event.date),
            address: this.props.event.address,
            city: this.props.event.city,
            state: this.props.event.state,
            zipcode: this.props.event.zipcode,
            courseNo: this.props.event.courseNo,
            courseName: this.props.event.courseName,
            numberOfCourseCredits: this.props.event.numberOfCourseCredits,
            presenterName: this.props.event.presenterName,
            trainingProvider: this.props.event.trainingProvider,
        });
    }

    onSubmit() {
        const { certReceivers, sheetReceivers } = this.props;

        Alert.alert(
            'Confirm',
            'Are you gonna submit this event?',
            [
              {text: 'No', onPress: () => {}, style: 'cancel'},
              {text: 'Yes', onPress: () => {
                axios.post('http://localhost:7001/api/events/submitEventById/' + this.props.navigation.state.params.id, 
                    {
                        token: this.props.token, 
                        certReceivers,
                        sheetReceivers,
                    }
                )
                .then(response => {
                    console.log('submit_event response = ', response);
                    Alert.alert('Success', 'Submitted this event successfully!');
                })
                .catch(error => {
                    console.log('submit_event response = ', error.response);
                });
              }},
            ],
            { cancelable: false }
        );
    }

    onDelete() {
        Alert.alert(
            'Confirm',
            'Do you really want to remove this event?',
            [
              {text: 'No', onPress: () => {}, style: 'cancel'},
              {text: 'Yes', onPress: () => {
                axios.delete('http://localhost:7001/api/events/' + this.props.navigation.state.params.id, {params: { token: this.props.token, }})
                .then(response => {
                    console.log('delete_event response = ', response);
                    this.props.actions.removeEvent({ index: this.props.navigation.state.params.index, id: this.props.navigation.state.params.id });
                    this.props.navigation.dispatch(NavigationActions.back());
                })
                .catch(error => {
                    console.log('delete_event response = ', error.response);
                });
              }},
            ],
            { cancelable: false }
        );
    }

    onAttendees(index, id) {
        this.props.navigation.navigate('EventAttendeesScreen', { index, id });
    }

    render() {
        const { event, attendees } = this.props;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputFields}>
                    <UserInput label={'Event Name:'} value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                    <UserInput label={'Date:'} datePicker value={this.state.date} onDateChanged={(date) => this.setState({ date })} />
                    <UserInput label={'Address:'} value={this.state.address} onChangeText={(address) => this.setState({ address })} />
                    <UserInput label={'City:'} value={this.state.city} onChangeText={(city) => this.setState({ city })} />
                    <UserInput label={'State:'} value={this.state.state} onChangeText={(state) => this.setState({ state })} />
                    <UserInput label={'Zip Code:'} value={this.state.zipcode} onChangeText={(zipcode) => this.setState({ zipcode })} />
                    <UserInput label={'Course #:'} value={this.state.courseNo} onChangeText={(courseNo) => this.setState({ courseNo })} />
                    <UserInput label={'Course Name:'} value={this.state.courseName} onChangeText={(courseName) => this.setState({ courseName })} />
                    <UserInput label={'Number of Course Credits:'} value={this.state.numberOfCourseCredits.toString()} onChangeText={(numberOfCourseCredits) => this.setState({ numberOfCourseCredits: parseInt(numberOfCourseCredits) })} />
                    <UserInput label={'Presenter Name:'} value={this.state.presenterName} onChangeText={(presenterName) => this.setState({ presenterName })} />
                    <UserInput label={'Training Provider:'} value={this.state.trainingProvider} onChangeText={(trainingProvider) => this.setState({ trainingProvider })} />
                    <UserInput label={'Attendees:'} readOnly arrow value={attendees.length.toString()} onClickEvent={() => this.onAttendees(this.props.navigation.state.params.index, event._id)} />
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onDelete()}>
                    <View style={styles.deleteButton}>
                        <Text style={styles.buttonTitle}>Delete Event</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
    },
    inputFields: {
        paddingLeft: 20,
        paddingTop: 10,
    },
    buttonContainer: { 
        justifyContent: 'center', 
        marginTop: 30, 
        marginBottom: 30, 
        flexDirection: 'row', 
    },
    deleteButton: {
        backgroundColor: '#ff575c', 
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

const mapStateToProps = (state, props) => ({
    token: state.auth.token,
    event: state.event.events[props.navigation.state.params.index] || {},
    attendees: state.attendee.eventAttendees[props.navigation.state.params.id] || [],
    certReceivers: state.settings.certReceivers,
    sheetReceivers: state.settings.sheetReceivers,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...eventActions, }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventSummaryScreen);
