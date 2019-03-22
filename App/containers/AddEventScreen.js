import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';
import { inject, observer } from 'mobx-react';
import Cell from '../components/Cell';
import DatePicker from 'react-native-datepicker';

export default
@inject('event')
@observer
class AddEventScreen extends Component {
  static navigationOptions = () => ({
    title: 'Add Event',
  });

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
  };

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
  ];

  componentWillReceiveProps(nextProps) {
    if (!this.props.created && nextProps.created) {
      // created event successfully
      Alert.alert('Success', 'Created new event successfully!');
    }
  }

  onClickSave = () => {
    this.setState({ isCreating: true });
    this.props.event
      .create(this.state)
      .then(() => {
        this.setState({ isCreating: false });
        this.props.event.loadEvents();
        this.props.navigation.goBack();
      })
      .catch((err) => {
        alert(err);
        this.setState({ isCreating: false });
        alert('There was a problem creating your event.');
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Cell
          label="Event Name:"
          onPress={() => this.textFieldsRefs[0].current.focus()}
        >
          <TextInput
            autofocus
            ref={this.textFieldsRefs[0]}
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(name) => this.setState({ name })}
            placeholder="Event Name"
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
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(address) => this.setState({ address })}
            placeholder="Address"
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
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(city) => this.setState({ city })}
            placeholder="City"
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
            autoCapitalize="none"
            autoCorrect={false}
            editable
            onChangeText={(state) => this.setState({ state })}
            placeholder="State"
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
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="number-pad"
            onChangeText={(zipcode) => this.setState({ zipcode })}
            placeholder="Zip Code"
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
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(courseNo) => this.setState({ courseNo })}
            placeholder="Course Number"
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
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(courseName) => this.setState({ courseName })}
            placeholder="Course Name"
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
            autoCapitalize="words"
            autoCorrect={false}
            editable
            keyboardType="number-pad"
            onChangeText={(numberOfCourseCredits) =>
              this.setState({ numberOfCourseCredits })
            }
            placeholder="Course Credits"
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
            autoCapitalize="words"
            autoCorrect={false}
            editable
            onChangeText={(presenterName) => this.setState({ presenterName })}
            placeholder="Presenter Name"
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
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            value={this.state.trainingProvider}
          />
        </Cell>
        <View style={styles.errorField}>
          <Text style={styles.errorLabel}>
            {this.props.error && this.props.error.data}
          </Text>
        </View>
        <Button
          title="Save Event"
          disabled={
            this.state.name === '' ||
            this.state.address === '' ||
            this.state.city === '' ||
            this.state.state === '' ||
            this.state.zipcode === '' ||
            this.state.courseNo === '' ||
            this.state.courseName === ''
          }
          loading={this.state.isCreating}
          icon={<Icon name="check-circle" size={25} color={Colors.white} />}
          onPress={() => this.onClickSave()}
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.saveButton}
          containerStyle={styles.buttonContainer}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
  },
  errorLabel: {
    fontSize: normalize(14),
    color: 'red',
  },
  textInputStyle: {
    textAlign: 'right',
  },
});
