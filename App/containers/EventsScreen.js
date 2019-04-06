import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Colors, Styles } from '../Themes/'
import { inject, observer } from 'mobx-react'
import idx from 'idx'
import { SearchBar } from 'react-native-elements'
import { Cell, CellText } from '../components/Shared'
import { toJS } from 'mobx'

export default
@inject('event', 'attendee', 'subscription', 'purchase')
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
        onPress={() => navigation.navigate('AccountScreen')}
      >
        <Text style={{ fontSize: 17, color: Colors.purple }}>Account</Text>
      </TouchableOpacity>
    ),
    headerStyle: {
      ...navigationOptions.headerStyle,
      // Override in favor of the SearchBar border bottom
      borderBottomWidth: 0,
    },
  })

  state = {
    isLoading: false,
    searchText: '',
  }

  componentWillMount() {
    this.reload()
  }

  reload = () => {
    this.setState({ isLoading: true })
    Promise.all([
      this.props.subscription.loadActiveSubscription().then(() => {
        if (this.props.subscription.hasActiveSubscription) return
        if (this.props.subscription.freeTrialEligible) {
          this.props.navigation.navigate('StartTrial')
        } else if (
          idx(this.props, (_) => _.subscription.latestSubscription.isTrial)
        ) {
          this.props.navigation.navigate('PurchaseSubscription')
        } else {
          this.props.navigation.navigate('RenewSubscription')
        }
      }),
      this.props.event.loadEvents(),
      this.props.attendee.loadTotalAttendeeCount(),
    ])
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }))
  }

  _onItemClick = (index, id) => {
    this.props.navigation.navigate('EventDetailScreen', { index, id })
  }

  // Used to force a re-render
  keyExtractor = () => Math.random().toString()

  renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => this._onItemClick(index, item._id)}>
      <Cell>
        <View>
          <CellText>{item.name}</CellText>
          <CellText style={{ fontSize: 15, color: Colors.darkGray }}>
            {moment(item.date).format('MMMM DD, YYYY')}
          </CellText>
        </View>
        <Icon name="chevron-right" size={16} color={Colors.darkGray} />
      </Cell>
    </TouchableOpacity>
  )

  render() {
    const { events } = this.props.event
    const filteredEvents = toJS(events).filter((_event) => {
      if (!this.state.searchText) return true
      return _event.name.indexOf(this.state.searchText) !== -1
    })
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
          data={filteredEvents}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onRefresh={this.reload}
          refreshing={this.state.isLoading}
        />
      </View>
    )
  }
}
