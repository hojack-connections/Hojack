import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import API_BASE_URL from '../sagas/config';

import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';
import { inject, observer } from 'mobx-react';

export default
@inject('event')
@observer
class EventSummaryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Event',
    headerRight: (
      <TouchableOpacity
        onPress={() => self.onSubmit()}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Icon color={'#00eaea'} name={'paper-plane'} size={20} />
        <Text
          style={{
            color: '#00eaea',
            fontSize: normalize(15),
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    ),
  });

  state = {
    ...this.props.event.eventsById[this.props.navigation.getParam('id')],
    isUpdating: false,
    isDeleting: false,
  };

  onSubmit = () => {
    let { certReceivers, sheetReceivers } = this.props;

    certReceivers = certReceivers.map((receiver) =>
      receiver.replace('<<All Attendees>>', 'all')
    );
    sheetReceivers = sheetReceivers.map((receiver) =>
      receiver.replace('<<All Attendees>>', 'all')
    );

    Alert.alert(
      'Confirm',
      'Would you like to submit this event?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            axios
              .post(
                API_BASE_URL.event +
                  '/' +
                  this.props.navigation.state.params.id +
                  '/submit',
                {
                  token: this.props.token,
                  certReceivers,
                  sheetReceivers,
                }
              )
              .then((response) => {
                console.log('submit_event response = ', response);
                this.props.actions.markEventAsSubmitted({
                  index: this.props.navigation.state.params.index,
                });
                Alert.alert('Success', 'Submitted this event successfully!');
              })
              .catch((error) => {
                console.log('submit_event response = ', error.response);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  onUpdate = () => {
    this.setState({ isUpdating: true });
    axios
      .put(API_BASE_URL.event + '/' + this.props.navigation.state.params.id, {
        token: this.props.token,
        name: this.state.name,
        date: new Date(this.state.date),
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        courseNo: this.state.courseNo,
        courseName: this.state.courseName,
        numberOfCourseCredits: this.state.numberOfCourseCredits,
        presenterName: this.state.presenterName,
        trainingProvider: this.state.trainingProvider,
      })
      .then((response) => {
        console.log('update_event response = ', response);
        this.setState({ isUpdating: false });
        this.props.actions.updateEvent({
          index: this.props.navigation.state.params.index,
          response: response.data,
        });
        this.props.navigation.dispatch(NavigationActions.back());
      })
      .catch((error) => {
        console.log('update_event error = ', error.response);
        this.setState({ isUpdating: false });
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
            axios
              .delete(
                API_BASE_URL.event +
                  '/' +
                  this.props.navigation.state.params.id,
                { params: { token: this.props.token } }
              )
              .then((response) => {
                console.log('delete_event response = ', response);
                this.setState({ isDeleting: false });
                this.props.actions.removeEvent({
                  index: this.props.navigation.state.params.index,
                });
                this.props.navigation.dispatch(NavigationActions.back());
              })
              .catch((error) => {
                console.log('delete_event response = ', error.response);
                this.setState({ isDeleting: false });
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  onAttendees = (index, id) => {
    this.props.navigation.navigate('EventAttendeesScreen', { index, id });
  };

  render() {
    const eventId = this.props.navigation.getParam('id');
    const attendees = this.props.event.attendeesById[eventId] || [];

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputFields}>
          <UserInput
            label={'Event Name:'}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          />
          <UserInput
            datePicker
            label={'Date:'}
            onDateChanged={(date) => this.setState({ date })}
            value={this.state.date}
          />
          <UserInput
            label={'Address:'}
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address}
          />
          <UserInput
            label={'City:'}
            onChangeText={(city) => this.setState({ city })}
            value={this.state.city}
          />
          <UserInput
            label={'State:'}
            onChangeText={(state) => this.setState({ state })}
            value={this.state.state}
          />
          <UserInput
            label={'Zip Code:'}
            onChangeText={(zipcode) => this.setState({ zipcode })}
            value={this.state.zipcode}
          />
          <UserInput
            label={'Course #:'}
            onChangeText={(courseNo) => this.setState({ courseNo })}
            value={this.state.courseNo}
          />
          <UserInput
            label={'Course Name:'}
            onChangeText={(courseName) => this.setState({ courseName })}
            value={this.state.courseName}
          />
          <UserInput
            label={'Course Credits:'}
            onChangeText={(numberOfCourseCredits) =>
              this.setState({
                numberOfCourseCredits: parseInt(numberOfCourseCredits),
              })
            }
            value={this.state.numberOfCourseCredits}
          />
          <UserInput
            label={'Presenter Name:'}
            onChangeText={(presenterName) => this.setState({ presenterName })}
            value={this.state.presenterName}
          />
          <UserInput
            label={'Training Provider:'}
            onChangeText={(trainingProvider) =>
              this.setState({ trainingProvider })
            }
            value={this.state.trainingProvider}
          />
          <UserInput
            arrow
            label={'Attendees:'}
            onClickEvent={() =>
              this.onAttendees(
                this.props.navigation.state.params.index,
                eventId
              )
            }
            readOnly
            value={attendees.length.toString()}
          />
        </View>
        <Button
          buttonStyle={styles.updateButton}
          containerStyle={styles.buttonContainer}
          loading={this.state.isUpdating}
          onPress={this.onUpdate}
          title="Update Event"
          titleStyle={styles.buttonTitle}
        />
        <Button
          buttonStyle={styles.deleteButton}
          containerStyle={styles.buttonContainer}
          loading={this.state.isDeleting}
          onPress={this.onDelete}
          title="Delete Event"
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
