import React, { Component } from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native'
import { Button } from 'react-native-elements'
import normalize from '../helpers/normalizeText'
import { Colors } from '../Themes/'
import { inject, observer } from 'mobx-react'
import { VFlex, HFlex } from '../components/Shared'

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
    keyboardVisible: false,
  }

  lastNameTextInputRef = React.createRef()
  emailTextInputRef = React.createRef()
  passwordTextInputRef = React.createRef()

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

  onSignup = () => {
    this.setState({ isLoading: true })
    this.props.user
      .signup(this.state)
      .then(() => {
        this.setState({ isLoading: false })
        if (this.props.auth.authenticated) {
          this.props.navigation.navigate('App')
        }
      })
      .catch(() => {
        this.setState({ isLoading: false })
        alert('There was a problem creating your account. Please try again.')
      })
  }

  onGotoLogin = () => {
    console.log('go to login')
    this.props.navigation.navigate('LoginScreen')
  }

  render() {
    const { firstname, lastname, email, password } = this.state
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
              alignSelf: 'center',
              flex: this.state.keyboardVisible ? 0 : 1,
              marginTop: 30,
              marginBottom: 30,
            }}
          />
        )}
        <Text style={{ marginBottom: 10, fontSize: 28, width: '100%' }}>
          Create Account
        </Text>
        <HFlex>
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
        </HFlex>
        <HFlex>
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
        </HFlex>
        <HFlex>
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
        </HFlex>
        <HFlex>
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
        </HFlex>
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
          <TouchableOpacity onPress={this.onGotoLogin}>
            <Text
              style={{
                color: 'blue',
                marginLeft: 8,
                fontSize: 18,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </HFlex>
      </VFlex>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Colors.gray,
    marginBottom: 15,
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
})
