import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';
import Cell from '../components/Cell';

export default
@inject('event', 'attendee')
@observer
class AttendeeDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Attendee',
    headerRight: (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={() =>
          navigation.navigate('AttendeeEdit', {
            eventId: navigation.getParam('eventId'),
            attendeeId: navigation.getParam('attendeeId'),
          })
        }
      >
        <Ionicon name="ios-create" color="white" size={30} />
      </TouchableOpacity>
    ),
  });

  state = {
    email: '',
    isSending: false,
  };

  emailRef = React.createRef();

  componentWillMount() {
    this.props.event.loadEventAttendees(
      this.props.navigation.getParam('eventId')
    );
  }

  sendTestCert = () => {
    // Send a test cert to this.state.email
    this.setState({ isSending: true });
    const eventId = this.props.navigation.getParam('eventId');
    const attendeeId = this.props.navigation.getParam('attendeeId');
    this.props.event
      .sendCertificate(eventId, attendeeId, this.state.email)
      .then(() => alert('Sent test certificate'))
      .then(() => this.setState({ isSending: false, email: '' }))
      .catch(() => {
        this.setState({ isSending: false });
        alert('There was a problem sending your test certificate.');
      });
  };

  render() {
    const eventId = this.props.navigation.getParam('eventId');
    const attendeeId = this.props.navigation.getParam('attendeeId');

    const eventAttendees = this.props.event.attendeesById[eventId] || [];
    const attendee =
      eventAttendees.find((_attendee) => _attendee._id === attendeeId) || {};

    return (
      <ScrollView style={styles.container}>
        <View style={styles.attendeeInfo}>
          <Text>{`${attendee.firstname} ${attendee.lastname}`}</Text>
          <Text>{`${attendee.email} - ${attendee.phone}`}</Text>
        </View>
        <View style={styles.signatureField}>
          <Text style={styles.signatureLabel}>Signature:</Text>
          {attendee.signature !== '' && (
            <Image
              source={{ uri: attendee.signature }}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </View>
        <Cell
          label="Send Test Cert:"
          onPress={() => this.emailRef.current.focus()}
        >
          <TextInput
            ref={this.emailRef}
            onSubmitEditing={this.sendTestCert}
            autoCapitalize="none"
            autoCorrect={false}
            editable
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            placeholder="test@receiver.com"
            returnKeyType="done"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.email}
          />
        </Cell>
        <Button
          title="Send Test Cert"
          loading={this.state.isSending}
          onPress={this.sendTestCert}
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.sendButton}
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
  textInputStyle: {
    flex: 1,
    marginRight: 10,
    color: Colors.black,
    fontWeight: '100',
  },
  attendeeInfo: {
    padding: 20,
  },
  signatureField: {
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  signatureLabel: {
    backgroundColor: Colors.white,
    padding: 5,
    fontSize: normalize(16),
    fontWeight: '700',
    position: 'absolute',
    left: 10,
    top: Platform.OS === 'ios' ? -16 : -12,
    zIndex: 999,
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  updateButton: {
    borderRadius: 10,
    width: '100%',
    height: 60,
  },
  sendButton: {
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
