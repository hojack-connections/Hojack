import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';
import { inject, observer } from 'mobx-react';
import DatePicker from 'react-native-datepicker';
import Cell from '../components/Cell';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

  textFieldsRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];

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

  onAttendees = () => {
    const id = this.props.navigation.getParam('id');
    this.props.navigation.navigate('EventAttendeesScreen', { id });
  };

  render() {
    const eventId = this.props.navigation.getParam('id');
    const attendees = this.props.event.attendeesById[eventId] || [];
    const _event = this.props.event.eventsById[eventId] || {};

    return (
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Cell
          label="Event Name:"
          onPress={() => this.textFieldsRefs[0].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[0]}
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
        <Cell
          label="Address:"
          onPress={() => this.textFieldsRefs[1].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[1]}
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
        <Cell
          label="City:"
          onPress={() => this.textFieldsRefs[2].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[2]}
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
        <Cell
          label="State:"
          onPress={() => this.textFieldsRefs[3].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[3]}
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
        <Cell
          label="Zip Code:"
          onPress={() => this.textFieldsRefs[4].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[4]}
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
        <Cell
          label="Course #:"
          onPress={() => this.textFieldsRefs[5].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[5]}
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
        <Cell
          label="Course Name:"
          onPress={() => this.textFieldsRefs[6].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[6]}
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
        <Cell
          label="Course Credits:"
          onPress={() => this.textFieldsRefs[7].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[7]}
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
        <Cell
          label="Presenter Name:"
          onPress={() => this.textFieldsRefs[8].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[8]}
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
        <Cell
          label="Training Provider:"
          onPress={() => this.textFieldsRefs[9].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[9]}
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
      </KeyboardAwareScrollView>
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
