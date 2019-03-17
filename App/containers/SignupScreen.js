import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';
import * as EmailValidator from 'email-validator';

import { inject, observer } from 'mobx-react';

export default
@inject('user', 'auth')
@observer
class SignupScreen extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    warning: '',
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isRegistered && nextProps.isRegistered) {
      this.props.navigation.navigate('LoginScreen');
    }
  }

  onSignup = () => {
    if (!EmailValidator.validate(this.state.email)) {
      this.setState({ warning: 'Email is not valid' });
    } else {
      this.setState({ warning: '' });
      this.props.user
        .signup(this.state)
        .then(() => {
          if (this.props.auth.authenticated) {
            this.props.navigation.navigate('App');
          }
        })
        .catch(() => {
          alert('There was a problem logging in. Please try again.');
        });
    }
  };

  onGotoLogin = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    const { error, isFetching } = this.props;
    const { warning, firstname, lastname, email, password } = this.state;

    return (
      <View style={Styles.container}>
        <StatusBar barStyle="dark-content" />
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
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(password) => this.setState({ password })}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              underlineColorAndroid="transparent"
              value={password}
            />
          </View>
          <View style={styles.errorField}>
            <Text style={styles.errorLabel}>
              {warning || (error && error.data)}
            </Text>
          </View>
          <Button
            title="Register"
            loading={isFetching}
            disabled={
              firstname === '' ||
              lastname === '' ||
              email === '' ||
              password === ''
            }
            onPress={this.onSignup}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.signupButton}
            containerStyle={styles.buttonContainer}
          />
          <TouchableOpacity
            onPress={this.onGotoLogin}
            style={{ marginTop: 10 }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                color: 'blue',
                textDecorationLine: 'underline',
              }}
            >
              Already registered? Go to LogIn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
