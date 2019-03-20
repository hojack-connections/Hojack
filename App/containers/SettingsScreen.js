import React from 'react';
import { Text, StyleSheet } from 'react-native';
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
      <>
        <Text>Current subscription expires in {expirationText}</Text>
        <Button
          buttonStyle={styles.deleteButton}
          containerStyle={styles.buttonContainer}
          onPress={this.logout}
          title="Logout"
          titleStyle={styles.buttonTitle}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
});
