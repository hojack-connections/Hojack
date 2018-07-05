import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform, Image, Alert, } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as attendeeActions from '../actions/attendeeActions';
import { NavigationActions } from 'react-navigation';

import API_BASE_URL from '../sagas/config';
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

        this.state = {
            isUpdating: false,
            isDeleting: false,
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
        };
    }

    componentDidMount() {
        this.setState({
            firstname: this.props.attendee.firstname,
            lastname: this.props.attendee.lastname,
            email: this.props.attendee.email,
            phone: this.props.attendee.phone,
        });
    }

    onUpdate() {
        this.setState({ isUpdating: true });
        axios.put(API_BASE_URL.attendee + '/' + this.props.attendee._id, 
        {
            token: this.props.token,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
        })
        .then(response => {
            console.log('update_attendee response = ', response);
            this.setState({ isUpdating: false });
            this.props.actions.updateAttendee({ event: this.props.navigation.state.params.id, attendee: this.props.navigation.state.params.attendee, attendeeIndex: this.props.navigation.state.params.attendeeIndex, response: response.data });
            this.props.navigation.dispatch(NavigationActions.back());
        })
        .catch(error => {
            console.log('update_attendee error = ', error.response);
            this.setState({ isUpdating: false });
        });
    }
    
    onDelete() {
        Alert.alert(
            'Confirm',
            'Do you really want to remove this attendee?',
            [
              {text: 'No', onPress: () => {}, style: 'cancel'},
              {text: 'Yes', onPress: () => {
                this.setState({ isDeleting: true });
                axios.delete(API_BASE_URL.attendee + '/' + this.props.attendee._id, {params: { token: this.props.token, }})
                .then(response => {
                    console.log('delete_attendee response = ', response);
                    this.setState({ isDeleting: false });
                    this.props.actions.removeAttendee({ event: this.props.navigation.state.params.id, attendee: this.props.navigation.state.params.attendee, attendeeIndex: this.props.navigation.state.params.attendeeIndex, });
                    this.props.navigation.dispatch(NavigationActions.back());
                })
                .catch(error => {
                    console.log('delete_attendee response = ', error.response);
                    this.setState({ isDeleting: false });
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
                    <UserInput label={'First Name:'} value={this.state.firstname} onChangeText={(firstname) => this.setState({ firstname })} />
                    <UserInput label={'Last Name:'} value={this.state.lastname} onChangeText={(lastname) => this.setState({ lastname })} />
                    <UserInput label={'Email:'} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
                    <UserInput label={'Phone:'} value={this.state.phone} onChangeText={(phone) => this.setState({ phone })} />
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
                {/*<TouchableOpacity style={styles.buttonContainer} onPress={() => this.onDelete()}>
                    <View style={styles.deleteButton}>
                        <Text style={styles.buttonTitle}>Delete Attendee</Text>
                    </View>
                </TouchableOpacity>*/}
                <Button
                    title="Update Attendee"
                    loading={this.state.isUpdating}
                    // icon={
                    //     <Icon
                    //       name='pencil'
                    //       size={25}
                    //       color={Colors.white}
                    //     />
                    // }
                    onPress={() => this.onUpdate()}
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.updateButton}
                    containerStyle={styles.buttonContainer}
                />
                <Button
                    title="Delete Attendee"
                    loading={this.state.isDeleting}
                    // icon={
                    //     <Icon
                    //       name='check-circle'
                    //       size={25}
                    //       color={Colors.white}
                    //     />
                    // }
                    onPress={() => this.onDelete()}
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.deleteButton}
                    containerStyle={styles.buttonContainer}
                />
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
        marginLeft: 20,
        marginRight: 20,
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
        marginTop: 15, 
        marginBottom: 15,
        flexDirection: 'column', 
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    updateButton: {
        borderRadius: 10, 
        width: '100%', 
        height: 60,
    },
    deleteButton: {
        backgroundColor: '#ff575c',
        borderRadius: 10, 
        width: '100%', 
        height: 60,
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