import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
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

  onSave() {
    if (!EmailValidator.validate(this.state.email)) {
      this.setState({ warning: 'Email is not valid' });
    } else {
      this.setState({ warning: '' });
      this.refs.sign.saveImage();
    }
  }

  _onSaveEvent(result) {
    const payload = {
      ...this.state,
      signature: result.encoded,
      event: this.props.navigation.state.params.id,
      token: this.props.token,
    };
    this.props.actions.createAttendeeRequest(payload);
  }

  onLayout(e) {
    const { width, height } = Dimensions.get('window');
    this.setState({ signatureWidth: width - 50 });
  }

  render() {
    const { error, isCreating } = this.props;
    const { warning, firstname, lastname, email, phone } = this.state;

    return (
      <ScrollView onLayout={this.onLayout.bind(this)} style={styles.container}>
        <View style={styles.inputFields}>
          <UserInput
            label={'First Name:'}
            onChangeText={(firstname) => this.setState({ firstname })}
            placeholder={'First Name'}
            value={firstname}
          />
          <UserInput
            label={'Last Name:'}
            onChangeText={(lastname) => this.setState({ lastname })}
            placeholder={'Last Name'}
            value={lastname}
          />
          <UserInput
            label={'Email:'}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'Email'}
            value={email}
          />
          <UserInput
            label={'Phone:'}
            onChangeText={(phone) => this.setState({ phone })}
            placeholder={'Phone'}
            value={phone}
          />
          />
        </View>
        <View style={styles.signatureField}>
          <Text style={styles.signatureLabel}>Signature:</Text>
          <TouchableOpacity
            onPress={() => this.refs.sign.resetImage()}
            style={{ zIndex: 1, position: 'absolute', right: 10, top: 5 }}
            <Text style={{ color: 'blue', fontSize: 14, }}>Reset</Text>
          </TouchableOpacity>
          <SignatureCapture
            onSaveEvent={this._onSaveEvent}
            ref="sign"
            showBorder={false}
            showNativeButtons={false}
            showTitleLabel={false}
            style={{
              width: this.state.signatureWidth,
              paddingTop: 10,
              backgroundColor: 'transparent',
            }}
            viewMode={'portrait'}
          />
        </View>
        <View style={styles.errorField}>
          <Text style={styles.errorLabel}>
            {warning !== '' ? warning : error ? error.data : null}
          </Text>
        </View>
        {/*<TouchableOpacity style={styles.buttonContainer} onPress={() => this.onSave()}>
                    <View style={styles.saveButton}>
                        <Icon name={'check-circle'} size={25} color={Colors.white} />
                        <Text style={styles.buttonTitle}>Save Attendee</Text>
                    </View>
                </TouchableOpacity>*/}
        <Button
          buttonStyle={styles.saveButton}
          containerStyle={styles.buttonContainer}
          disabled={firstname === '' || lastname === '' || email === ''}
          icon={<Icon color={Colors.white} name="check-circle" size={25} />}
          loading={isCreating}
          onPress={() => this.onSave()}
          title="Save Attendee"
          titleStyle={styles.buttonTitle}
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
