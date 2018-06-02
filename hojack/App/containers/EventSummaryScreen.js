import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';

class EventSummaryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Event',
        headerTintColor: '#00eaea',
        headerTitleStyle: Styles.nav.title,
        headerBackTitle: 'Back',
        headerRight:
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Icon name={'paper-plane'} color={'#00eaea'} size={20} />
                <Text style={{ color: '#00eaea', fontSize: normalize(15), marginLeft: 5, marginRight: 5, }}>Submit</Text>
            </TouchableOpacity>
    });
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            date: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            courseNo: '',
            courseName: '',
            attendees: '0',
        };
    }

    componentWillMount() {
        this.setState({
            name: this.props.navigation.state.params.event.name,
            date: new Date(this.props.navigation.state.params.event.date),
            address: this.props.navigation.state.params.event.address,
            city: this.props.navigation.state.params.event.city,
            state: this.props.navigation.state.params.event.state,
            zipcode: this.props.navigation.state.params.event.zipcode,
            courseNo: this.props.navigation.state.params.event.courseNo,
            courseName: this.props.navigation.state.params.event.courseName,
            attendees: this.props.navigation.state.params.attendees,
        });
    }

    onSubmit() {
        
    }

    onDelete() {

    }

    onAttendees(event) {
        this.props.navigation.navigate('EventAttendeesScreen', { event, attendees: this.state.attendees });
    }

    render() {
        console.log(this.props.navigation.state.params);
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
                    <UserInput label={'Attendees:'} readOnly arrow value={this.state.attendees ? this.state.attendees.length.toString() : '0'} onClickEvent={() => this.onAttendees(this.props.navigation.state.params.event)} />
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

const mapStateToProps = state => ({
    // connectivity: state.connectivity.connectivity,
});

export default connect(mapStateToProps, null)(EventSummaryScreen);