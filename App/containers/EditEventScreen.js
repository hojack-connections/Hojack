import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native'
import { Button } from 'react-native-elements'
import normalize from '../helpers/normalizeText'
import { Colors } from '../Themes/'
import { inject, observer } from 'mobx-react'
import DatePicker from 'react-native-datepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Cell, CellTextInput } from '../components/Shared'

export default
@inject('event')
@observer
class EditEventScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Event',
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

  textFieldsRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]

  componentWillMount() {
    const eventId = this.props.navigation.getParam('id')
    const _event = this.props.event.eventsById[eventId] || {}
    this.setState({ ..._event })
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
    const eventId = this.props.navigation.getParam('id')
    this.props.event
      .update(eventId, { _id: eventId, ...this.state })
      .then(() => this.props.event.loadEvents())
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
        alert('There was a problem updating the event.')
      })
  }

  onDelete = () => {
    Alert.alert(
      'Confirm',
      'Do you really want to remove this event?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            this.setState({ isDeleting: true })
            const eventId = this.props.navigation.getParam('id')
            this.props.event
              .delete(eventId)
              .then(() => this.props.event.loadEvents())
              .then(() => {
                this.setState({ isDeleting: false })
                this.props.navigation.popToTop()
              })
              .catch(() => {
                this.setState({ isDeleting: false })
                alert('There was a problem deleting the event.')
              })
          },
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    const eventId = this.props.navigation.getParam('id')
    const _event = this.props.event.eventsById[eventId] || {}

    return (
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[0].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[0]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(name) => this.setState({ name })}
            placeholder="Event Name"
            underlineColorAndroid="transparent"
            value={this.state.name}
          />
        </TouchableOpacity>
        <Cell>
          <DatePicker
            cancelBtnText="Cancel"
            confirmBtnText="Confirm"
            customStyles={{
              dateIcon: { display: 'none' },
              dateInput: { borderWidth: 0, alignItems: 'flex-start' },
            }}
            date={this.state.date}
            placeholder={`${_event.date}`}
            format="YYYY-MM-DD"
            mode="date"
            onDateChange={(date) => this.setState({ date })}
            style={{ flex: 1, marginRight: 10, height: 40 }}
          />
        </Cell>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[1].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[1]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(address) => this.setState({ address })}
            placeholder="Address"
            underlineColorAndroid="transparent"
            value={this.state.address}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[2].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[2]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(city) => this.setState({ city })}
            placeholder="City"
            underlineColorAndroid="transparent"
            value={this.state.city}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[3].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[3]}
            autoCapitalize="none"
            autoCorrect={false}
            editable
            onChangeText={(state) => this.setState({ state })}
            placeholder="State"
            underlineColorAndroid="transparent"
            value={this.state.state}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[4].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[4]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="number-pad"
            onChangeText={(zipcode) => this.setState({ zipcode })}
            placeholder="Zip Code"
            underlineColorAndroid="transparent"
            value={this.state.zipcode}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[5].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[5]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(courseNo) => this.setState({ courseNo })}
            placeholder="Course Number"
            underlineColorAndroid="transparent"
            value={this.state.courseNo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[6].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[6]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(courseName) => this.setState({ courseName })}
            placeholder="Course Name"
            underlineColorAndroid="transparent"
            value={this.state.courseName}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[7].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[7]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="number-pad"
            onChangeText={(numberOfCourseCredits) =>
              this.setState({ numberOfCourseCredits })
            }
            placeholder="Course Credits"
            underlineColorAndroid="transparent"
            value={`${this.state.numberOfCourseCredits || ''}`}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[8].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[8]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(presenterName) => this.setState({ presenterName })}
            placeholder="Presenter Name"
            underlineColorAndroid="transparent"
            value={this.state.presenterName}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[9].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[9]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(trainingProvider) =>
              this.setState({ trainingProvider })
            }
            placeholder="Training Provider"
            underlineColorAndroid="transparent"
            value={this.state.trainingProvider}
          />
        </TouchableOpacity>
        <Button
          buttonStyle={styles.deleteButton}
          containerStyle={styles.buttonContainer}
          loading={this.state.isDeleting}
          onPress={this.onDelete}
          title="Delete Event"
          titleStyle={styles.buttonTitle}
        />
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
