import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import HeaderSubtitle from '../components/HeaderSubtitle';

export default
@inject('receiver', 'event')
@observer
class SubmitSettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Event Settings',
    headerRight: (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={() =>
          navigation.navigate('EventSummaryScreen', {
            id: navigation.getParam('id'),
          })
        }
      >
        <Ionicon name="ios-create" color="white" size={30} />
      </TouchableOpacity>
    ),
  });

  state = {
    isSubmitting: false,
    newSheetReceiver: '',
  };
  inputFieldRef = React.createRef();

  componentDidMount() {
    const eventId = this.props.navigation.getParam('id');
    this.props.event.loadEventAttendees(eventId);
    this.props.event.loadReceiversForEvent(eventId);
  }

  _onSubmit = () => {
    const eventId = this.props.navigation.getParam('id');
    this.props.event
      .submit(eventId)
      .then(() => {
        Alert.alert('Success', 'Submitted this event successfully!');
      })
      .catch(() => {
        Alert.alert('Error', 'There was a problem submitting your event.');
      });
  };

  onSubmit = () => {
    Alert.alert(
      'Confirm',
      'Would you like to submit this event?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes',
          onPress: this._onSubmit,
        },
      ],
      { cancelable: false }
    );
  };

  plusIconPressed = () => {
    if (this.state.newSheetReceiver === '') {
      this.inputFieldRef.current.focus();
    } else {
      this.props.onAddItem(this.state.newSheetReceiver);
    }
  };

  addSheetReceiver = (email) => {
    if (email === '') return;
    const eventId = this.props.navigation.getParam('id');
    this.props.event
      .addReceiverForEvent(eventId, email)
      .then(() => this.props.event.loadReceiversForEvent(eventId))
      .then(() => this.setState({ newSheetReceiver: '' }))
      .catch(() => alert('There was a problem adding the receiver.'));
  };

  removeSheetReceiver = (receiver) => {
    const eventId = this.props.navigation.getParam('id');
    this.props.event
      .deleteReceiver(receiver._id)
      .then(() => this.props.event.loadReceiversForEvent(eventId))
      .catch(() => alert('There was a problem deleting the receiver.'));
  };

  render() {
    const eventId = this.props.navigation.getParam('id');
    const attendees = this.props.event.attendeesById[eventId] || [];
    const receivers = this.props.event.receiversByEventId[eventId] || [];

    return (
      <>
        <HeaderSubtitle>
          <Text style={{ color: '#538989' }}>
            Total Attendees: {attendees.length}
          </Text>
        </HeaderSubtitle>
        <ScrollView style={Styles.container}>
          <TouchableOpacity
            style={styles.allEventsContainer}
            onPress={() => {
              this.props.navigation.navigate('EventAttendeesScreen', {
                id: eventId,
              });
            }}
          >
            <Text>All Attendees</Text>
            <Text style={{ color: '#34bd3e' }}>{attendees.length}</Text>
            <Icon
              color={'#797979'}
              name="chevron-right"
              size={16}
              style={Styles.arrow}
            />
          </TouchableOpacity>
          <View style={styles.section}>
            <Text
              style={{
                color: Colors.black,
                fontSize: normalize(17),
                fontWeight: '700',
              }}
            >
              Send Attendence Summary To:
            </Text>
          </View>
          {receivers.map((receiver, index) => (
            <View key={index} style={styles.listItemContainer}>
              <TouchableOpacity
                onPress={() => this.removeSheetReceiver(receiver)}
              >
                <Icon color={Colors.black} name={'minus-square'} size={20} />
              </TouchableOpacity>
              <Text style={styles.name}>{receiver.email}</Text>
            </View>
          ))}
          <View style={styles.plusContainer}>
            <TouchableOpacity onPress={this.plusIconPressed}>
              <Icon color={Colors.black} name={'plus'} size={21} />
            </TouchableOpacity>
            <TextInput
              ref={this.inputFieldRef}
              style={styles.textInput}
              textAlign={'left'}
              value={this.state.newSheetReceiver}
              onChangeText={(newSheetReceiver) =>
                this.setState({ newSheetReceiver })
              }
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              onSubmitEditing={(e) => this.addSheetReceiver(e.nativeEvent.text)}
              placeholder="Input a new email address"
              returnKeyType="done"
            />
          </View>
          <Button
            buttonStyle={styles.updateButton}
            containerStyle={styles.buttonContainer}
            loading={this.state.isSubmitting}
            onPress={this.onSubmit}
            title="Send"
            titleStyle={styles.buttonTitle}
          />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  allEventsContainer: {
    paddingHorizontal: 30,
    height: 44,
    marginBottom: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  buttonTitle: {
    marginLeft: 10,
    fontSize: normalize(20),
    color: Colors.white,
  },
  section: {
    height: 43,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  textInput: {
    flex: 1,
    marginLeft: 50,
    marginRight: 10,
    height: 46,
  },
  plusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    paddingVertical: 10,
    paddingLeft: 30,
    backgroundColor: Colors.white,
  },
});
