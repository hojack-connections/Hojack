import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';
import * as EmailValidator from 'email-validator';

class SignupScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            warning: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isRegistered && nextProps.isRegistered) {
            this.props.navigation.navigate('LoginScreen');
        }
    }

    onSignup() {        
        if (!EmailValidator.validate(this.state.email)) {
            this.setState({ warning: 'Email is not valid' });
        } else {
            this.setState({ warning: '' });
            this.props.actions.signupRequest(this.state);
        }
    }

    onGotoLogin() {
        this.props.navigation.navigate('LoginScreen');
    }

    render() {
        const { error, isFetching } = this.props;
        const { warning, firstname, lastname, email, password } = this.state;

        return (
            <View style={Styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>First Name: </Text>
                        <TextInput 
                            style={styles.input} 
                            value={firstname}
                            onChangeText={(firstname) => this.setState({ firstname })}
                            autoCorrect={false}
                            autoCapitalize="words"
                            underlineColorAndroid="transparent"
                            placeholder="First Name"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Last Name: </Text>
                        <TextInput 
                            style={styles.input} 
                            value={lastname}
                            onChangeText={(lastname) => this.setState({ lastname })}
                            autoCorrect={false}
                            autoCapitalize="words"
                            underlineColorAndroid="transparent"
                            placeholder="Last Name"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Email: </Text>
                        <TextInput 
                            style={styles.input} 
                            value={email}
                            onChangeText={(email) => this.setState({ email })}
                            autoCapitalize="none"
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Password: </Text>
                        <TextInput 
                            secureTextEntry={true}
                            style={styles.input} 
                            value={password}
                            onChangeText={(password) => this.setState({ password })}
                            autoCapitalize="none"
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            placeholder="Password"
                        />
                    </View>
                    <View style={styles.errorField}>
                        <Text style={styles.errorLabel}>
                        {
                            warning !== '' ? warning : error ? error.data : null
                        }
                        </Text>
                    </View>
                    <Button
                        title="Register"
                        loading={isFetching}
                        disabled={firstname === '' || lastname === '' || email === '' || password === ''}
                        onPress={() => this.onSignup()}
                        titleStyle={styles.buttonTitle}
                        buttonStyle={styles.signupButton}
                        containerStyle={styles.buttonContainer}
                    />
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
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
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
        height: 40,
    },
    errorLabel: {
        fontSize: normalize(14),
        color: 'red',
    },
    buttonContainer: { 
        marginTop: 30,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    signupButton: {
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
