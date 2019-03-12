import React, { Component } from 'react';
import {
  Button,
  Platform,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Colors, Styles } from '../Themes/';
import { inject, observer } from 'mobx-react';

export default
@inject('user', 'auth', 'event')
@observer
class EventsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Events',
    headerLeft: (
      <Button
        onPress={() => navigation.navigate('AddEventScreen')}
        title="Create"
        color="#fff"
      />
    ),
    headerRight: (
      <Button
        onPress={() => navigation.navigate('SettingsScreen')}
        title="Settings"
        color="#fff"
      />
    ),
  });

  componentDidMount() {
    this.props.event.loadEvents();
  }

  _onItemClick = (index, id) => {
    this.props.navigation.navigate('SubmitSettingsScreen', { index, id });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <TouchableHighlight onPress={() => this._onItemClick(index, item._id)}>
      <View style={styles.listItemContainer}>
        <Text style={styles.eventDate}>
          {moment(item.date).format('MMM DD, YYYY')}
        </Text>
        <View style={styles.seperator} />
        <View style={styles.subDetails}>
          <Text style={styles.categoryTitle}>{item.name}</Text>
          <Text style={{ color: item.isSubmitted ? '#34bd3e' : '#ff575c' }}>
            {this.props.event.attendeesById[item._id]
              ? this.props.event.attendeesById[item._id].length.toLocaleString()
              : '0'}
          </Text>
        </View>
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
    return (
      <View style={Styles.container}>
        <View style={styles.totalEventsContainer}>
          <Text style={{ color: '#895353' }}>
            {/* TODO: Make this a rest call, shouldn't be calculating on client side */}
            Total Attendees: {0}
          </Text>
          <Text style={{ color: '#538989' }}>
            Total Events: {this.props.event.events.length}
          </Text>
        </View>
        <View style={styles.allEventsContainer}>
          <Text>All Attendees</Text>
          <Text style={{ color: '#34bd3e' }}>
            {/* TODO: Make this a rest call, shouldn't be calculating on client side */}
            {0}
          </Text>
          <Icon
            color={'#797979'}
            name="chevron-right"
            size={16}
            style={Styles.arrow}
          />
        </View>
        <FlatList
          data={this.props.event.events}
          extraData={{}}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  totalEventsContainer: {
    height: 42,
    backgroundColor: Colors.darkBlack,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  allEventsContainer: {
    paddingHorizontal: 30,
    height: 44,
    marginBottom: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemContainer: {
    // paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    height: 70,
    marginBottom: 10,
  },
  eventDate: {
    marginLeft: 20,
    fontWeight: '700',
  },
  seperator: {
    backgroundColor: Colors.black,
    height: 1,
    width: '99%',
    marginLeft: 5,
    marginTop: 5,
  },
  subDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  arrow: {
    position: 'absolute',
    right: 10,
    top: 44,
  },
});
