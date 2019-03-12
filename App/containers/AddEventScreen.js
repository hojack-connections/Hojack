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
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';
import { inject, observer } from 'mobx-react';
import Cell from '../components/Cell';
import DatePicker from 'react-native-datepicker';

export default
@inject('event')
@observer
class AddEventScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
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
        <View style={styles.inputFields}>
          <Cell label="Event Name:">
            <TextInput
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
          <Cell label="Address:">
            <TextInput
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
          <Cell label="City:">
            <TextInput
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
          <Cell label="State:">
            <TextInput
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
          <Cell label="Zip Code:">
            <TextInput
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
          <Cell label="Course #:">
            <TextInput
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
          <Cell label="Course Name:">
            <TextInput
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
          <Cell label="Course Credits:">
            <TextInput
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
          <Cell label="Presenter Name:">
            <TextInput
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
          <Cell label="Training Provider:">
            <TextInput
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
        </View>
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
  inputFields: {
    paddingLeft: 20,
    paddingTop: 10,
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
});
