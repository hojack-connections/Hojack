import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/eventActions';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';

class AddEventScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Event',
    headerTitleStyle: Styles.nav.title,
  });

  constructor(props) {
    super(props);

    this.state = {
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

    this.onClickSave = this.onClickSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.created && nextProps.created) {
      // created event successfully
      Alert.alert('Success', 'Created new event successfully!');
    }
  }

  onClickSave() {
    const payload = {
      ...this.state,
      date: new Date(this.state.date),
      token: this.props.token,
    };
    this.props.actions.createEventRequest(payload);
  }

  render() {
    const { isCreating } = this.props;
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
                  <UserInput label={'Event Name:'} onChangeText={(name) => this.setState({ name })} placeholder={'Event Name'} value={name} />
                  <UserInput datePicker label={'Date:'} onDateChanged={(date) => this.setState({ date })} value={date} />
                  <UserInput label={'Address:'} onChangeText={(address) => this.setState({ address })} placeholder={'Address'} />
                  <UserInput label={'City:'} onChangeText={(city) => this.setState({ city })} placeholder={'City'} />
                  <UserInput label={'State:'} onChangeText={(state) => this.setState({ state })} placeholder={'State'} />
                  <UserInput label={'Zip Code:'} onChangeText={(zipcode) => this.setState({ zipcode })} placeholder={'Zip Code'} />
                  <UserInput label={'Course #:'} onChangeText={(courseNo) => this.setState({ courseNo })} placeholder={'Course #'} />
                  <UserInput label={'Course Name:'} onChangeText={(courseName) => this.setState({ courseName })} placeholder={'Course Name'} />
                  <UserInput label={'Number of Course Credits:'} onChangeText={(numberOfCourseCredits) => this.setState({ numberOfCourseCredits: parseInt(numberOfCourseCredits) })} placeholder={'Course Credits'} />
                  <UserInput label={'Presenter Name:'} onChangeText={(presenterName) => this.setState({ presenterName })} placeholder={'Presenter Name'} />
                  <UserInput label={'Training Provider:'} onChangeText={(trainingProvider) => this.setState({ trainingProvider })} placeholder={'Training Provider'} />
          />
              <View style={styles.errorField}>
          <Text style={styles.errorLabel}>
                      {
                        this.props.error && this.props.error.data
                    }
          </Text>
        </View>
        {/*<TouchableOpacity style={styles.buttonContainer} onPress={() => this.onClickSave()}>
                    <View style={styles.saveButton}>
                        <Icon name={'check-circle'} size={25} color={Colors.white} />
                        <Text style={styles.buttonTitle}>Save Event</Text>
                    </View>
                </TouchableOpacity>*/}
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

const mapStateToProps = (state) => ({
  token: state.auth.token,
  error: state.event.error,
  created: state.event.created,
  isCreating: state.event.isCreating,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...eventActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventScreen);
