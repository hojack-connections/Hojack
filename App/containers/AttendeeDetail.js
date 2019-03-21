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
} from 'react-native';
import { Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';
import Cell from '../components/Cell';

export default
@observer
@inject('event', 'attendee')
class AttendeeDetail extends Component {
  static navigationOptions = () => ({
    title: 'Attendee',
  });

  state = {
    isUpdating: false,
    isDeleting: false,
  };

  componentWillMount() {
    this.props.event.loadEventAttendees(
      this.props.navigation.getParam('eventId')
    );
  }

  onUpdate = () => {
    this.setState({ isUpdating: true });
    const attendeeId = this.props.navigation.getParam('attendeeId');
    const eventId = this.props.navigation.getParam('eventId');
    this.props.attendee
      .update(attendeeId, { ...this.state, _id: attendeeId })
      .then(() => this.props.event.loadEventAttendees(eventId))
      .then(() => {
        this.setState({ isUpdating: false });
        this.props.navigation.goBack();
      })
      .catch(() => {
        this.setState({ isUpdating: false });
        alert('There was a problem updating the attendee.');
      });
  };

  _onDelete = () => {
    this.setState({ isDeleting: true });
    const attendeeId = this.props.navigation.getParam('attendeeId');
    const eventId = this.props.navigation.getParam('eventId');
    this.props.attendee
      .delete(attendeeId)
      .then(() => this.props.event.loadEventAttendees(eventId))
      .then(() => {
        this.setState({ isDeleting: false });
        this.props.navigation.goBack();
      })
      .catch(() => {
        this.setState({ isDeleting: false });
        alert('There was a problem deleting the attendee.');
      });
  };

  onDelete = () => {
    Alert.alert(
      'Confirm',
      'Do you really want to remove this attendee?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes',
          onPress: this._onDelete,
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const eventId = this.props.navigation.getParam('eventId');
    const attendeeId = this.props.navigation.getParam('attendeeId');

    const eventAttendees = this.props.event.attendeesById[eventId] || [];
    const event = this.props.event.eventsById[eventId] || {};

    const attendee =
      eventAttendees.find((_attendee) => _attendee._id === attendeeId) || {};
    console.log(attendee.signature);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputFields}>
          <Cell label="First Name:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(firstname) => this.setState({ firstname })}
              placeholder={attendee.firstname}
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
              placeholder={attendee.lastname}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.lastname}
            />
          </Cell>
          <Cell label="Email:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(email) => this.setState({ email })}
              placeholder={attendee.email}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.email}
            />
          </Cell>
          <Cell label="Phone:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(phone) => this.setState({ phone })}
              placeholder={attendee.phone}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.phone}
            />
          </Cell>
          <Cell label="Event:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable={false}
              placeholder={event.name}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
            />
          </Cell>
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
        <Button
          title="Update Attendee"
          loading={this.state.isUpdating}
          onPress={this.onUpdate}
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.updateButton}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="Delete Attendee"
          loading={this.state.isDeleting}
          onPress={this.onDelete}
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.deleteButton}
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
  inputFields: {
    paddingLeft: 20,
    paddingTop: 10,
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
  deleteButton: {
    backgroundColor: '#ff575c',
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
