import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Colors } from '../Themes/'
import { inject, observer } from 'mobx-react'
import DatePicker from 'react-native-datepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Cell, CellTextInput } from '../components/Shared'

export default
@inject('event')
@observer
class AddEventScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Event',
    headerRight: (
      <TouchableOpacity
        style={{
          padding: 8,
          marginRight: 8,
        }}
        onPress={() => navigation.getParam('onSave')()}
      >
        {navigation.getParam('isCreating') ? (
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
    name: '',
    date: new Date(),
    address: '',
    city: '',
    state: '',
    zipcode: '',
    courseNo: '',
    courseName: '',
    numberOfCourseCredits: '',
    presenterName: '',
    trainingProvider: '',
    isCreating: false,
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
    this.props.navigation.setParams({
      onSave: this.onSave,
    })
  }

  onSave = () => {
    if (this.saveDisabled()) {
      alert('You are missing some fields, please fill them out then save.')
      return
    }
    this.props.navigation.setParams({
      isCreating: true,
    })
    this.props.event
      .create(this.state)
      .then(() => this.props.event.loadEvents())
      .then(() => {
        this.props.navigation.setParams({
          isCreating: false,
        })
        this.props.navigation.goBack()
      })
      .catch(() => {
        this.props.navigation.setParams({
          isCreating: false,
        })
        alert('There was a problem creating your event.')
      })
  }

  saveDisabled = () =>
    !this.state.name ||
    !this.state.address ||
    !this.state.city ||
    !this.state.state ||
    !this.state.zipcode ||
    !this.state.courseNo ||
    !this.state.courseName

  render() {
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
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(name) => this.setState({ name })}
            placeholder="Event Name"
            returnKeyType="next"
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
            format="YYYY-MM-DD"
            mode="date"
            onDateChange={(date) => this.setState({ date })}
            style={{ margin: 0, padding: 0 }}
          />
        </Cell>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[1].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[1]}
            onSubmitEditing={() => this.textFieldsRefs[2].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(address) => this.setState({ address })}
            placeholder="Address"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            value={this.state.address}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[2].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[2]}
            onSubmitEditing={() => this.textFieldsRefs[3].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(city) => this.setState({ city })}
            placeholder="City"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            value={this.state.city}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[3].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[3]}
            onSubmitEditing={() => this.textFieldsRefs[4].current.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            editable
            onChangeText={(state) => this.setState({ state })}
            placeholder="State"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            value={this.state.state}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[4].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[4]}
            onSubmitEditing={() => this.textFieldsRefs[5].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="number-pad"
            onChangeText={(zipcode) => this.setState({ zipcode })}
            placeholder="Zip Code"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            value={this.state.zipcode}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[5].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[5]}
            onSubmitEditing={() => this.textFieldsRefs[6].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="number-pad"
            onChangeText={(courseNo) => this.setState({ courseNo })}
            placeholder="Course Number"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            value={this.state.courseNo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[6].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[6]}
            onSubmitEditing={() => this.textFieldsRefs[7].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(courseName) => this.setState({ courseName })}
            placeholder="Course Name"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            value={this.state.courseName}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[7].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[7]}
            onSubmitEditing={() => this.textFieldsRefs[8].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="number-pad"
            onChangeText={(numberOfCourseCredits) =>
              this.setState({ numberOfCourseCredits })
            }
            placeholder="Course Credits"
            returnKeyType="next"
            underlineColorAndroid="transparent"
            value={`${this.state.numberOfCourseCredits}`}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.textFieldsRefs[8].current.focus()}
        >
          <CellTextInput
            ref={this.textFieldsRefs[8]}
            onSubmitEditing={() => this.textFieldsRefs[9].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(presenterName) => this.setState({ presenterName })}
            placeholder="Presenter Name"
            returnKeyType="next"
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
            returnKeyType="done"
            underlineColorAndroid="transparent"
            value={this.state.trainingProvider}
          />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: Colors.white,
  },
})
