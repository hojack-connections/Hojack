import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
  Switch,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'
import normalize from '../helpers/normalizeText'
import { Colors, Styles } from '../Themes/'
import { inject, observer } from 'mobx-react'
import { Button } from 'react-native-elements'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import moment from 'moment'
import { Cell, CellText } from '../components/Shared'

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
  })

  state = {
    isSubmitting: false,
    newSheetReceiver: '',
    selectedIndex: 0,
    sendCertificates: true,
    sendSummary: true,
  }
  inputFieldRef = React.createRef()

  componentDidMount() {
    const eventId = this.props.navigation.getParam('id')
    this.props.event.loadEventAttendees(eventId)
    this.props.event.loadReceiversForEvent(eventId)
  }

  _onSubmit = () => {
    this.setState({ isSubmitting: true })
    const eventId = this.props.navigation.getParam('id')
    this.props.event
      .submit(eventId, {
        sendSummary: this.state.sendSummary,
        sendCertificates: this.state.sendCertificates,
      })
      .then(() => this.props.event.loadEventAttendees(eventId))
      .then(() => {
        this.setState({ isSubmitting: false })
        Alert.alert('Success', 'Submitted this event successfully!')
      })
      .catch(() => {
        this.setState({ isSubmitting: false })
        Alert.alert('Error', 'There was a problem submitting your event.')
      })
  }

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
    )
  }

  plusIconPressed = () => {
    if (this.state.newSheetReceiver === '') {
      this.inputFieldRef.current.focus()
    } else {
      this.props.onAddItem(this.state.newSheetReceiver)
    }
  }

  addSheetReceiver = (email) => {
    if (email === '') return
    const eventId = this.props.navigation.getParam('id')
    this.props.event
      .addReceiverForEvent(eventId, email)
      .then(() => this.props.event.loadReceiversForEvent(eventId))
      .then(() => this.setState({ newSheetReceiver: '' }))
      .catch(() => alert('There was a problem adding the receiver.'))
  }

  removeSheetReceiver = (receiver) => {
    const eventId = this.props.navigation.getParam('id')
    this.props.event
      .deleteReceiver(receiver._id)
      .then(() => this.props.event.loadReceiversForEvent(eventId))
      .catch(() => alert('There was a problem deleting the receiver.'))
  }

  handleIndexChange = (index) => {
    this.setState({
      selectedIndex: index,
    })
  }

  renderInfo = () => {
    const eventId = this.props.navigation.getParam('id')
    const _event = this.props.event.eventsById[eventId] || {}
    return (
      <ScrollView style={styles.container}>
        <Cell>
          <CellText>{moment(_event.date).format('MMMM DD, YYYY')}</CellText>
        </Cell>
        <Cell>
          <CellText>
            {_event.address || (
              <Text style={{ color: Colors.darkGray }}>Address</Text>
            )}
          </CellText>
        </Cell>
        <Cell>
          <CellText>
            {_event.city || (
              <Text style={{ color: Colors.darkGray }}>City</Text>
            )}
          </CellText>
        </Cell>
        <Cell>
          <CellText>
            {_event.state || (
              <Text style={{ color: Colors.darkGray }}>State</Text>
            )}
          </CellText>
        </Cell>
        <Cell>
          <CellText>
            {_event.zipcode || (
              <Text style={{ color: Colors.darkGray }}>Zip Code</Text>
            )}
          </CellText>
        </Cell>
        <Cell>
          <CellText>
            {_event.courseNo || (
              <Text style={{ color: Colors.darkGray }}>Course Number</Text>
            )}
          </CellText>
        </Cell>
        <Cell>
          <CellText>
            {_event.numberOfCourseCredits || (
              <Text style={{ color: Colors.darkGray }}>
                Number of Course Credits
              </Text>
            )}
          </CellText>
        </Cell>
        <Cell>
          <CellText>
            {_event.presenterName || (
              <Text style={{ color: Colors.darkGray }}>Presenter Name</Text>
            )}
          </CellText>
        </Cell>
        <Cell>
          <CellText>
            {_event.trainingProvider || (
              <Text style={{ color: Colors.darkGray }}>Training Provider</Text>
            )}
          </CellText>
        </Cell>
      </ScrollView>
    )
  }

  renderAttendees = () => {
    const eventId = this.props.navigation.getParam('id')
    const attendees = this.props.event.attendeesById[eventId] || []
    return (
      <FlatList
        data={attendees}
        style={styles.container}
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
            <Cell>
              <CellText>{`${item.firstname} ${item.lastname}`}</CellText>
              <Icon
                name="chevron-right"
                size={16}
                color={Colors.darkGray}
                style={styles.arrow}
              />
            </Cell>
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
            <Cell style={{ justifyContent: 'flex-start' }}>
              <Ionicon
                name="ios-add-circle-outline"
                color={Colors.purple}
                size={30}
              />
              <CellText
                style={{
                  marginLeft: 8,
                  color: Colors.darkGray,
                }}
              >
                Add Attendee
              </CellText>
            </Cell>
          </TouchableOpacity>
        }
      />
    )
  }

  renderSubmit = () => {
    const eventId = this.props.navigation.getParam('id')
    const receivers = this.props.event.receiversByEventId[eventId] || []
    return (
      <ScrollView style={Styles.container}>
        <Cell>
          <CellText
            style={{
              color: Colors.black,
              fontSize: normalize(17),
            }}
          >
            Send Certificates to Attendees
          </CellText>
          <Switch
            onValueChange={(sendCertificates) =>
              this.setState({ sendCertificates })
            }
            value={this.state.sendCertificates}
          />
        </Cell>
        <Cell>
          <CellText
            style={{
              color: Colors.black,
              fontSize: normalize(17),
            }}
          >
            Send Attendence Summary
          </CellText>
          <Switch
            onValueChange={(sendSummary) => this.setState({ sendSummary })}
            value={this.state.sendSummary}
          />
        </Cell>
        {receivers.map((receiver, index) => (
          <Cell key={index}>
            <CellText>{receiver.email}</CellText>
            <TouchableOpacity
              onPress={() => this.removeSheetReceiver(receiver)}
            >
              <Icon color={Colors.purple} name={'minus-square'} size={20} />
            </TouchableOpacity>
          </Cell>
        ))}
        <Cell>
          <TouchableOpacity onPress={this.plusIconPressed}>
            <Ionicon
              name="ios-add-circle-outline"
              color={Colors.purple}
              size={30}
            />
          </TouchableOpacity>
          <TextInput
            ref={this.inputFieldRef}
            style={{ flex: 1, marginLeft: 16 }}
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
        </Cell>
        <Button
          buttonStyle={styles.updateButton}
          containerStyle={styles.buttonContainer}
          loading={this.state.isSubmitting}
          onPress={this.onSubmit}
          title="Send"
          titleStyle={styles.buttonTitle}
        />
      </ScrollView>
    )
  }

  render() {
    const eventId = this.props.navigation.getParam('id')
    const _event = this.props.event.eventsById[eventId] || {}
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
        {this.state.selectedIndex === 2 ? this.renderSubmit() : null}
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
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
    backgroundColor: Colors.purple,
  },
  buttonTitle: {
    marginLeft: 10,
    fontSize: normalize(20),
    color: Colors.white,
  },
})
