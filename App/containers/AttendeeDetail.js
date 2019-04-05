import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Button } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import normalize from '../helpers/normalizeText'
import { Colors } from '../Themes/'
import { CellTextInput } from '../components/Shared'

export default
@inject('event', 'attendee', 'auth')
@observer
class AttendeeDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Attendee',
    headerRight: (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={() =>
          navigation.navigate('AttendeeEdit', {
            eventId: navigation.getParam('eventId'),
            attendeeId: navigation.getParam('attendeeId'),
          })
        }
      >
        <Text style={{ fontSize: 17, color: Colors.purple }}>Edit</Text>
      </TouchableOpacity>
    ),
  })

  state = {
    email: '',
    isSending: false,
  }

  emailRef = React.createRef()

  componentWillMount() {
    this.props.event.loadEventAttendees(
      this.props.navigation.getParam('eventId')
    )
  }

  sendTestCert = () => {
    // Send a test cert to this.state.email
    this.setState({ isSending: true })
    const eventId = this.props.navigation.getParam('eventId')
    const attendeeId = this.props.navigation.getParam('attendeeId')
    const email = this.state.email || this.props.auth.active.email
    this.props.event
      .sendCertificate(eventId, attendeeId, email)
      .then(() => alert('Sent test certificate'))
      .then(() => this.setState({ isSending: false, email: '' }))
      .catch(() => {
        this.setState({ isSending: false })
        alert('There was a problem sending your test certificate.')
      })
  }

  render() {
    const eventId = this.props.navigation.getParam('eventId')
    const attendeeId = this.props.navigation.getParam('attendeeId')

    const eventAttendees = this.props.event.attendeesById[eventId] || []
    const attendee =
      eventAttendees.find((_attendee) => _attendee._id === attendeeId) || {}

    return (
      <ScrollView style={styles.container}>
        <View style={{ padding: 8 }}>
          <Text>{`${attendee.firstname} ${attendee.lastname}`}</Text>
          <Text>{`${attendee.email} - ${attendee.phone}`}</Text>
        </View>
        <View style={styles.signatureField}>
          <Text style={styles.signatureLabel}>Signature:</Text>
          {attendee.signature !== '' && (
            <Image
              source={{ uri: attendee.signature }}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </View>
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
            SEND TEST CERTIFICATE
          </Text>
        </View>
        <CellTextInput
          ref={this.emailRef}
          onSubmitEditing={this.sendTestCert}
          autoCapitalize="none"
          autoCorrect={false}
          editable
          keyboardType="email-address"
          onChangeText={(email) => this.setState({ email })}
          placeholder={this.props.auth.active.email}
          returnKeyType="done"
          underlineColorAndroid="transparent"
          value={this.state.email}
        />
        <Button
          title="Send Test Cert"
          loading={this.state.isSending}
          onPress={this.sendTestCert}
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.sendButton}
          containerStyle={styles.buttonContainer}
        />
      </ScrollView>
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
  sendButton: {
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
