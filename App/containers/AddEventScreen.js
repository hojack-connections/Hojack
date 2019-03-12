import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';
import { inject, observer } from 'mobx-react';

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
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.created && nextProps.created) {
      // created event successfully
      Alert.alert('Success', 'Created new event successfully!');
    }
  }

  onClickSave = () => {
    const payload = {
      ...this.state,
      date: new Date(this.state.date),
      token: this.props.token,
    };
    this.props.event.create(payload)
      .then(() => alert('created'))
      .catch(err => alert(err.toString()));
  };

  render() {
    // TODO: make this dynamic
    const { isCreating } = false;
    const {
      name,
      date,
      address,
      city,
      state,
      zipcode,
      courseNo,
      courseName,
      numberOfCourseCredits,
      presenterName,
      trainingProvider,
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputFields}>
          <UserInput
            label={'Event Name:'}
            placeholder={'Event Name'}
            value={name}
            onChangeText={(name) => this.setState({ name })}
          />
          <UserInput
            label={'Date:'}
            value={date}
            datePicker
            onDateChanged={(date) => this.setState({ date })}
          />
          <UserInput
            label={'Address:'}
            placeholder={'Address'}
            onChangeText={(address) => this.setState({ address })}
          />
          <UserInput
            label={'City:'}
            placeholder={'City'}
            onChangeText={(city) => this.setState({ city })}
          />
          <UserInput
            label={'State:'}
            placeholder={'State'}
            onChangeText={(state) => this.setState({ state })}
          />
          <UserInput
            label={'Zip Code:'}
            placeholder={'Zip Code'}
            onChangeText={(zipcode) => this.setState({ zipcode })}
          />
          <UserInput
            label={'Course #:'}
            placeholder={'Course #'}
            onChangeText={(courseNo) => this.setState({ courseNo })}
          />
          <UserInput
            label={'Course Name:'}
            placeholder={'Course Name'}
            onChangeText={(courseName) => this.setState({ courseName })}
          />
          <UserInput
            label={'Course Credits:'}
            placeholder={'Course Credits'}
            onChangeText={(numberOfCourseCredits) =>
              this.setState({
                numberOfCourseCredits: parseInt(numberOfCourseCredits),
              })
            }
          />
          <UserInput
            label={'Presenter Name:'}
            placeholder={'Presenter Name'}
            onChangeText={(presenterName) => this.setState({ presenterName })}
          />
          <UserInput
            label={'Training Provider:'}
            placeholder={'Training Provider'}
            onChangeText={(trainingProvider) =>
              this.setState({ trainingProvider })
            }
          />
        </View>
        <View style={styles.errorField}>
          <Text style={styles.errorLabel}>
            {this.props.error && this.props.error.data}
          </Text>
        </View>
        <Button
          title="Save Event"
          disabled={
            name === '' ||
            address === '' ||
            city === '' ||
            state === '' ||
            zipcode === '' ||
            courseNo === '' ||
            courseName === ''
          }
          loading={isCreating}
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
