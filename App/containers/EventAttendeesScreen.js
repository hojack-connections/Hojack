import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { inject, observer } from 'mobx-react'
import { Colors, Styles } from '../Themes/'

export default
@inject('event', 'auth')
@observer
class EventAttendeesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Attendees',
    headerRight: (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={() =>
          navigation.navigate('AddAttendeeScreen', {
            id: navigation.getParam('id'),
          })
        }
      >
        <Ionicon name="ios-add-circle-outline" color="white" size={30} />
      </TouchableOpacity>
    ),
  })

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <TouchableHighlight
      onPress={() => {
        this.props.navigation.navigate('AttendeeDetail', {
          attendeeId: item._id,
          eventId: item.event,
        })
      }}
    >
      <View style={styles.listItemContainer}>
        <Icon
          name={item.receivedCertificate ? 'check-square' : 'minus-square'}
          size={18}
          color={item.receivedCertificate ? '#34bd3e' : '#ff575c'}
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
  )

  render() {
    const eventId = this.props.navigation.getParam('id')
    const event = this.props.event.eventsById[eventId] || {}
    const attendees = this.props.event.attendeesById[eventId] || []

    return (
      <View style={Styles.container}>
        <View style={styles.totalEventsContainer}>
          <Text style={{ color: '#895353' }}>
            Total Attendees: {attendees.length}
          </Text>
        </View>
        <View style={styles.eventNameContainer}>
          <Text
            style={{ color: Colors.black, fontSize: 16, fontWeight: '700' }}
          >
            {event.name}
          </Text>
        </View>
        <View style={styles.eventDateContainer}>
          <Text
            style={{ color: Colors.black, fontSize: 14, fontWeight: '700' }}
          >
            {moment(event.date).format('MMM DD, YYYY')}
          </Text>
        </View>
        <FlatList
          data={attendees}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  totalEventsContainer: {
    height: 42,
    backgroundColor: Colors.darkBlack,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  eventNameContainer: {
    height: 43,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 10,
  },
  eventDateContainer: {
    height: 24,
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
})
