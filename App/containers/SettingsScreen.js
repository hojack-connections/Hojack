import React from 'react';
import { Button } from 'react-native';
import { inject, observer } from 'mobx-react';

export default
@inject('auth')
@observer
class SettingsScreen extends React.Component {
  render() {
    return (
      <Button
        onPress={() =>
          this.props.auth
            .logout()
            .then(() => this.props.navigation.navigate('Auth'))
            .catch(() => alert('There was a problem loggin you out.'))
        }
        title="logout"
      />
    );
  }
}
