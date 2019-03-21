import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';
import { NavigationActions } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Cell from '../components/Cell';
import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';

export default
@inject('event', 'auth', 'attendee')
@observer
class AddAttendeeScreen extends Component {
  static navigationOptions = () => ({
    title: 'Add Attendee',
  });

  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };

  signatureRef = React.createRef();

  componentWillReceiveProps(nextProps) {
    if (!this.props.created && nextProps.created) {
      // created attendee successfully
      this.props.navigation.dispatch(NavigationActions.back());
    }
  }

  onSave = () => {
    this.signatureRef.current.saveImage();
  };

  onSignatureSave = (result) => {
    const eventId = this.props.navigation.getParam('id');
    this.props.attendee
      .create(eventId, {
        ...this.state,
        signature: result.encoded.toString(),
        event: `${eventId}`,
      })
      .then(() => this.props.event.loadEventAttendees(eventId))
      .then(() => this.props.navigation.goBack())
      .catch(() => {
        alert('There was a problem creating the attendee.');
      });
  };

  render() {
    const signatureWidth = Dimensions.get('window').width - 50;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputFields}>
          <Cell label="First Name:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(firstname) => this.setState({ firstname })}
              placeholder="John"
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.firstname}
            />
          </Cell>
          <Cell label="Last Name:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(lastname) => this.setState({ lastname })}
              placeholder="Doe"
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.lastname}
            />
          </Cell>
          <Cell label="Email:">
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              editable
              onChangeText={(email) => this.setState({ email })}
              placeholder="john.doe@email.com"
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.email}
            />
          </Cell>
          <Cell label="Phone:">
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              editable
              onChangeText={(phone) => this.setState({ phone })}
              placeholder="8125553974"
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.phone}
            />
          </Cell>
        </View>
        <View style={styles.signatureField}>
          <Text style={styles.signatureLabel}>Signature:</Text>
          <TouchableOpacity
            style={{ zIndex: 1, position: 'absolute', right: 10, top: 5 }}
            onPress={() => {
              this.signatureRef.current.resetImage();
            }}
          >
            <Text style={{ color: 'blue', fontSize: 14 }}>Reset</Text>
          </TouchableOpacity>
          <SignatureCapture
            ref={this.signatureRef}
            style={{
              width: signatureWidth,
              paddingTop: 10,
              backgroundColor: 'transparent',
            }}
            showNativeButtons={false}
            showBorder={false}
            showTitleLabel={false}
            viewMode={'portrait'}
            onSaveEvent={this.onSignatureSave}
          />
        </View>
        <Button
          title="Save Attendee"
          disabled={
            this.state.firstname === '' ||
            this.state.lastname === '' ||
            this.state.email === ''
          }
          loading={this.props.isCreating}
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
  textInputStyle: {
    flex: 1,
    marginRight: 10,
    color: Colors.black,
    fontWeight: '100',
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
