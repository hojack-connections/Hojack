import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import { Button } from 'react-native-elements';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as attendeeActions from '../actions/attendeeActions';
import * as EmailValidator from 'email-validator';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';

class AddAttendeeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Attendee',
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
      warning: '',
      signatureWidth: Dimensions.get('window').width - 50,
    };

    this.onSave = this.onSave.bind(this);
    this._onSaveEvent = this._onSaveEvent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.created && nextProps.created) {
      // created attendee successfully
      this.props.navigation.dispatch(NavigationActions.back());
    }
  }

  onSave = () => {
    if (!EmailValidator.validate(this.state.email)) {
      this.setState({ warning: 'Email is not valid' });
    } else {
      this.setState({ warning: '' });
      this.refs.sign.saveImage();
    }
  };

  _onSaveEvent(result) {
    const payload = {
      ...this.state,
      signature: result.encoded,
      event: this.props.navigation.state.params.id,
      token: this.props.token,
    };
    this.props.actions.createAttendeeRequest(payload);
  }

  onLayout = (e) => {
    const { width } = Dimensions.get('window');
    this.setState({ signatureWidth: width - 50 });
  };

  render() {
    const { error, isCreating } = this.props;
    const { warning, firstname, lastname, email, phone } = this.state;

    return (
      <ScrollView style={styles.container} onLayout={this.onLayout}>
        <View style={styles.inputFields}>
          <UserInput
            label={'First Name:'}
            placeholder={'First Name'}
            value={firstname}
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <UserInput
            label={'Last Name:'}
            placeholder={'Last Name'}
            value={lastname}
            onChangeText={(lastname) => this.setState({ lastname })}
          />
          <UserInput
            label={'Email:'}
            placeholder={'Email'}
            value={email}
            onChangeText={(email) => this.setState({ email })}
          />
          <UserInput
            label={'Phone:'}
            placeholder={'Phone'}
            value={phone}
            onChangeText={(phone) => this.setState({ phone })}
          />
        </View>
        <View style={styles.signatureField}>
          <Text style={styles.signatureLabel}>Signature:</Text>
          <TouchableOpacity
            style={{ zIndex: 1, position: 'absolute', right: 10, top: 5 }}
            onPress={() => {
              this.refs.sign.resetImage();
            }}
          >
            <Text style={{ color: 'blue', fontSize: 14 }}>Reset</Text>
          </TouchableOpacity>
          <SignatureCapture
            ref="sign"
            style={{
              width: this.state.signatureWidth,
              paddingTop: 10,
              backgroundColor: 'transparent',
            }}
            showNativeButtons={false}
            showBorder={false}
            showTitleLabel={false}
            viewMode={'portrait'}
            onSaveEvent={this._onSaveEvent}
          />
        </View>
        <View style={styles.errorField}>
          <Text style={styles.errorLabel}>
            {warning || (error && error.data)}
          </Text>
        </View>
        <Button
          title="Save Attendee"
          disabled={firstname === '' || lastname === '' || email === ''}
          loading={isCreating}
          icon={<Icon name="check-circle" size={25} color={Colors.white} />}
          onPress={this.onSave}
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.saveButton}
          containerStyle={styles.buttonContainer}
        />
      </ScrollView>
    );
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
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  signatureLabel: {
    backgroundColor: Colors.white,
    padding: 5,
    fontSize: 16,
    fontWeight: '700',
    position: 'absolute',
    left: 10,
    top: Platform.OS === 'ios' ? -16 : -12,
    zIndex: 999,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  saveButton: {
    borderRadius: 10,
    width: '100%',
    height: 60,
  },
  buttonTitle: {
    marginLeft: 10,
    fontSize: normalize(20),
    color: Colors.white,
  },
  errorField: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  errorLabel: {
    fontSize: normalize(14),
    color: 'red',
  },
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  error: state.attendee.error,
  created: state.attendee.created,
  isCreating: state.attendee.isCreating,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...attendeeActions }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAttendeeScreen);
