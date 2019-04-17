import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native'
import SignatureCapture from 'react-native-signature-capture'
import { inject, observer } from 'mobx-react'
import { Cell } from '../components/Shared'
import normalize from '../helpers/normalizeText'
import { Colors } from '../Themes/'

export default
@inject('event', 'auth', 'attendee')
@observer
class AddAttendeeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Attendee',
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
            Save
          </Text>
        )}
      </TouchableOpacity>
    ),
  })

  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  }

  textFieldsRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]
  signatureRef = React.createRef()

  componentDidMount() {
    this.props.navigation.setParams({
      onSave: this.onSave,
    })
  }

  onSave = () => {
    this.signatureRef.current.saveImage()
  }

  onSignatureSave = (result) => {
    this.props.navigation.setParams({
      isUpdating: true,
    })
    const eventId = this.props.navigation.getParam('id')
    this.props.attendee
      .create(eventId, {
        ...this.state,
        signature: result.encoded.toString(),
        event: `${eventId}`,
      })
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
        alert('There was a problem creating the attendee.')
      })
  }

  render() {
    const signatureWidth = Dimensions.get('window').width - 50
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Cell onPress={() => this.textFieldsRefs[0].current.focus()}>
          <TextInput
            autoFocus
            ref={this.textFieldsRefs[0]}
            onSubmitEditing={() => this.textFieldsRefs[1].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(firstname) => this.setState({ firstname })}
            placeholder="First Name"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.firstname}
          />
        </Cell>
        <Cell onPress={() => this.textFieldsRefs[1].current.focus()}>
          <TextInput
            ref={this.textFieldsRefs[1]}
            onSubmitEditing={() => this.textFieldsRefs[2].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(lastname) => this.setState({ lastname })}
            placeholder="Last Name"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.lastname}
          />
        </Cell>
        <Cell onPress={() => this.textFieldsRefs[2].current.focus()}>
          <TextInput
            ref={this.textFieldsRefs[2]}
            onSubmitEditing={() => this.textFieldsRefs[3].current.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            editable
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            placeholder="john.doe@email.com"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.email}
          />
        </Cell>
        <Cell onPress={() => this.textFieldsRefs[3].current.focus()}>
          <TextInput
            ref={this.textFieldsRefs[3]}
            autoCapitalize="none"
            autoCorrect={false}
            editable
            keyboardType="phone-pad"
            onChangeText={(phone) => this.setState({ phone })}
            placeholder="8125553974"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.phone}
          />
        </Cell>
        <View style={styles.signatureField}>
          <Text style={styles.signatureLabel}>Signature:</Text>
          <TouchableOpacity
            style={{ zIndex: 1, position: 'absolute', right: 10, top: 5 }}
            onPress={() => {
              this.signatureRef.current.resetImage()
            }}
          >
            <Text style={{ color: 'blue', fontSize: 14 }}>Reset</Text>
          </TouchableOpacity>
          <SignatureCapture
            ref={this.signatureRef}
            style={{
              width: signatureWidth,
              paddingTop: 10,
              backgroundColor: 'transparent',
            }}
            showNativeButtons={false}
            showBorder={false}
            showTitleLabel={false}
            viewMode={'portrait'}
            onSaveEvent={this.onSignatureSave}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: 8,
  },
  textInputStyle: {
    flex: 1,
    marginRight: 10,
    color: Colors.black,
    fontWeight: '100',
  },
  signatureField: {
    height: Platform.isPad ? 200 : 100,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  signatureLabel: {
    backgroundColor: Colors.white,
    padding: 5,
    fontSize: 16,
    fontWeight: '700',
    position: 'absolute',
    left: 10,
    top: Platform.OS === 'ios' ? -16 : -12,
    zIndex: 999,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  saveButton: {
    borderRadius: 10,
    width: '100%',
    height: 60,
  },
  buttonTitle: {
    marginLeft: 10,
    fontSize: normalize(20),
    color: Colors.white,
  },
  errorField: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  errorLabel: {
    fontSize: normalize(14),
    color: 'red',
  },
})
