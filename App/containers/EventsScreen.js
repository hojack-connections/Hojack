import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Colors, Styles } from '../Themes/';
import { inject, observer } from 'mobx-react';
import HeaderSubtitle from '../components/HeaderSubtitle';
import idx from 'idx';

export default
@inject('user', 'auth', 'event', 'attendee', 'subscription')
@observer
class EventsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Events',
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 8, marginLeft: 8 }}
        onPress={() => navigation.navigate('AddEventScreen')}
      >
        <Ionicon name="ios-add-circle-outline" color="white" size={30} />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={() => navigation.navigate('SettingsScreen')}
      >
        <Ionicon name="ios-cog" color="white" size={30} />
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    this.props.subscription.loadActiveSubscription().then(() => {
      if (this.props.subscription.hasActiveSubscription) return;
      if (this.props.subscription.freeTrialEligible) {
        this.props.navigation.navigate('StartTrial');
      } else if (
        idx(this.props, (_) => _.subscription.latestSubscription.isTrial)
      ) {
        this.props.navigation.navigate('PurchaseSubscription');
      } else {
        this.props.navigation.navigate('RenewSubscription');
      }
    });
    this.props.event.loadEvents();
    this.props.attendee.loadTotalAttendeeCount();
  }

  _onItemClick = (index, id) => {
    this.props.navigation.navigate('EventDetailScreen', { index, id });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => this._onItemClick(index, item._id)}>
      <View style={styles.listItemContainer}>
        <Text style={styles.eventDate}>
          {moment(item.date).format('MMM DD, YYYY')}
        </Text>
        <View style={styles.seperator} />
        <View style={styles.subDetails}>
          <Text style={styles.categoryTitle}>{item.name}</Text>
        </View>
        <Icon
          name="chevron-right"
          size={16}
          color={'#797979'}
          style={styles.arrow}
        />
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={Styles.container}>
        <HeaderSubtitle>
          <Text style={{ color: '#895353' }}>
            Total Attendees: {this.props.attendee.totalAttendeeCount}
          </Text>
          <Text style={{ color: '#538989' }}>
            Total Events: {this.props.event.totalEventCount}
          </Text>
        </HeaderSubtitle>
        <FlatList
          data={this.props.event.events}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
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
