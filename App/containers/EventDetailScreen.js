import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';
import * as EmailValidator from 'email-validator';
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
    newCertReceiver: '',
    newSheetReceiver: '',
    isSubmitting: false,
  };

  componentDidMount() {
    const eventId = this.props.navigation.getParam('id');
    this.props.event.loadEventAttendees(eventId);
  }

  onSubmit = () => {
    // let { certReceivers, sheetReceivers } = this.props;
    //
    // certReceivers = certReceivers.map((receiver) =>
    //   receiver.replace('<<All Attendees>>', 'all')
    // );
    // sheetReceivers = sheetReceivers.map((receiver) =>
    //   receiver.replace('<<All Attendees>>', 'all')
    // );
    Alert.alert(
      'Confirm',
      'Would you like to submit this event?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            const eventId = this.props.navigation.getParam('id');
            this.props.event
              .submit(
                eventId,
                this.props.receiver.certReceiversById[eventId],
                this.props.receiver.sheetReceiversById[eventId]
              )
              .then(() => {
                Alert.alert('Success', 'Submitted this event successfully!');
              })
              .catch(() => {
                Alert.alert(
                  'Error',
                  'There was a problem submitting your event.'
                );
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  _onBeforeAddSheetReceiver = () => {
    this.sheetReceiverInput.focus();
  };

  _onAddSheetReceiver = () => {
    if (this.state.newSheetReceiver === '') return;
    if (
      this.state.newSheetReceiver === '<<All Attendees>>' ||
      EmailValidator.validate(this.state.newSheetReceiver)
    ) {
      const eventId = this.props.navigation.getParam('id');
      this.props.receiver.addSheetReceiver(
        eventId,
        this.state.newSheetReceiver
      );
      this.setState({ newSheetReceiver: '' });
    } else {
      Alert.alert(
        'Warning',
        `Please input valid email address or '<<All Attendees>>'`
      );
      this.setState({ newSheetReceiver: '' });
    }
  };

  _onRemoveSheetReceiver = (item) => {
    const eventId = this.props.navigation.getParam('id');
    this.props.receiver.removeSheetReceiver(eventId, item);
  };

  _onBeforeAddCertReceiver = () => {
    this.certReceiverInput.focus();
  };

  _onAddCertReceiver = () => {
    if (this.state.newCertReceiver === '') return;
    if (
      this.state.newCertReceiver === '<<All Attendees>>' ||
      EmailValidator.validate(this.state.newCertReceiver)
    ) {
      const eventId = this.props.navigation.getParam('id');
      this.props.receiver.addCertReceiver(eventId, this.state.newCertReceiver);
      this.setState({ newCertReceiver: '' });
    } else {
      Alert.alert(
        'Warning',
        `Please input a valid email address or '<<All Attendees>>'`
      );
      this.setState({ newCertReceiver: '' });
    }
  };

  _onRemoveCertReceiver = (item) => {
    const eventId = this.props.navigation.getParam('id');
    this.props.receiver.removeCertReceiver(eventId, item);
  };

  render() {
    const eventId = this.props.navigation.getParam('id');
    const certReceivers = this.props.receiver.certReceiversById[eventId] || [];
    const sheetReceivers =
      this.props.receiver.sheetReceiversById[eventId] || [];

    return (
      <ScrollView style={Styles.container}>
        <HeaderSubtitle>
          <Text style={{ color: '#538989' }}>
            Total Attendees:{' '}
            {(this.props.event.attendeesById[eventId] || []).length}
          </Text>
        </HeaderSubtitle>
        <Button
          buttonStyle={styles.updateButton}
          containerStyle={styles.buttonContainer}
          onPress={() =>
            this.props.navigation.navigate('AddAttendeeScreen', { id: eventId })
          }
          title="Add Attendee"
          titleStyle={styles.buttonTitle}
        />
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
        {sheetReceivers.map((item, index) => (
          <View key={index} style={styles.listItemContainer}>
            <TouchableOpacity onPress={() => this._onRemoveSheetReceiver(item)}>
              <Icon color={Colors.black} name={'minus-square'} size={20} />
            </TouchableOpacity>
            <Text style={styles.name}>{item}</Text>
          </View>
        ))}
        <View style={styles.plusContainer}>
          <TouchableOpacity onPress={this._onBeforeAddSheetReceiver}>
            <Icon color={Colors.black} name={'plus'} size={21} />
          </TouchableOpacity>
          <TextInput
            ref={(input) => {
              this.sheetReceiverInput = input;
            }}
            style={{ flex: 1, marginLeft: 50, marginRight: 10, height: 46 }}
            textAlign={'left'}
            value={this.state.newSheetReceiver}
            onChangeText={(newSheetReceiver) =>
              this.setState({ newSheetReceiver })
            }
            autoCapitalize={'none'}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholder="Input a new email address"
            onSubmitEditing={this._onAddSheetReceiver}
            onBlur={this._onAddSheetReceiver}
          />
        </View>

        <View style={[styles.section, { marginTop: 15 }]}>
          <Text
            style={{
              color: Colors.black,
              fontSize: normalize(17),
              fontWeight: '700',
            }}
          >
            Send Certificates of Completion To:
          </Text>
        </View>
        {certReceivers.map((item, index) => (
          <View key={index} style={styles.listItemContainer}>
            <TouchableOpacity onPress={() => this._onRemoveCertReceiver(item)}>
              <Icon color={Colors.black} name={'minus-square'} size={20} />
            </TouchableOpacity>
            <Text style={styles.name}>{item}</Text>
          </View>
        ))}
        <View style={styles.plusContainer}>
          <TouchableOpacity onPress={this._onBeforeAddCertReceiver}>
            <Icon color={Colors.black} name={'plus'} size={21} />
          </TouchableOpacity>
          <TextInput
            ref={(input) => {
              this.certReceiverInput = input;
            }}
            style={{ flex: 1, marginLeft: 50, marginRight: 10, height: 46 }}
            textAlign={'left'}
            value={this.state.newCertReceiver}
            onChangeText={(newCertReceiver) =>
              this.setState({ newCertReceiver })
            }
            autoCapitalize={'none'}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholder="Input a new email address"
            onSubmitEditing={this._onAddCertReceiver}
            onBlur={this._onAddCertReceiver}
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
  plusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    paddingVertical: 10,
    paddingLeft: 30,
    backgroundColor: Colors.white,
  },
});
