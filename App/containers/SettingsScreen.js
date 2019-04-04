import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';
import { Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { VFlex, HFlex } from '../components/Shared';
import styled from 'styled-components';

const DefaultText = styled(TextInput)`
  flex: 1;
  margin-left: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  border-bottom-color: ${Colors.gray};
  border-bottom-width: 1px;
  font-size: 18px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

export default
@inject('auth', 'subscription', 'user')
@observer
class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Account',
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 8, marginLeft: 8 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ fontSize: 17, color: Colors.purple }}>Cancel</Text>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={navigation.getParam('onDone') || (() => {})}
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
  });

  state = {
    firstname: '',
    lastname: '',
    title: '',
  };

  componentWillMount() {
    this.props.subscription.loadActiveSubscription();
    this.props.navigation.setParams({
      onDone: this.onDone,
    });
    this.setState({
      firstname: this.props.auth.active.firstname,
      lastname: this.props.auth.active.lastname,
      title: this.props.auth.active.title,
    });
  }

  onDone = () => {
    this.props.navigation.setParams({
      isUpdating: true,
    });
    this.props.user
      .update(this.state)
      .then(() => this.props.navigation.goBack())
      .catch(() => {
        this.props.navigation.setParams({
          isUpdating: false,
        });
        alert('There was a problem updating your profile.');
      });
  };

  logout = () => {
    this.props.auth
      .logout()
      .then(() => this.props.navigation.navigate('Auth'))
      .catch(() => alert('There was a problem logging you out.'));
  };

  render() {
    const { expirationDate } = this.props.subscription.activeSubscription || {};
    const monthDifference = moment(expirationDate).diff(moment(), 'months');
    const dayDifference = moment(expirationDate).diff(moment(), 'days');
    const expirationText =
      monthDifference <= 1
        ? `${dayDifference} Days`
        : `${monthDifference} Months`;
    return (
      <VFlex style={{ backgroundColor: Colors.background }}>
        <Text style={{ fontSize: 20, marginVertical: 16 }}>
          Subscription Expires in
        </Text>
        <Text style={{ color: Colors.purple, fontSize: 30 }}>
          {expirationText}
        </Text>
        <VFlex style={{ marginVertical: 16 }}>
          <Text
            style={{
              marginLeft: 8,
              marginBottom: 4,
              color: Colors.darkGray,
              alignSelf: 'flex-start',
            }}
          >
            PERSONAL INFORMATION
          </Text>
          <HFlex style={{ backgroundColor: 'white' }}>
            <DefaultText
              placeholder="First Name"
              onChangeText={(firstname) => this.setState({ firstname })}
              value={this.state.firstname}
            />
          </HFlex>
          <HFlex style={{ backgroundColor: 'white' }}>
            <DefaultText
              placeholder="Last Name"
              onChangeText={(lastname) => this.setState({ lastname })}
              value={this.state.lastname}
            />
          </HFlex>
          <HFlex style={{ backgroundColor: 'white' }}>
            <DefaultText
              placeholder="Title"
              onChangeText={(title) => this.setState({ title })}
              value={this.state.title}
            />
          </HFlex>
        </VFlex>
        <HFlex style={{ flex: 1 }}>
          <Button
            buttonStyle={styles.deleteButton}
            containerStyle={styles.buttonContainer}
            onPress={this.logout}
            title="Sign Out"
            titleStyle={styles.buttonTitle}
          />
        </HFlex>
      </VFlex>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  deleteButton: {
    backgroundColor: '#ff575c',
    borderRadius: 10,
    height: 50,
  },
  buttonTitle: {
    fontSize: normalize(20),
    color: Colors.white,
  },
});
