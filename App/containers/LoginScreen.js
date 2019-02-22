import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';
import * as EmailValidator from 'email-validator';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      warning: '',
    };
  }

  onLogin = () => {
    if (!EmailValidator.validate(this.state.email)) {
      this.setState({ warning: 'Email is not valid' });
    } else {
      this.setState({ warning: '' });
      this.props.actions.loginRequest(this.state);
    }
  };

  onBacktoSignup = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { error, isFetching } = this.props;
    const { warning, email, password } = this.state;

    return (
      <View style={Styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.inputField}>
            <Text style={styles.label}>Email: </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(email) => this.setState({ email })}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.label}>Password: </Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={(password) => this.setState({ password })}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="password"
            />
          </View>
          <View style={styles.errorField}>
            <Text style={styles.errorLabel}>
              {warning !== '' ? warning : error ? error.data : null}
            </Text>
          </View>
          <Button
            title="Log In"
            disabled={email === '' || password === ''}
            loading={isFetching}
            onPress={this.onLogin}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.loginButton}
            containerStyle={styles.buttonContainer}
          />
          <TouchableOpacity
            onPress={this.onBacktoSignup}
            style={{ marginTop: 10 }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                color: 'blue',
                textDecorationLine: 'underline',
              }}
            >
              Go to SignUp
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
  loginButton: {
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

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isFetching: state.auth.isFetching,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
