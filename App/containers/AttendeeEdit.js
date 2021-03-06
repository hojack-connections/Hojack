import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Button } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import normalize from '../helpers/normalizeText'
import { Colors } from '../Themes/'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CellTextInput } from '../components/Shared'

export default
@inject('event', 'attendee')
@observer
class AttendeeEdit extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Attendee',
    headerRight: (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={() => navigation.getParam('onSave')()}
      >
        {navigation.getParam('isUpdating') ? (
          <ActivityIndicator animating color={Colors.purple} />
        ) : (
          <Text
            style={{ fontWeight: 'bold', fontSize: 17, color: Colors.purple }}
          >
            Done
          </Text>
        )}
      </TouchableOpacity>
    ),
  })

  state = {
    isUpdating: false,
    isDeleting: false,
  }

  // For editable text fields, need 4 refs
  textFieldsRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]

  componentWillMount() {
    const eventId = this.props.navigation.getParam('eventId')
    const attendeeId = this.props.navigation.getParam('attendeeId')
    const eventAttendees = this.props.event.attendeesById[eventId] || []
    const attendee =
      eventAttendees.find((_attendee) => _attendee._id === attendeeId) || {}
    this.setState({ ...attendee })
    this.props.event.loadEventAttendees(
      this.props.navigation.getParam('eventId')
    )
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onSave: this.onSave,
    })
  }

  onSave = () => {
    this.props.navigation.setParams({
      isUpdating: true,
    })
    const attendeeId = this.props.navigation.getParam('attendeeId')
    const eventId = this.props.navigation.getParam('eventId')
    this.props.attendee
      .update(attendeeId, { ...this.state, _id: attendeeId })
      .then(() => this.props.event.loadEventAttendees(eventId))
      .then(() => {
        this.props.navigation.setParams({
          isUpdating: false,
        })
        this.props.navigation.goBack()
      })
      .catch(() => {
        this.props.navigation.setParams({
          isUpdating: false,
        })
        alert('There was a problem updating the attendee.')
      })
  }

  _onDelete = () => {
    this.setState({ isDeleting: true })
    const attendeeId = this.props.navigation.getParam('attendeeId')
    const eventId = this.props.navigation.getParam('eventId')
    this.props.attendee
      .delete(attendeeId)
      .then(() => this.props.event.loadEventAttendees(eventId))
      .then(() => {
        this.setState({ isDeleting: false })
        this.props.navigation.pop(2)
      })
      .catch(() => {
        this.setState({ isDeleting: false })
        alert('There was a problem deleting the attendee.')
      })
  }

  onDelete = () => {
    Alert.alert(
      'Confirm',
      'Do you really want to remove this attendee?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes',
          onPress: this._onDelete,
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    const eventId = this.props.navigation.getParam('eventId')
    const attendeeId = this.props.navigation.getParam('attendeeId')

    const eventAttendees = this.props.event.attendeesById[eventId] || []
    const event = this.props.event.eventsById[eventId] || {}

    const attendee =
      eventAttendees.find((_attendee) => _attendee._id === attendeeId) || {}
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[0].current.focus()}
        >
          <CellTextInput
            autoFocus
            ref={this.textFieldsRefs[0]}
            onSubmitEditing={() => this.textFieldsRefs[1].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(firstname) => this.setState({ firstname })}
            placeholder="First Name"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            value={this.state.firstname}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[1].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[1]}
            onSubmitEditing={() => this.textFieldsRefs[2].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(lastname) => this.setState({ lastname })}
            placeholder="Last Name"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            value={this.state.lastname}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[2].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[2]}
            onSubmitEditing={() => this.textFieldsRefs[3].current.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            editable
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            value={this.state.email}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[3].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[3]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="phone-pad"
            onChangeText={(phone) => this.setState({ phone })}
            placeholder="Phone Number"
            returnKeyType="done"
            underlineColorAndroid="transparent"
            value={this.state.phone}
          />
        </TouchableOpacity>
        <CellTextInput
          autoCapitalize="words"
          autoCorrect={false}
          editable={false}
          placeholder={event.name}
          underlineColorAndroid="transparent"
        />
        <View style={styles.signatureField}>
          <Text style={styles.signatureLabel}>Signature:</Text>
          {attendee.signature !== '' && (
            <Image
              source={{ uri: attendee.signature }}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </View>
        <Button
          title="Delete Attendee"
          loading={this.state.isDeleting}
          onPress={this.onDelete}
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.deleteButton}
          containerStyle={styles.buttonContainer}
        />
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  signatureField: {
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  signatureLabel: {
    backgroundColor: Colors.white,
    padding: 5,
    fontSize: normalize(16),
    fontWeight: '700',
    position: 'absolute',
    left: 10,
    top: Platform.OS === 'ios' ? -16 : -12,
    zIndex: 999,
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
  },
  deleteButton: {
    backgroundColor: '#ff575c',
    borderRadius: 10,
    width: '100%',
    height: 60,
  },
  buttonTitle: {
    marginLeft: 10,
    fontSize: normalize(20),
    color: Colors.white,
  },
})
