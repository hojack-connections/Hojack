import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';
import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';
import { inject, observer } from 'mobx-react';
import { VFlex, HFlex } from '../components/Shared';

export default
@inject('user', 'auth')
@observer
class SignupScreen extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    isLoading: false,
  };

  lastNameTextInputRef = React.createRef();
  emailTextInputRef = React.createRef();
  passwordTextInputRef = React.createRef();

  onSignup = () => {
    this.setState({ isLoading: true });
    this.props.user
      .signup(this.state)
      .then(() => {
        this.setState({ isLoading: false });
        if (this.props.auth.authenticated) {
          this.props.navigation.navigate('App');
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
        alert('There was a problem creating your account. Please try again.');
      });
  };

  onGotoLogin = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    const { firstname, lastname, email, password } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="position"
        style={{ margin: 8, height: '100%' }}
      >
        <VFlex style={{ alignItems: 'flex-start', height: '100%' }}>
          <Image
            source={require('../../assets/gocert.jpg')}
            resizeMode="contain"
            style={{
              maxHeight: 150,
              alignSelf: 'center',
              flex: 1,
              marginTop: 60,
              marginBottom: 30,
            }}
          />
          <Text style={{ marginBottom: 10, fontSize: 28, width: '100%' }}>
            Create Account
          </Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              value={firstname}
              onChangeText={(firstname) => this.setState({ firstname })}
              onSubmitEditing={() => this.lastNameTextInputRef.current.focus()}
              autoCorrect={false}
              autoCapitalize="words"
              underlineColorAndroid="transparent"
              placeholder="First Name"
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              ref={this.lastNameTextInputRef}
              style={styles.input}
              value={lastname}
              onChangeText={(lastname) => this.setState({ lastname })}
              onSubmitEditing={() => this.emailTextInputRef.current.focus()}
              autoCorrect={false}
              autoCapitalize="words"
              underlineColorAndroid="transparent"
              placeholder="Last Name"
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              ref={this.emailTextInputRef}
              style={styles.input}
              value={email}
              onChangeText={(email) => this.setState({ email })}
              onSubmitEditing={() => this.passwordTextInputRef.current.focus()}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              ref={this.passwordTextInputRef}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(password) => this.setState({ password })}
              onSubmitEditing={this.onSignup}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              underlineColorAndroid="transparent"
              value={password}
              returnKeyType="done"
            />
          </View>
          <Button
            title="Sign Up"
            loading={this.state.isLoading}
            onPress={this.onSignup}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.signupButton}
            containerStyle={styles.buttonContainer}
          />
          <HFlex style={{ justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 18 }}>Already have an account?</Text>
            <Text
              style={{
                color: 'blue',
                marginLeft: 8,
                fontSize: 18,
              }}
              onPress={this.onGotoLogin}
            >
              Login
            </Text>
          </HFlex>
        </VFlex>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: Colors.gray,
  },
  input: {
    flex: 1,
    paddingLeft: 8,
  },
  buttonContainer: {
    marginBottom: 15,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  signupButton: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: Colors.purple,
    height: 50,
  },
  buttonTitle: {
    fontSize: normalize(20),
    color: Colors.white,
  },
});
