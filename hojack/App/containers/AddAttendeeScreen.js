import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as attendeeActions from '../actions/attendeeActions';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';

class AddAttendeeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Add Attendee',
        headerTintColor: '#00eaea',
        headerTitleStyle: Styles.nav.title,
        headerBackTitle: 'Back',
    });
    
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
        };

        this.onSave = this.onSave.bind(this);
        this._onSaveEvent = this._onSaveEvent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.created && nextProps.created) { // created attendee successfully
            this.props.navigation.dispatch(NavigationActions.back());
        }
    }

    onSave() {
        this.refs["sign"].saveImage();
    }

    _onSaveEvent(result) {
        const payload = {
            ...this.state,
            signature: result.encoded,
            event: this.props.navigation.state.params.id,
            token: this.props.token,
        };
        this.props.actions.createAttendeeRequest(payload);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputFields}>
                    <UserInput label={'First Name:'} value={this.state.firstname} onChangeText={(firstname) => this.setState({ firstname })} />
                    <UserInput label={'Last Name:'} value={this.state.lastname} onChangeText={(lastname) => this.setState({ lastname })} />
                    <UserInput label={'Email:'} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
                    <UserInput label={'Phone:'} value={this.state.phone} onChangeText={(phone) => this.setState({ phone })} />
                </View>
                <View style={styles.signatureField}>
                    <Text style={styles.signatureLabel}>Signature:</Text>
                    <SignatureCapture
                        ref="sign"
                        style={{ width: '100%', marginTop: 10, }}
                        showNativeButtons={true}
                        showBorder={false}
                        showTitleLabel={false}
                        viewMode={"landscape"}
                        onSaveEvent={this._onSaveEvent}
                    />
                </View>
                <View style={styles.errorField}>
                    <Text style={styles.errorLabel}>
                    {
                        this.props.error && this.props.error.data
                    }
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onSave()}>
                    <View style={styles.saveButton}>
                        <Icon name={'check-circle'} size={25} color={Colors.white} />
                        <Text style={styles.buttonTitle}>Save Attendee</Text>
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
        fontSize: 16, 
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
    saveButton: {
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
    errorField: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorLabel: {
        fontSize: normalize(14),
        color: 'red',
    },
});

const mapStateToProps = state => ({
    token: state.auth.token,
    error: state.attendee.error,
    created: state.attendee.created,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...attendeeActions, }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendeeScreen);
