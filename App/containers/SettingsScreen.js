import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';
import { Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

export default
@inject('auth', 'subscription')
@observer
class SettingsScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Settings',
  });

  componentWillMount() {
    this.props.subscription.loadActiveSubscription();
  }

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
        ? `${dayDifference} days`
        : `${monthDifference} months`;
    return (
      <View style={styles.container}>
        <Text style={styles.subscriptionText}>
          Current subscription ends in {expirationText}.
        </Text>
        <Button
          buttonStyle={styles.deleteButton}
          containerStyle={styles.buttonContainer}
          onPress={this.logout}
          title="Logout"
          titleStyle={styles.buttonTitle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  subscriptionText: {
    fontSize: 15,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  deleteButton: {
    backgroundColor: '#ff575c',
    borderRadius: 10,
    width: '100%',
    height: 60,
  },
  buttonTitle: {
    fontSize: normalize(20),
    color: Colors.white,
  },
});
