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
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';
import * as EmailValidator from 'email-validator';
import { inject, observer } from 'mobx-react';

export default
@inject('receiver')
@observer
class SubmitSettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Submit Settings',
    headerTitleStyle: Styles.nav.title,
    headerBackTitle: 'Back',
  });

  state = {
    newCertReceiver: '',
    newSheetReceiver: '',
  };

  _onBeforeAddSheetReceiver = () => {
    this.sheetReceiverInput.focus();
  };

  _onAddSheetReceiver = () => {
    if (this.state.newSheetReceiver !== '') {
      if (
        this.state.newSheetReceiver === '<<All Attendees>>' ||
        EmailValidator.validate(this.state.newSheetReceiver)
      ) {
        this.props.actions.addSheetReceiver(this.state.newSheetReceiver);
        this.setState({ newSheetReceiver: '' });
      } else {
        Alert.alert(
          'Warning',
          "Please input valid email address or '<<All Attendees>>'"
        );
        this.setState({ newSheetReceiver: '' });
      }
    }
  };

  _onRemoveSheetReceiver = (index) => {
    this.props.actions.removeSheetReceiver(index);

  };

  _onBeforeAddCertReceiver = () => {
    this.certReceiverInput.focus();
  };

  _onAddCertReceiver = () => {
    if (this.state.newCertReceiver !== '') {
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
          "Please input a valid email address or '<<All Attendees>>'"
        );
        this.setState({ newCertReceiver: '' });
      }
    }
  };

  _onRemoveCertReceiver = (index) => {
    this.props.actions.removeCertReceiver(index);
  };

  render() {
    const eventId = this.props.navigation.getParam(eventId);
    const certReceivers = this.props.receiver.certReceiversById[id];
    const sheetReceivers = this.props.receiver.sheetReceiversById[id];

    return (
      <ScrollView style={Styles.container}>
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
            <TouchableOpacity
              onPress={() => this._onRemoveSheetReceiver(index)}
            >
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
            <TouchableOpacity onPress={() => this._onRemoveCertReceiver(index)}>
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
            onSubmitEditing={this._onAddCertReceive}
            onBlur={this._onAddCertReceive}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
