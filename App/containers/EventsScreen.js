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
import idx from 'idx';
import { SearchBar } from 'react-native-elements';

export default
@inject('user', 'auth', 'event', 'attendee', 'subscription')
@observer
class EventsScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => ({
    title: 'Events',
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 8, marginLeft: 8 }}
        onPress={() => navigation.navigate('AddEventScreen')}
      >
        <Ionicon name="ios-add" color={Colors.purple} size={30} />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={() => navigation.navigate('SettingsScreen')}
      >
        <Text style={{ fontSize: 17, color: Colors.purple }}>Account</Text>
      </TouchableOpacity>
    ),
    headerStyle: {
      ...navigationOptions.headerStyle,
      // Override in favor of the SearchBar border bottom
      borderBottomWidth: 0,
    },
  });

  state = {
    searchText: '',
  };

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
        <View>
          <Text style={styles.categoryTitle}>{item.name}</Text>
          <Text style={styles.eventDate}>
            {moment(item.date).format('MMMM DD, YYYY')}
          </Text>
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
        <View
          style={{
            backgroundColor: Colors.navigation,
            borderBottomColor: Colors.gray,
            borderBottomWidth: 1,
          }}
        >
          <SearchBar
            cancelButtonProps={{ color: Colors.purple }}
            onChangeText={(searchText) => this.setState({ searchText })}
            placeholder="Search"
            platform={'ios'}
            value={this.state.searchText}
            containerStyle={{
              backgroundColor: Colors.navigation,
            }}
          />
        </View>
        <FlatList
          data={this.props.event.events.filter(
            (event) => event.name.indexOf(this.state.searchText) !== -1
          )}
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  eventDate: {
    marginTop: 4,
    color: 'rgba(142, 142, 147, 1)',
  },
  seperator: {
    backgroundColor: Colors.black,
    height: 1,
    width: '99%',
    marginLeft: 5,
    marginTop: 5,
  },
  arrow: {},
});
