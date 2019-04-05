import React, { Component } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../Themes/'
import { inject, observer } from 'mobx-react'
import Cell from '../components/Cell'
import DatePicker from 'react-native-datepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
          <ActivityIndicator animating color="white" />
        ) : (
          <Ionicon name="ios-save" color="white" size={30} />
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
    numberOfCourseCredits: 0,
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
        <Cell
          label="Event Name:"
          onPress={() => this.textFieldsRefs[0].current.focus()}
        >
          <TextInput
            autoFocus
            ref={this.textFieldsRefs[0]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(name) => this.setState({ name })}
            placeholder="Event Name"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.name}
          />
        </Cell>
        <Cell label="Date:">
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
            style={{ flex: 1, marginRight: 10, height: 40 }}
          />
        </Cell>
        <Cell
          label="Address:"
          onPress={() => this.textFieldsRefs[1].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[1]}
            onSubmitEditing={() => this.textFieldsRefs[2].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(address) => this.setState({ address })}
            placeholder="Address"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.address}
          />
        </Cell>
        <Cell
          label="City:"
          onPress={() => this.textFieldsRefs[2].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[2]}
            onSubmitEditing={() => this.textFieldsRefs[3].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(city) => this.setState({ city })}
            placeholder="City"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.city}
          />
        </Cell>
        <Cell
          label="State:"
          onPress={() => this.textFieldsRefs[3].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[3]}
            onSubmitEditing={() => this.textFieldsRefs[4].current.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            editable
            onChangeText={(state) => this.setState({ state })}
            placeholder="State"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.state}
          />
        </Cell>
        <Cell
          label="Zip Code:"
          onPress={() => this.textFieldsRefs[4].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[4]}
            onSubmitEditing={() => this.textFieldsRefs[5].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="number-pad"
            onChangeText={(zipcode) => this.setState({ zipcode })}
            placeholder="Zip Code"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.zipcode}
          />
        </Cell>
        <Cell
          label="Course #:"
          onPress={() => this.textFieldsRefs[5].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[5]}
            onSubmitEditing={() => this.textFieldsRefs[6].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="number-pad"
            onChangeText={(courseNo) => this.setState({ courseNo })}
            placeholder="Course Number"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.courseNo}
          />
        </Cell>
        <Cell
          label="Course Name:"
          onPress={() => this.textFieldsRefs[6].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[6]}
            onSubmitEditing={() => this.textFieldsRefs[7].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(courseName) => this.setState({ courseName })}
            placeholder="Course Name"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.courseName}
          />
        </Cell>
        <Cell
          label="Course Credits:"
          onPress={() => this.textFieldsRefs[7].current.focus()}
        >
          <TextInput
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
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={`${this.state.numberOfCourseCredits}`}
          />
        </Cell>
        <Cell
          label="Presenter Name:"
          onPress={() => this.textFieldsRefs[8].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[8]}
            onSubmitEditing={() => this.textFieldsRefs[9].current.focus()}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(presenterName) => this.setState({ presenterName })}
            placeholder="Presenter Name"
            returnKeyType="next"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.presenterName}
          />
        </Cell>
        <Cell
          label="Training Provider:"
          onPress={() => this.textFieldsRefs[9].current.focus()}
        >
          <TextInput
            ref={this.textFieldsRefs[9]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(trainingProvider) =>
              this.setState({ trainingProvider })
            }
            placeholder="Training Provider"
            returnKeyType="done"
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.trainingProvider}
          />
        </Cell>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  textInputStyle: {
    textAlign: 'right',
  },
})
