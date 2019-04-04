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
class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  passwordTextInputRef;

  onLogin = () => {
    this.setState({ isLoading: true });
    this.props.user
      .login(this.state)
      .then(() => {
        this.setState({ isLoading: false });
        if (this.props.auth.authenticated) {
          this.props.navigation.navigate('App');
        }
      })
      .catch(() => {
        alert('There was a problem logging in. Please try again.');
        this.setState({ isLoading: false });
      });
  };

  onBacktoSignup = () => {
    this.props.navigation.goBack();
  };

  render() {
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
              flex: 1,
              alignSelf: 'center',
              marginTop: 60,
              marginBottom: 30,
            }}
          />
          <Text style={{ marginBottom: 10, fontSize: 28, width: '100%' }}>
            Sign In
          </Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              value={this.props.email}
              onChangeText={(email) => this.setState({ email })}
              onSubmitEditing={() => this.passwordTextInputRef.focus()}
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
              ref={(input) => {
                this.passwordTextInputRef = input;
              }}
              secureTextEntry
              style={styles.input}
              value={this.props.password}
              onChangeText={(password) => this.setState({ password })}
              onSubmitEditing={this.onLogin}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="Password"
              returnKeyType="go"
            />
          </View>
          <Button
            title="Log In"
            disabled={this.props.email === '' || this.props.password === ''}
            loading={this.state.isLoading}
            onPress={this.onLogin}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.loginButton}
            containerStyle={styles.buttonContainer}
          />
          <HFlex style={{ justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 18 }}>No account?</Text>
            <Text
              style={{
                color: 'blue',
                marginLeft: 8,
                fontSize: 18,
              }}
              onPress={this.onBacktoSignup}
            >
              Create One!
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
  loginButton: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: Colors.purple,
  },
  buttonTitle: {
    fontSize: normalize(20),
    color: Colors.white,
  },
});
