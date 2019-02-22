import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DatePicker from 'react-native-datepicker';

import { Colors } from '../Themes/';
import normalize from '../helpers/normalizeText';

class UserInput extends Component {
  renderDatePicker = () =>
    this.props.datePicker ? (
      <DatePicker
        cancelBtnText="Cancel"
        confirmBtnText="Confirm"
        customStyles={{
          dateIcon: {
            display: 'none',
          },
          dateInput: {
            borderWidth: 0,
            alignItems: 'flex-start',
          },
        }}
        date={this.props.value}
        format="MMM DD, YYYY"
        mode="date"
        onDateChange={this.props.onDateChanged}
        style={{ flex: 1, marginRight: 10, height: 40 }}
      />
    ) : (
      <TextInput
        autoCapitalize={
          label !== 'Email:' && label !== 'Password:' ? 'words' : 'none'
        }
        autoCorrect={false}
        editable={!readOnly}
        onChangeText={this.props.onChangeText}
        placeholder={this.props.placeholder}
        style={{
          flex: 1,
          marginRight: readOnly ? 30 : 10,
          color: label === 'Attendees:' ? Colors.blue : Colors.black,
          fontWeight: label === 'Attendees:' ? '700' : '100',
        }}
        textAlign={'left'}
        underlineColorAndroid="transparent"
        value={this.props.value}
      />
    );

  renderArrow = () =>
    this.props.arrow ? (
      <Icon
        color={'#797979'}
        name="chevron-right"
        size={16}
        style={styles.arrow}
      />
    ) : null;

  render() {
    const { label } = this.props;

    return (
      <TouchableOpacity onPress={this.props.onClickEvent}>
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          {this.renderDatePicker()}
          {this.renderArrow()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    height: 46,
  },
  label: {
    fontSize: normalize(16),
    fontWeight: '700',
    width: 210,
  },
  arrow: {
    position: 'absolute',
    right: 10,
    top: 14,
  },
});

export default UserInput;
