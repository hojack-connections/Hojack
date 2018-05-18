import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';
import { connect } from 'react-redux';

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
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            signature: '',
        };
    }

    onSave() {

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputFields}>
                    <UserInput label={'First Name:'} value={this.state.firstName} onChangeText={(firstName) => this.setState({ firstName })} />
                    <UserInput label={'Last Name:'} value={this.state.lastName} onChangeText={(lastName) => this.setState({ lastName })} />
                    <UserInput label={'Email:'} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
                    <UserInput label={'Phone:'} value={this.state.phone} onChangeText={(phone) => this.setState({ phone })} />
                </View>
                <View style={styles.signatureField}>
                    <SignatureCapture
                        style={{ width: '90%', }}
                        showNativeButtons={true}
                        showTitleLabel={true}
                        viewMode={"landscape"}
                    />
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
        marginTop: 30,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center',
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
});

const mapStateToProps = state => ({
    // connectivity: state.connectivity.connectivity,
});

export default connect(mapStateToProps, null)(AddAttendeeScreen);