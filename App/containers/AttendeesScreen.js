import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { Colors, Styles } from '../Themes/';
import { inject, observer } from 'mobx-react';
import HeaderSubtitle from '../components/HeaderSubtitle';

export default
@inject('event')
@observer
class AttendeesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'All Attendees',
    headerTitleStyle: Styles.nav.title,
    headerBackTitle: 'Back',
  });

  _onItemClick = (attendee, attendeeIndex) => {
    const eventIndex = _.findIndex(
      this.props.events,
      (event) => event._id === attendee.event._id
    );
    const localIndex = _.findIndex(
      this.props.eventAttendees[attendee.event._id],
      (item) => item._id === attendee._id
    );
    this.props.navigation.navigate('AttendeeSummaryScreen', {
      event: eventIndex,
      id: attendee.event._id,
      attendee: localIndex,
      attendeeIndex,
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderCell = ({ item, index }) => (
    <TouchableHighlight onPress={() => this._onItemClick(item, index)}>
      <View style={styles.listItemContainer}>
        <Icon
          name={item.isFilled ? 'check-square' : 'minus-square'}
          size={18}
          color={item.isFilled ? '#34bd3e' : '#ff575c'}
        />
        <Text style={styles.name}>
          {item.firstname} {item.lastname}
        </Text>
        <Icon
          name="chevron-right"
          size={16}
          color={'#797979'}
          style={styles.arrow}
        />
      </View>
    </TouchableHighlight>
  );

  render() {
    const eventId = this.props.navigation.getParam('id');
    const attendees = this.props.event.attendeesById[eventId] || [];

    return (
      <View style={Styles.container}>
        <HeaderSubtitle>
          <Text style={{ color: '#895353' }}>
            Total Attendees: {attendees.length}
          </Text>
        </HeaderSubtitle>
        <FlatList
          data={attendees}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderCell}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  name: {
    marginLeft: 10,
  },
  arrow: {
    position: 'absolute',
    right: 10,
    top: 13,
  },
});
