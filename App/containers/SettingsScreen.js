import React from 'react';
import { StyleSheet } from 'react-native';
import normalize from '../helpers/normalizeText';
import { Colors } from '../Themes/';
import { Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';

export default
@inject('auth')
@observer
class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
  });

  logout = () => {
    this.props.auth
      .logout()
      .then(() => this.props.navigation.navigate('Auth'))
      .catch(() => alert('There was a problem logging you out.'))
  };

  render() {
    return (
      <Button
        buttonStyle={styles.deleteButton}
        containerStyle={styles.buttonContainer}
        onPress={this.logout}
        title="Logout"
        titleStyle={styles.buttonTitle}
      />
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
