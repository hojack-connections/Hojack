import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';
import { connect } from 'react-redux';

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
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            event: '',
            signature: '',
        };
    }

    componentWillMount() {
        this.setState({
            firstname: this.props.navigation.state.params.attendee.firstname,
            lastname: this.props.navigation.state.params.attendee.lastname,
            email: this.props.navigation.state.params.attendee.email,
            phone: this.props.navigation.state.params.attendee.phone,
            event: '',
            signature: '',
        });
    }

    onDelete() {

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputFields}>
                    <UserInput label={'First Name:'} value={this.state.firstname} onChangeText={(firstname) => this.setState({ firstname })} />
                    <UserInput label={'Last Name:'} value={this.state.lastname} onChangeText={(lastname) => this.setState({ lastname })} />
                    <UserInput label={'Email:'} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
                    <UserInput label={'Phone:'} value={this.state.phone} onChangeText={(phone) => this.setState({ phone })} />
                    <UserInput label={'Event:'} readOnly value={this.state.event} />
                </View>
                <View style={styles.signatureField}>
                    <Text style={styles.signatureLabel}>Signature:</Text>
                    <SignatureCapture
                        style={{ width: '100%', marginTop: 10, }}
                        showNativeButtons={true}
                        showBorder={false}
                        showTitleLabel={false}
                        viewMode={"landscape"}
                    />
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

const mapStateToProps = state => ({
    // connectivity: state.connectivity.connectivity,
});

export default connect(mapStateToProps, null)(AttendeeSummaryScreen);