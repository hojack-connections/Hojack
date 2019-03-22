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
  ActivityIndicator,
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
class AttendeeEdit extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Attendee',
    headerRight: (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={() => navigation.getParam('onSave')()}
      >
        {navigation.getParam('isUpdating') ? (
          <ActivityIndicator animating color="white" />
        ) : (
          <Ionicon name="ios-save" color="white" size={30} />
        )}
      </TouchableOpacity>
    ),
  });

  state = {
    isUpdating: false,
    isDeleting: false,
  };

  // For editable text fields, need 4 refs
  textFieldsRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];

  componentWillMount() {
    this.props.event.loadEventAttendees(
      this.props.navigation.getParam('eventId')
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onSave: this.onSave,
    });
  }

  onSave = () => {
    this.props.navigation.setParams({
      isUpdating: true,
    });
    const attendeeId = this.props.navigation.getParam('attendeeId');
    const eventId = this.props.navigation.getParam('eventId');
    this.props.attendee
      .update(attendeeId, { ...this.state, _id: attendeeId })
      .then(() => this.props.event.loadEventAttendees(eventId))
      .then(() => {
        this.props.navigation.setParams({
          isUpdating: false,
        });
        this.props.navigation.goBack();
      })
      .catch(() => {
        this.props.navigation.setParams({
          isUpdating: false,
        });
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
        this.props.navigation.pop(2);
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
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Cell
          label="First Name:"
          onPress={() => this.textFieldsRefs[0].current.focus()}
        >
          <TextInput
            autoFocus
            ref={this.textFieldsRefs[0]}
            onSubmitEditing={() => this.textFieldsRefs[1].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(firstname) => this.setState({ firstname })}
            placeholder={attendee.firstname}
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.firstname}
          />
        </Cell>
        <Cell
          label="Last Name:"
          onPress={() => this.textFieldsRefs[1].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[1]}
            onSubmitEditing={() => this.textFieldsRefs[2].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(lastname) => this.setState({ lastname })}
            placeholder={attendee.lastname}
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.lastname}
          />
        </Cell>
        <Cell
          label="Email:"
          onPress={() => this.textFieldsRefs[2].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[2]}
            onSubmitEditing={() => this.textFieldsRefs[3].current.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            editable
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            placeholder={attendee.email}
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.email}
          />
        </Cell>
        <Cell
          label="Phone:"
          onPress={() => this.textFieldsRefs[3].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[3]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="phone-pad"
            onChangeText={(phone) => this.setState({ phone })}
            placeholder={attendee.phone}
            returnKeyType="done"
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
