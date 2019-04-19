import React, { Component } from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  Keyboard,
  Platform,
} from 'react-native'
import { Button } from 'react-native-elements'
import normalize from '../helpers/normalizeText'
import { Colors } from '../Themes/'
import { inject, observer } from 'mobx-react'
import { VFlex, HFlex } from '../components/Shared'

export default
@inject('user', 'auth')
@observer
class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  }

  passwordTextInputRef

  keyboardDidShow = () => this.setState({ keyboardVisible: true })
  keyboardDidHide = () => this.setState({ keyboardVisible: false })

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount() {
    Keyboard.removeListener(this.keyboardDidHide)
    Keyboard.removeListener(this.keyboardDidShow)
  }

  onLogin = () => {
    this.setState({ isLoading: true })
    this.props.user
      .login(this.state)
      .then(() => {
        this.setState({ isLoading: false })
        if (this.props.auth.authenticated) {
          this.props.navigation.navigate('App')
        }
      })
      .catch(() => {
        alert('There was a problem logging in. Please try again.')
        this.setState({ isLoading: false })
      })
  }

  onBacktoSignup = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <VFlex
        style={{
          alignItems: 'flex-start',
          padding: 8,
          marginTop: Platform.OS === 'ios' ? 20 : 0,
        }}
      >
        {this.state.keyboardVisible ? null : (
          <Image
            source={require('../../assets/gocert.jpg')}
            resizeMode="contain"
            style={{
              minHeight: 100,
              maxHeight: 150,
              flex: 1,
              alignSelf: 'center',
              marginTop: 60,
              marginBottom: 30,
            }}
          />
        )}
        <Text style={{ marginBottom: 10, fontSize: 28, width: '100%' }}>
          Sign In
        </Text>
        <HFlex>
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
        </HFlex>
        <HFlex>
          <TextInput
            ref={(input) => {
              this.passwordTextInputRef = input
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
            returnKeyType="done"
          />
        </HFlex>
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
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 12,
    backgroundColor: Colors.gray,
    marginBottom: 15,
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
})
