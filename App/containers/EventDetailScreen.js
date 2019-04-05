import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default
@inject('receiver', 'event')
@observer
class SubmitSettingsScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => ({
    title: 'Event',
    headerRight: (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={() =>
          navigation.navigate('EventSummaryScreen', {
            id: navigation.getParam('id'),
          })
        }
      >
        <Text style={{ fontSize: 17, color: Colors.purple }}>Edit</Text>
      </TouchableOpacity>
    ),
    headerStyle: {
      ...navigationOptions.headerStyle,
      borderBottomWidth: 0,
    },
  });

  state = {
    isSubmitting: false,
    newSheetReceiver: '',
    selectedIndex: 0,
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
      .then(() => this.props.event.loadEventAttendees(eventId))
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

  handleIndexChange = (index) => {
    this.setState({
      selectedIndex: index,
    });
  };

  renderInfo = () => {
    const eventId = this.props.navigation.getParam('id');
    const attendees = this.props.event.attendeesById[eventId] || [];
    const receivers = this.props.event.receiversByEventId[eventId] || [];
    return (
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
    );
  };

  renderAttendees = () => {
    const eventId = this.props.navigation.getParam('id');
    const attendees = this.props.event.attendeesById[eventId] || [];
    const receivers = this.props.event.receiversByEventId[eventId] || [];
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={attendees}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AttendeeDetail', {
                  attendeeId: item._id,
                  eventId,
                })
              }
            >
              <View
                style={{
                  borderBottomColor: Colors.gray,
                  borderBottomWidth: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 8,
                  marginLeft: 8,
                  marginBottom: 8,
                }}
              >
                <Text>{`${item.firstname} ${item.lastname}`}</Text>
                <Icon
                  name="chevron-right"
                  size={16}
                  color={'#797979'}
                  style={styles.arrow}
                />
              </View>
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View
              style={{
                borderBottomColor: Colors.gray,
                borderBottomWidth: 1,
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  marginLeft: 8,
                  marginBottom: 4,
                  marginTop: 8,
                  color: Colors.darkGray,
                }}
              >
                ATTENDEES
              </Text>
            </View>
          }
          ListFooterComponent={
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AddAttendeeScreen', {
                  id: eventId,
                })
              }
            >
              <View
                style={{
                  borderBottomColor: Colors.gray,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 8,
                  paddingTop: 0,
                  marginLeft: 8,
                }}
              >
                <Ionicon
                  name="ios-add-circle-outline"
                  color={Colors.purple}
                  size={30}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    color: Colors.darkGray,
                  }}
                >
                  Add Attendee
                </Text>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    );
  };

  render() {
    const eventId = this.props.navigation.getParam('id');
    const _event = this.props.event.eventsById[eventId] || {};
    const attendees = this.props.event.attendeesById[eventId] || [];
    const receivers = this.props.event.receiversByEventId[eventId] || [];

    return (
      <>
        <View
          style={{
            backgroundColor: Colors.navigation,
            borderBottomColor: Colors.gray,
            borderBottomWidth: 1,
            padding: 8,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              marginBottom: 16,
            }}
          >
            {_event.name}
          </Text>
          <SegmentedControlTab
            values={['Info', 'Attendees', 'Submit']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
            tabStyle={{ borderColor: Colors.purple }}
            tabTextStyle={{ color: Colors.purple }}
            activeTabStyle={{ backgroundColor: Colors.purple }}
          />
        </View>
        {this.state.selectedIndex === 0 ? this.renderInfo() : null}
        {this.state.selectedIndex === 1 ? this.renderAttendees() : null}
        {this.state.selectedIndex === 2 ? <View /> : null}
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
