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

    onSignup() {
        this.props.actions.signupRequest(this.state);
    }

    onGotoLogin() {
        this.props.navigation.navigate('LoginScreen');
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput 
                            style={styles.input} 
                            value={this.state.firstname}
                            onChangeText={(firstname) => this.setState({ firstname })}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput 
                            style={styles.input} 
                            value={this.state.lastname}
                            onChangeText={(lastname) => this.setState({ lastname })}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            style={styles.input} 
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput 
                            secureTextEntry={true}
                            style={styles.input} 
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                            underlineColorAndroid="transparent"
                        />
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
});

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({ ...authActions, }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
