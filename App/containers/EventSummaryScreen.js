import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';
import { inject, observer } from 'mobx-react';
import DatePicker from 'react-native-datepicker';
import Cell from '../components/Cell';

export default
@inject('event')
@observer
class EventSummaryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Event',
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

  componentDidMount() {
    this.props.navigation.setParams({
      onSave: this.onSave,
    });
  }

  onSave = () => {
    this.props.navigation.setParams({
      isUpdating: true,
    });
    const eventId = this.props.navigation.getParam('id');
    this.props.event
      .update(eventId, { _id: eventId, ...this.state })
      .then(() => this.props.event.loadEvents())
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
        alert('There was a problem updating the event.');
      });
  };

  onDelete = () => {
    Alert.alert(
      'Confirm',
      'Do you really want to remove this event?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            this.setState({ isDeleting: true });
            const eventId = this.props.navigation.getParam('id');
            this.props.event
              .delete(eventId)
              .then(() => {
                this.setState({ isDeleting: false });
                this.props.event.loadEvents();
                this.props.navigation.goBack();
              })
              .catch(() => {
                this.setState({ isDeleting: false });
                alert('There was a problem deleting the event.');
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  onAttendees = (id) => {
    this.props.navigation.navigate('EventAttendeesScreen', { id });
  };

  render() {
    const eventId = this.props.navigation.getParam('id');
    const attendees = this.props.event.attendeesById[eventId] || [];
    const _event = this.props.event.eventsById[eventId] || {};

    return (
      <KeyboardAvoidingView behavior="padding">
        <ScrollView style={styles.container}>
          <Cell label="Event Name:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(name) => this.setState({ name })}
              placeholder={`${_event.name}`}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.name}
            />
          </Cell>
          <Cell label="Date:">
            <DatePicker
              cancelBtnText="Cancel"
              confirmBtnText="Confirm"
              customStyles={{
                dateIcon: { display: 'none' },
                dateInput: { borderWidth: 0, alignItems: 'flex-start' },
              }}
              date={this.state.date}
              placeholder={`${_event.date}`}
              format="YYYY-MM-DD"
              mode="date"
              onDateChange={(date) => this.setState({ date })}
              style={{ flex: 1, marginRight: 10, height: 40 }}
            />
          </Cell>
          <Cell label="Address:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(address) => this.setState({ address })}
              placeholder={`${_event.address}`}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.address}
            />
          </Cell>
          <Cell label="City:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(city) => this.setState({ city })}
              placeholder={`${_event.city}`}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.city}
            />
          </Cell>
          <Cell label="State:">
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              editable
              onChangeText={(state) => this.setState({ state })}
              placeholder={`${_event.state}`}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.state}
            />
          </Cell>
          <Cell label="Zip Code:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              keyboardType="number-pad"
              onChangeText={(zipcode) => this.setState({ zipcode })}
              placeholder={`${_event.zipcode}`}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.zipcode}
            />
          </Cell>
          <Cell label="Course #:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(courseNo) => this.setState({ courseNo })}
              placeholder={`${_event.courseNo}`}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.courseNo}
            />
          </Cell>
          <Cell label="Course Name:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(courseName) => this.setState({ courseName })}
              placeholder={`${_event.courseName}`}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.courseName}
            />
          </Cell>
          <Cell label="Course Credits:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              keyboardType="number-pad"
              onChangeText={(numberOfCourseCredits) =>
                this.setState({ numberOfCourseCredits })
              }
              placeholder={`${_event.numberOfCourseCredits || ''}`}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={`${this.state.numberOfCourseCredits || ''}`}
            />
          </Cell>
          <Cell label="Presenter Name:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(presenterName) => this.setState({ presenterName })}
              placeholder={`${_event.presenterName}`}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.presenterName}
            />
          </Cell>
          <Cell label="Training Provider:">
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable
              onChangeText={(trainingProvider) =>
                this.setState({ trainingProvider })
              }
              placeholder={`${_event.trainingProvider}`}
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              value={this.state.trainingProvider}
            />
          </Cell>
          <TouchableOpacity onPress={() => this.onAttendees(eventId)}>
            <Cell arrow label="Attendees:">
              <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                editable={false}
                pointerEvents="none"
                style={{
                  ...styles.textInputStyle,
                  color: Colors.blue,
                  fontWeight: '700',
                }}
                underlineColorAndroid="transparent"
                value={attendees.length.toString()}
              />
            </Cell>
          </TouchableOpacity>
          <Button
            buttonStyle={styles.deleteButton}
            containerStyle={styles.buttonContainer}
            loading={this.state.isDeleting}
            onPress={this.onDelete}
            title="Delete Event"
            titleStyle={styles.buttonTitle}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
