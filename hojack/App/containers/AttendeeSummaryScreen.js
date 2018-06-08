import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform, Image, Alert, } from 'react-native';
import axios from 'axios';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as attendeeActions from '../actions/attendeeActions';
import { NavigationActions } from 'react-navigation';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';

class AttendeeSummaryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Attendee',
        headerTintColor: '#00eaea',
        headerTitleStyle: Styles.nav.title,
        headerBackTitle: 'Back',
    });
    
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        Alert.alert(
            'Confirm',
            'Do you really want to remove this attendee?',
            [
              {text: 'No', onPress: () => {}, style: 'cancel'},
              {text: 'Yes', onPress: () => {
                axios.delete('http://localhost:7001/api/attendees/' + this.props.attendee._id, {params: { token: this.props.token, }})
                .then(response => {
                    console.log('delete_attendee response = ', response);
                    this.props.actions.removeAttendee({ event: this.props.navigation.state.params.id, attendee: this.props.navigation.state.params.attendee, attendeeIndex: this.props.navigation.state.params.attendeeIndex, });
                    this.props.navigation.dispatch(NavigationActions.back());
                })
                .catch(error => {
                    console.log('delete_attendee response = ', error.response);
                });
              }},
            ],
            { cancelable: false }
        );
    }

    render() {
        const { event, attendee } = this.props;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputFields}>
                    <UserInput label={'First Name:'} readOnly value={attendee.firstname} />
                    <UserInput label={'Last Name:'} readOnly value={attendee.lastname} />
                    <UserInput label={'Email:'} readOnly value={attendee.email} />
                    <UserInput label={'Phone:'} readOnly value={attendee.phone} />
                    <UserInput label={'Event:'} readOnly value={event.name} />
                </View>
                <View style={styles.signatureField}>
                    <Text style={styles.signatureLabel}>Signature:</Text>
                    {/* <SignatureCapture
                        style={{ width: '100%', marginTop: 10, }}
                        showNativeButtons={true}
                        showBorder={false}
                        showTitleLabel={false}
                        viewMode={"landscape"}
                    /> */}
                    {
                        attendee.signature !== '' && 
                        <Image source={{uri: attendee.signature}} style={{ width: '100%', height: '100%', }} />
                    }
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onDelete()}>
                    <View style={styles.deleteButton}>
                        <Text style={styles.buttonTitle}>Delete Attendee</Text>
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
    signatureField: {
        height: 100,
        width: '90%',
        marginLeft: '5%',
        marginTop: 30,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        position: 'relative',
    },
    signatureLabel: { 
        backgroundColor: Colors.white, 
        padding: 5, 
        fontSize: normalize(16), 
        fontWeight: '700', 
        position: 'absolute', 
        left: 10, 
        top: -16, 
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
    event: state.event.events[props.navigation.state.params.event] || {},
    attendee: state.attendee.eventAttendees[props.navigation.state.params.id][props.navigation.state.params.attendee] || {},
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...attendeeActions, }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeSummaryScreen);