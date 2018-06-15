import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';

class SignupScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isRegistered && nextProps.isRegistered) {
            this.props.navigation.navigate('LoginScreen');
        }
    }

    onSignup() {
        this.props.actions.signupRequest(this.state);
    }

    onGotoLogin() {
        this.props.navigation.navigate('LoginScreen');
    }

    render() {
        const { error } = this.props;
        return (
            <View style={Styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>First Name: </Text>
                        <TextInput 
                            style={styles.input} 
                            value={this.state.firstname}
                            onChangeText={(firstname) => this.setState({ firstname })}
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            placeholder="First Name"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Last Name: </Text>
                        <TextInput 
                            style={styles.input} 
                            value={this.state.lastname}
                            onChangeText={(lastname) => this.setState({ lastname })}
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            placeholder="Last Name"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Email: </Text>
                        <TextInput 
                            style={styles.input} 
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            placeholder="Email"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Password: </Text>
                        <TextInput 
                            secureTextEntry={true}
                            style={styles.input} 
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            placeholder="Password"
                        />
                    </View>
                    <View style={styles.errorField}>
                        <Text style={styles.errorLabel}>
                        {
                            error && error.data
                        }
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onSignup()}>
                        <View style={styles.signupButton}>
                            <Text style={styles.buttonTitle}>Register</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10, }} onPress={() => this.onGotoLogin()}>
                        <Text style={{ fontSize: normalize(14), color: 'blue', textDecorationLine: 'underline', }}>Already registered? Go to LogIn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 30, 
    },
    inputField: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black,
        height: 46, 
        marginBottom: 10, 
    },
    input: {
        marginLeft: 15, 
        flex: 1,
    },
    label: {
        fontSize: normalize(16),
        width: 120,
    },
    errorField: {
        justifyContent: 'center',
    },
    errorLabel: {
        fontSize: normalize(14),
        color: 'red',
    },
    buttonContainer: { 
        justifyContent: 'center', 
        marginTop: 30, 
        flexDirection: 'row', 
    },
    signupButton: {
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
    error: state.auth.error,
    isFetching: state.auth.isFetching,
    isRegistered: state.auth.isRegistered,
});

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({ ...authActions, }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
