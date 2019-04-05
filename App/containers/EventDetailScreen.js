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
import styled from 'styled-components'

const InfoCellView = styled.View`
  margin-left: 8px;
  border-bottom-color: ${Colors.gray};
  border-bottom-width: 1px;
`

const InfoCellText = styled.Text`
  padding: 8px;
  font-size: 15px;
`

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
      <ScrollView>
        <InfoCellView>
          <InfoCellText>
            {moment(_event.date).format('MMMM DD, YYYY')}
          </InfoCellText>
        </InfoCellView>
        <InfoCellView>
          <InfoCellText>
            {_event.address || (
              <Text style={{ color: Colors.darkGray }}>Address</Text>
            )}
          </InfoCellText>
        </InfoCellView>
        <InfoCellView>
          <InfoCellText>
            {_event.city || (
              <Text style={{ color: Colors.darkGray }}>City</Text>
            )}
          </InfoCellText>
        </InfoCellView>
        <InfoCellView>
          <InfoCellText>
            {_event.state || (
              <Text style={{ color: Colors.darkGray }}>State</Text>
            )}
          </InfoCellText>
        </InfoCellView>
        <InfoCellView>
          <InfoCellText>
            {_event.zipcode || (
              <Text style={{ color: Colors.darkGray }}>Zip Code</Text>
            )}
          </InfoCellText>
        </InfoCellView>
        <InfoCellView>
          <InfoCellText>
            {_event.courseNo || (
              <Text style={{ color: Colors.darkGray }}>Course Number</Text>
            )}
          </InfoCellText>
        </InfoCellView>
        <InfoCellView>
          <InfoCellText>
            {_event.numberOfCourseCredits || (
              <Text style={{ color: Colors.darkGray }}>
                Number of Course Credits
              </Text>
            )}
          </InfoCellText>
        </InfoCellView>
        <InfoCellView>
          <InfoCellText>
            {_event.presenterName || (
              <Text style={{ color: Colors.darkGray }}>Presenter Name</Text>
            )}
          </InfoCellText>
        </InfoCellView>
        <InfoCellView>
          <InfoCellText>
            {_event.trainingProvider || (
              <Text style={{ color: Colors.darkGray }}>Training Provider</Text>
            )}
          </InfoCellText>
        </InfoCellView>
      </ScrollView>
    )
  }

  renderSubmit = () => {
    const eventId = this.props.navigation.getParam('id')
    const receivers = this.props.event.receiversByEventId[eventId] || []
    return (
      <ScrollView style={Styles.container}>
        <View style={styles.section}>
          <Text
            style={{
              color: Colors.black,
              fontSize: normalize(17),
            }}
          >
            Send Certificates to Attendees
          </Text>
          <Switch
            onValueChange={(sendCertificates) =>
              this.setState({ sendCertificates })
            }
            value={this.state.sendCertificates}
          />
        </View>
        <View style={styles.section}>
          <Text
            style={{
              color: Colors.black,
              fontSize: normalize(17),
            }}
          >
            Send Attendence Summary
          </Text>
          <Switch
            onValueChange={(sendSummary) => this.setState({ sendSummary })}
            value={this.state.sendSummary}
          />
        </View>
        {receivers.map((receiver, index) => (
          <View key={index} style={styles.listItemContainer}>
            <Text style={styles.name}>{receiver.email}</Text>
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => this.removeSheetReceiver(receiver)}
            >
              <Icon color={Colors.purple} name={'minus-square'} size={20} />
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.plusContainer}>
          <TouchableOpacity onPress={this.plusIconPressed}>
            <Ionicon
              name="ios-add-circle-outline"
              color={Colors.purple}
              size={30}
            />
          </TouchableOpacity>
          <TextInput
            ref={this.inputFieldRef}
            style={styles.textInput}
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
    )
  }

  renderAttendees = () => {
    const eventId = this.props.navigation.getParam('id')
    const attendees = this.props.event.attendeesById[eventId] || []
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={attendees}
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
              <View
                style={{
                  borderBottomColor: Colors.gray,
                  borderBottomWidth: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 8,
                  marginLeft: 8,
                  marginBottom: 8,
                }}
              >
                <Text>{`${item.firstname} ${item.lastname}`}</Text>
                <Icon
                  name="chevron-right"
                  size={16}
                  color={'#797979'}
                  style={styles.arrow}
                />
              </View>
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
              <View
                style={{
                  borderBottomColor: Colors.gray,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 8,
                  paddingTop: 0,
                  marginLeft: 8,
                }}
              >
                <Ionicon
                  name="ios-add-circle-outline"
                  color={Colors.purple}
                  size={30}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    color: Colors.darkGray,
                  }}
                >
                  Add Attendee
                </Text>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
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
    backgroundColor: Colors.purple,
  },
  buttonTitle: {
    marginLeft: 10,
    fontSize: normalize(20),
    color: Colors.white,
  },
  section: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    backgroundColor: Colors.white,
  },
  textInput: {
    flex: 1,
    marginLeft: 50,
    marginRight: 10,
    height: 46,
  },
  plusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    backgroundColor: Colors.white,
  },
})
